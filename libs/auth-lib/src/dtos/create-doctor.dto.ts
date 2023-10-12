import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { BaseUserDto } from './base-user.dto';

export class CreateDoctorDto extends BaseUserDto {
  @IsNotEmpty()
  @IsString()
  speciality: string;

  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @IsNotEmpty()
  @IsNumber()
  pricePerHour: number;
}
