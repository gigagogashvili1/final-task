import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { UsersLibModule } from '@app/users-lib';

@Module({
  imports: [UsersLibModule],
  controllers: [DoctorsController],
})
export class DoctorsModule {}
