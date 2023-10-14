import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { DbLibModule } from '@app/db-lib';
import { EnvJoiSchema } from '@app/common-lib/schemas';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { TerminusModule } from '@nestjs/terminus';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: EnvJoiSchema }),
    JwtModule.register({ global: true }),
    DbLibModule,
    AuthModule,
    PatientsModule,

    DoctorsModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
