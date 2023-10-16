import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { HiddenDoctor } from './hidde-doctor.entity';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'smallint', name: 'price_per_hour_in_usd', nullable: false })
  pricePerHour: number;

  @Column({ type: 'smallint', name: 'experience_in_years', nullable: false })
  experience: number;

  @Column({ type: 'varchar', nullable: false })
  speciality: string;

  @OneToOne((type) => User, (user) => user.doctor)
  user?: User;

  @OneToMany(() => HiddenDoctor, (hiddenDoctor) => hiddenDoctor.doctor)
  hiddenByPatients?: HiddenDoctor[];
}
