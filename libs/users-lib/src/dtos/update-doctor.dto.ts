import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  speciality?: string;

  @IsOptional()
  @IsNumber()
  experience?: number;

  @IsOptional()
  @IsNumber()
  pricePerHour?: number;
}
