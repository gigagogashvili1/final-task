import { FindManyOptions } from 'typeorm';

export abstract class IGenericRepository<T> {
  abstract findAll(options?: FindManyOptions<T>): Promise<T[]>;

  abstract findOneById(id: number): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: number, item: Partial<T>): Promise<T>;
}
