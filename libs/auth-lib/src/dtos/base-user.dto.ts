import { Gender } from '@app/users-lib/enums';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from 'class-validator';

export class BaseUserDto {
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
}
