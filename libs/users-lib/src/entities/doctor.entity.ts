import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'smallint', name: 'price_per_hour', nullable: false })
  pricePerHour: number;

  @Column({ type: 'smallint', nullable: false })
  experience: number;

  @Column({ type: 'varchar', nullable: false })
  speciality: string;

  @OneToOne((type) => User, (user) => user.doctor)
  user?: User;
}
