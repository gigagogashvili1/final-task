import { Doctor, Patient, User } from '@app/users-lib/entities';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDatabaseConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
  return {
    type: configService.get<'postgres'>('DATABASE_TYPE'),
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_DATABASE'),
    entities: [Patient, Doctor, User],
    synchronize: true,
  };
};
