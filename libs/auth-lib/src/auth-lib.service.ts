import { ConflictException, Injectable } from '@nestjs/common';
import { DoctorsRepository } from '@app/users-lib/repositories/doctors.repository';
import { MailSenderService } from '@app/notifications-lib';
import { PatientRepository, UsersRepository } from '@app/users-lib/repositories';
import { UserRole } from '@app/users-lib/enums';
import { CreateUserDto } from './dtos/create-user.dto';
import { RequestWithUser, UserJwtPayload, UserWithoutPassword } from '@app/common-lib/interfaces';
import { CryptoLibService, JwtService } from '@app/utils-lib/services';
import { User } from '@app/users-lib/entities';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthLibService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly cryptoLibService: CryptoLibService,
    private readonly mailSenderService: MailSenderService,
    private readonly doctorRepository: DoctorsRepository,
    private readonly patientRepository: PatientRepository,
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  public async signUp(createUserDto: CreateUserDto) {
    const {
      email,
      password,
      role,
      city,
      country,
      gender,
      age,
      causeOfVisit,
      doctorSpeciality,
      experience,
      pricePerHour,
      speciality,
      doctorExperience,
      doctorPricePerHour,
    } = createUserDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const userExists = await this.userRepository.findOneByEmail(email);

      if (userExists) {
        throw new ConflictException(`User with given email already exists!`);
      }
      const hashedPassword = await this.cryptoLibService.hashPassword(password, 10);

      const doctorOrPatient =
        role === UserRole.DOCTOR
          ? await this.doctorRepository.create({ experience, pricePerHour, speciality })
          : await this.patientRepository.create({
              causeOfVisit,
              doctorSpeciality,
              doctorExperience,
              doctorPricePerHour,
            });

      const newUser = await this.userRepository.create({
        email,
        password: hashedPassword,
        role,
        city,
        gender,
        age,
        country,
        [role === UserRole.DOCTOR && 'doctor']: doctorOrPatient,
        [role === UserRole.PATIENT && 'patient']: doctorOrPatient,
      });

      await queryRunner.commitTransaction();

      await this.mailSenderService.sendEmail(newUser.email, 'Signup Notification', 'You have succesfully signed up');

      return 'User registered succesfully!';
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
      }
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  public async signIn(request: RequestWithUser<User>) {
    try {
      const { id, email, role } = request.user;
      const payload: UserJwtPayload = { sub: id, email, role };
      const [accessToken, refreshToken] = await this.signTokens(payload);

      request.res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
      });
      return { token: accessToken, userInfo: { ...request.user } };
    } catch (err) {
      throw err;
    }
  }

  public async signOut(request: RequestWithUser<User>) {
    request.res.clearCookie('refresh_token');
    return 'Signed Out';
  }

  public async refreshToken(request: RequestWithUser<User>) {
    try {
      const { id, email, role } = request.user;
      const payload: UserJwtPayload = { sub: id, email, role };
      const [accessToken] = await this.signTokens(payload);

      return { token: accessToken };
    } catch (err) {
      throw err;
    }
  }

  public signTokens(payload: UserJwtPayload) {
    return Promise.all([this.jwtService.sign(payload), this.jwtService.sign(payload, 'refresh_token')]);
  }
}
