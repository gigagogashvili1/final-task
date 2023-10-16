import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';

@Entity('hidden_doctors')
@Unique(['patient', 'doctor'])
export class HiddenDoctor {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Patient, (patient) => patient.hiddenDoctors)
  patient: Patient;

  @ManyToOne(() => Doctor, (doctor) => doctor.hiddenByPatients)
  doctor: Doctor;
}
