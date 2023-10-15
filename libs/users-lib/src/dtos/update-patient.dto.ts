import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  doctorSpeciality?: string;

  @IsOptional()
  @IsString()
  causeOfVisit?: string;

  @IsOptional()
  @IsNumber()
  doctorExperience?: number;

  @IsOptional()
  @IsNumber()
  doctorPricePerHour?: number;
}
