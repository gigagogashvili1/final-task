import { BaseEntity } from '@app/common-lib/entities';
import { Column, Entity } from 'typeorm';
import { Gender } from '../enums';

@Entity('doctors')
export class Doctor extends BaseEntity {
  @Column({ type: 'smallint', name: 'price_per_hour', nullable: false })
  pricePerHour: number;

  @Column({ type: 'smallint', nullable: false })
  experience: number;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  speciality: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;
}
