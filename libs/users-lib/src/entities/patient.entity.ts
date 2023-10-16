import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { HiddenDoctor } from './hidde-doctor.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', name: 'doctor_speciality', nullable: false })
  doctorSpeciality: string;

  @Column({ type: 'varchar', name: 'cause_of_visit', nullable: false })
  causeOfVisit: string;

  @Column({ type: 'int', name: 'doctor_experience_in_years', nullable: false })
  doctorExperience: number;

  @Column({ type: 'int', name: 'doctor_price_per_hour_in_usd', nullable: false })
  doctorPricePerHour: number;

  @OneToOne((type) => User, (user) => user.patient)
  user?: User;

  @OneToMany(() => HiddenDoctor, (hiddenDoctor) => hiddenDoctor.patient)
  @JoinColumn()
  hiddenDoctors?: HiddenDoctor[];
}
