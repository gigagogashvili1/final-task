import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateDoctorDto } from '../dtos';
import { User } from '../entities';
import { DoctorsRepository } from '../repositories';

@Injectable()
export class DoctorsService {
  public constructor(private readonly doctorRepository: DoctorsRepository) {}

  public async updateDoctor(id: number, updateDoctorDto: UpdateDoctorDto, reqUser: User) {
    try {
      if (Number(id) !== reqUser.doctor.id) {
        throw new ForbiddenException('You are not authorized to update this entity.');
      }

      await this.doctorRepository.update(id, updateDoctorDto);

      return 'You succesfully updated doctor!';
    } catch (err) {
      throw err;
    }
  }
}
