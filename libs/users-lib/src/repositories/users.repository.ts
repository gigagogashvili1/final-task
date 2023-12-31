import { IGenericRepository } from '@app/common-lib/repositories';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

export class UsersRepository extends IGenericRepository<User> {
  public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super();
  }

  public findAll(options?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(options);
  }

  public findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['doctor', 'patient'] });
  }

  public findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email }, relations: ['doctor', 'patient'] });
  }

  public create(item: User): Promise<User> {
    const patient = this.userRepository.create(item);
    return this.userRepository.save(patient);
  }
  public async update(id: number, item: Partial<User>) {
    const patient = await this.userRepository.preload({ id, ...item });
    return this.userRepository.save(patient);
  }
  public createQueryBuilder(allias: string) {
    return this.userRepository.createQueryBuilder(allias);
  }
}
