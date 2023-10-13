import { AuthLibService } from '@app/auth-lib';
import { CreateDoctorDto, CreatePatientDto } from '@app/auth-lib/dtos';
import { Body, Controller, HttpCode, InternalServerErrorException, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  public constructor(private readonly authLibService: AuthLibService) {}

  // Doctors

  @HttpCode(201)
  @Post('doctor/sign-up')
  public async signUpDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.authLibService.signUp('doctor', createDoctorDto);
    // return await this.authLibService.signUpDoctor(createDoctorDto);
  }

  public async signInDoctor() {}

  //   Patients
  @HttpCode(201)
  @Post('patient/sign-up')
  public async signUpPatient(@Body() createPatientDto: CreatePatientDto) {
    return await this.authLibService.signUp('patient', createPatientDto);
    // return await this.authLibService.signUpPatient(createPatientDto);
  }

  public async signInPatient() {}
}
