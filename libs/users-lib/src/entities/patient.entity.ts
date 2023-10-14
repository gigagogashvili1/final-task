import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', nullable: false })
  doctorSpeciality: string;

  @Column({ type: 'varchar', name: 'cause_of_visit', nullable: false })
  causeOfVisit: string;

  @OneToOne((type) => User, (user) => user.patient)
  user?: User;
}
