import { IGenericRepository } from '@app/common-lib/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm';
import { HiddenDoctor } from '../entities/hidde-doctor.entity';
import { Doctor } from '../entities';

export class HiddenDoctorsRepository extends IGenericRepository<HiddenDoctor> {
  public constructor(
    @InjectRepository(HiddenDoctor) private readonly hiddenDoctorRepository: Repository<HiddenDoctor>,
  ) {
    super();
  }
  public findAll(options?: FindManyOptions<HiddenDoctor>): Promise<HiddenDoctor[]> {
    return this.hiddenDoctorRepository.find(options);
  }

  public findOne(doctorId: number, patientId: number): Promise<HiddenDoctor> {
    return this.hiddenDoctorRepository.findOne({ where: { doctor: { id: doctorId }, patient: { id: patientId } } });
  }

  public findOneById(id: number): Promise<HiddenDoctor> {
    return this.hiddenDoctorRepository.findOne({ where: { id } });
  }
  public create(item: HiddenDoctor): Promise<HiddenDoctor> {
    const hiddenDoctor = this.hiddenDoctorRepository.create(item);
    return this.hiddenDoctorRepository.save(hiddenDoctor);
  }
  public async update(id: number, item: Partial<HiddenDoctor>) {
    const doctor = await this.hiddenDoctorRepository.preload({ id: Number(id), ...item });
    return this.hiddenDoctorRepository.save(doctor);
  }

  public deleteById(id: number): Promise<DeleteResult> {
    return this.hiddenDoctorRepository.delete({ id });
  }
}
