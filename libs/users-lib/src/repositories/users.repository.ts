import { IGenericRepository } from '@app/common-lib/repositories';
import { User } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UsersRepository extends IGenericRepository<User> {
  public constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
    super();
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  public findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  public create(item: User): Promise<User> {
    const patient = this.userRepository.create(item);
    return this.userRepository.save(patient);
  }
  public async update(id: number, item: User) {
    const patient = await this.userRepository.preload({ id, ...item });
    return this.userRepository.save(patient);
  }
}
