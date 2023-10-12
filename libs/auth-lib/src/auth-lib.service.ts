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
  public async signUpDoctor(createDoctorDto: CreateDoctorDto) {
    const { email, password } = createDoctorDto;
    try {
      const doctorExists = await this.doctorsRepository.findOneByEmail(email);

      if (doctorExists) throw new ConflictException('Doctor with given email already exists!');

      const hashedPassword = await this.cryptoLibService.hashPassword(password, 10);
      await this.mailSenderService.sendEmail(email, 'Signup Notification', 'You have succesfully signed up');

      await this.doctorRepository.create({
        ...createDoctorDto,
        password: hashedPassword,
      });
      return 'Doctor has registred succesfully!';
    } catch (err) {
      throw err;
    }
  }

  public async signInDoctor() {}

  //Patient

  public async signUpPatient(createPatientDto: CreatePatientDto) {
    const { email, password } = createPatientDto;
    try {
      const patientExists = await this.patientRepository.findOneByEmail(email);

      if (patientExists) throw new ConflictException('Patient with given email already exists!');

      const hashedPassword = await this.cryptoLibService.hashPassword(password, 10);
      await this.mailSenderService.sendEmail(email, 'Signup Notification', 'You have succesfully signed up');

      await this.patientRepository.create({
        ...createPatientDto,
        password: hashedPassword,
      });
      return 'Patient has registered succesfully!';
    } catch (err) {
      throw err;
    }
  }

  public async signInPatient() {}
}
