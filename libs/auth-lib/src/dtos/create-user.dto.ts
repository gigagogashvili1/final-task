import { Gender, UserRole } from '@app/users-lib/enums';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @ValidateIf((o) => o.role === UserRole.PATIENT)
  @IsNotEmpty()
  @IsString()
  doctorSpeciality: string;

  @ValidateIf((o) => o.role === UserRole.PATIENT)
  @IsNotEmpty()
  @IsString()
  causeOfVisit: string;

  @ValidateIf((o) => o.role === UserRole.DOCTOR)
  @IsNotEmpty()
  @IsString()
  speciality: string;

  @ValidateIf((o) => o.role === UserRole.DOCTOR)
  @IsNotEmpty()
  @IsNumber()
  experience: number;

  @ValidateIf((o) => o.role === UserRole.DOCTOR)
  @IsNotEmpty()
  @IsNumber()
  pricePerHour: number;
}
