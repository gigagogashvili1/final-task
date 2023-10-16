import { IGenericRepository } from '@app/common-lib/repositories';
import { Doctor } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

export class DoctorsRepository extends IGenericRepository<Doctor> {
  public constructor(@InjectRepository(Doctor) private readonly doctorsRepository: Repository<Doctor>) {
    super();
  }
  public findAll(options?: FindManyOptions<Doctor>): Promise<Doctor[]> {
    return this.doctorsRepository.find(options);
  }
  public findOneById(id: number): Promise<Doctor> {
    return this.doctorsRepository.findOne({ where: { id } });
  }
  public create(item: Doctor): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(item);
    return this.doctorsRepository.save(doctor);
  }
  public async update(id: number, item: Partial<Doctor>) {
    const doctor = await this.doctorsRepository.preload({ id: Number(id), ...item });
    return this.doctorsRepository.save(doctor);
  }

  public createQueryBuilder(allias: string) {
    return this.doctorsRepository.createQueryBuilder(allias);
  }
}
