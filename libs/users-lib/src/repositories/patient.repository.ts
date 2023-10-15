import { IGenericRepository } from '@app/common-lib/repositories';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../entities';

export class PatientRepository extends IGenericRepository<Patient> {
  public constructor(@InjectRepository(Patient) private readonly patientRepository: Repository<Patient>) {
    super();
  }

  public findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }
  public findOneById(id: number): Promise<Patient> {
    return this.patientRepository.findOne({ where: { id } });
  }

  public create(item: Patient): Promise<Patient> {
    const patient = this.patientRepository.create(item);
    return this.patientRepository.save(patient);
  }
  public async update(id: number, item: Partial<Patient>) {
    const doctor = await this.patientRepository.preload({ id: Number(id), ...item });
    return this.patientRepository.save(doctor);
  }
}
