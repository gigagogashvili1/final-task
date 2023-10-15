import { ForbiddenException, Injectable } from '@nestjs/common';
import { DoctorsRepository, PatientRepository, UsersRepository } from '../repositories';
import { User } from '../entities';
import { UpdatePatientDto } from '../dtos';

@Injectable()
export class PatientsService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly doctorsRepository: DoctorsRepository,
    private readonly patientRepository: PatientRepository,
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
    console.log(user);
  }
}
