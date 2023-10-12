import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class CreatePatientDto extends BaseUserDto {
  @IsNotEmpty()
  @IsString()
  doctorSpeciality: string;

  @IsNotEmpty()
  @IsString()
  causeOfVisit: string;
}
