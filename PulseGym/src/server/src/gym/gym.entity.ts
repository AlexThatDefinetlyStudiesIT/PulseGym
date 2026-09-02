import { Entity, PrimaryColumn } from 'typeorm';
@Entity('Gym')
export class Gym {
  @PrimaryColumn()
  id: number;  
}
