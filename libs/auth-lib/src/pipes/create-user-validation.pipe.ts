import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRole } from '@app/users-lib/enums';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const createUserDto = plainToInstance(CreateUserDto, value);

    if (createUserDto.role === UserRole.DOCTOR) {
      delete createUserDto.causeOfVisit;
      delete createUserDto.doctorSpeciality;
      delete createUserDto.doctorPricePerHour;
      delete createUserDto.doctorExperience;
    }

    if (createUserDto.role === UserRole.PATIENT) {
      delete createUserDto.experience;
      delete createUserDto.pricePerHour;
      delete createUserDto.speciality;
    }

    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return createUserDto;
  }
}
