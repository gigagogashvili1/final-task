import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DoctorsRepository, PatientRepository, UsersRepository } from '../repositories';
import { User } from '../entities';
import { UpdatePatientDto } from '../dtos';
import { HiddenDoctorsRepository } from '../repositories/hidden-doctors.repository';

@Injectable()
export class PatientsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly doctorsRepository: DoctorsRepository,
    private readonly patientRepository: PatientRepository,
    private readonly hiddenDoctorRepository: HiddenDoctorsRepository,
  ) {}

  public async updatePatient(id: number, updatePatientDto: UpdatePatientDto, reqUser: User) {
    try {
      if (Number(id) !== reqUser.patient.id) {
        throw new ForbiddenException('You are not authorized to update this entity.');
      }

      await this.patientRepository.update(id, updatePatientDto);

      return 'You succesfully updated patient!';
    } catch (err) {
      throw err;
    }
  }

  public async getSuggestedDoctors(user: User) {
    try {
      const suggestedDoctors = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.doctor', 'doctor')
        .where(
          'doctor.speciality = :speciality OR doctor.price_per_hour_in_usd = :pricePerHour OR doctor.experience_in_years = :experience',
          {
            speciality: user.patient.doctorSpeciality,
            pricePerHour: user.patient.doctorPricePerHour,
            experience: user.patient.doctorExperience,
          },
        )
        .orWhere('user.country = :country AND user.city = :city', { country: user.country, city: user.city })
        .select(['doctor'])
        .getRawMany();

      return suggestedDoctors;
    } catch (err) {
      throw err;
    }
  }

  public async hideDoctor(doctorId: number, user: User) {
    try {
      const doctor = await this.doctorsRepository.findOneById(Number(doctorId));
      if (!doctor) throw new NotFoundException('Doctor with provided id not found!');
      await this.hiddenDoctorRepository.create({ doctor, patient: user.patient });
      return 'Doctor has been hided';
    } catch (err) {
      if (err.code === '23505') throw new InternalServerErrorException('Duplicate key');
      throw err;
    }
  }

  public async unhideDoctor(doctorId: number, user: User) {
    try {
      const doctor = await this.doctorsRepository.findOneById(Number(doctorId));
      if (!doctor) throw new NotFoundException('Doctor with provided id not found!');
      const hiddenDoctor = await this.hiddenDoctorRepository.findOne(doctor.id, user.patient.id);
      await this.hiddenDoctorRepository.deleteById(hiddenDoctor.id);

      return 'You succesfully unhided doctor';
    } catch (err) {
      throw err;
    }
  }
}
