import { Doctor, Patient } from '@app/users-lib/entities';
import { IGenericRepository } from '../repositories';

export abstract class IDataServices {
  abstract doctors: IGenericRepository<Doctor>;
  abstract patients: IGenericRepository<Patient>;
}
