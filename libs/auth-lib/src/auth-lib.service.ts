import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDoctorDto, CreatePatientDto } from './dtos';
import { DoctorsRepository } from '@app/users-lib/repositories/doctors.repository';
import { CryptoLibService } from '@app/crypto-lib';
import { MailSenderService } from '@app/notifications-lib';
import { PatientRepository } from '@app/users-lib/repositories';

@Injectable()
export class AuthLibService {
  public constructor(
    private readonly doctorsRepository: DoctorsRepository,
    private readonly cryptoLibService: CryptoLibService,
    private readonly mailSenderService: MailSenderService,
    private readonly doctorRepository: DoctorsRepository,
    private readonly patientRepository: PatientRepository,
  ) {}
  //Doctor

  public async signUp(userType: 'doctor' | 'patient', dto: CreateDoctorDto | CreatePatientDto) {
    const { email, password } = dto;
    try {
      const hashedPassword = await this.cryptoLibService.hashPassword(password, 10);
      if (userType === 'doctor') {
        const userExists = await this.doctorsRepository.findOneByEmail(email);
        if (userExists) throw new ConflictException('Doctor with given email already exists!');

        await this.doctorRepository.create({
          ...(dto as CreateDoctorDto),
          password: hashedPassword,
        });
      } else {
        const patientExists = await this.patientRepository.findOneByEmail(email);
        if (patientExists) throw new ConflictException('Patient with given email already exists!');

        await this.patientRepository.create({
          ...(dto as CreatePatientDto),
          password: hashedPassword,
        });
      }
      await this.mailSenderService.sendEmail(email, 'Signup Notification', 'You have succesfully signed up');
      return `${userType} has registred succesfully!`;
    } catch (err) {
      throw err;
    }
  }

  public async signInDoctor() {}

  //Patient

  public async signInPatient() {}
}
