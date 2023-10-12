import { BaseEntity } from '@app/common-lib/entities';
import { Column, Entity } from 'typeorm';
import { Gender } from '../enums';

@Entity('patients')
export class Patient extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @Column({ type: 'varchar', nullable: false })
  doctorSpeciality: string;

  @Column({ type: 'varchar', name: 'cause_of_visit', nullable: false })
  causeOfVisit: string;
}
