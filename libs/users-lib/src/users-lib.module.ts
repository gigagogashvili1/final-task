import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor, Patient, User } from './entities';
import { DoctorsRepository, PatientRepository, UsersRepository } from './repositories';
import { DoctorsService, PatientsService } from './services';
import { HiddenDoctor } from './entities/hidde-doctor.entity';
import { HiddenDoctorsRepository } from './repositories/hidden-doctors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Patient, User, HiddenDoctor])],
  providers: [
    DoctorsService,
    PatientsService,
    DoctorsRepository,
    PatientRepository,
    UsersRepository,
    HiddenDoctorsRepository,
  ],
  exports: [
    DoctorsService,
    PatientsService,
    DoctorsRepository,
    PatientRepository,
    UsersRepository,
    HiddenDoctorsRepository,
  ],
})
export class UsersLibModule {}
