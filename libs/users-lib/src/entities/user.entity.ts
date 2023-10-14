import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, UserRole } from '../enums';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'varchar', nullable: false })
  country: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'enum', enum: Gender, nullable: false })
  gender: Gender;

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  role: UserRole;

  @OneToOne((type) => Doctor, (doctor) => doctor.user, { cascade: true })
  @JoinColumn()
  doctor?: Doctor;

  @OneToOne((type) => Patient, (patient) => patient.user, { cascade: true })
  @JoinColumn()
  patient?: Patient;
}
