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
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema: EnvJoiSchema }),
    JwtModule.register({ global: true }),
    ThrottlerModule.forRoot([{ limit: 5, ttl: 60000 }]),
    DbLibModule,
    AuthModule,
    PatientsModule,
    DoctorsModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
