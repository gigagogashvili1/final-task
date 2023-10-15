import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor, Patient, User } from './entities';
import { DoctorsRepository, PatientRepository, UsersRepository } from './repositories';
import { DoctorsService, PatientsService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Patient, User])],
  providers: [DoctorsService, PatientsService, DoctorsRepository, PatientRepository, UsersRepository],
  exports: [DoctorsService, PatientsService, DoctorsRepository, PatientRepository, UsersRepository],
})
export class UsersLibModule {}
