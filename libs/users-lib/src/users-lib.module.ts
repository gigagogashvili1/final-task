import { Module } from '@nestjs/common';
import { UsersLibService } from './users-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor, Patient, User } from './entities';
import { DoctorsRepository, PatientRepository, UsersRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Patient, User])],
  providers: [UsersLibService, DoctorsRepository, PatientRepository, UsersRepository],
  exports: [UsersLibService, DoctorsRepository, PatientRepository, UsersRepository],
})
export class UsersLibModule {}
