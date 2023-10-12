export abstract class IGenericRepository<T> {
  abstract findAll(): Promise<T[]>;

  abstract findOneById(id: number): Promise<T>;

  abstract create(item: T): Promise<T>;

  abstract update(id: number, item: T): Promise<T>;
}
