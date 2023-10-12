import { IGenericRepository } from '@app/common-lib/repositories';
import { Doctor } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DoctorsRepository extends IGenericRepository<Doctor> {
  public constructor(@InjectRepository(Doctor) private readonly doctorsRepository: Repository<Doctor>) {
    super();
  }
  public findAll(): Promise<Doctor[]> {
    return this.doctorsRepository.find();
  }
  public findOneById(id: number): Promise<Doctor> {
    return this.doctorsRepository.findOne({ where: { id } });
  }
  public findOneByEmail(email: string): Promise<Doctor> {
    return this.doctorsRepository.findOne({ where: { email } });
  }
  public create(item: Doctor): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(item);
    return this.doctorsRepository.save(doctor);
  }
  public async update(id: number, item: Doctor) {
    const doctor = await this.doctorsRepository.preload({ id, ...item });
    return this.doctorsRepository.save(doctor);
  }
}
