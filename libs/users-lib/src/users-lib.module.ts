import { Module } from '@nestjs/common';
import { UsersLibService } from './users-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor, Patient } from './entities';
import { DoctorsRepository, PatientRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Patient])],
  providers: [UsersLibService, DoctorsRepository, PatientRepository],
  exports: [UsersLibService, DoctorsRepository, PatientRepository],
})
export class UsersLibModule {}
