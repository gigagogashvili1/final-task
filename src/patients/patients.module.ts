import { Module } from '@nestjs/common';
import { PatientsController } from './patients.controller';
import { UsersLibModule } from '@app/users-lib';

@Module({
  imports: [UsersLibModule],
  controllers: [PatientsController],
})
export class PatientsModule {}
