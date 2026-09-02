import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('Hallway')
export class Hallway {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enter_id: number;

  @Column()
  exit_id: number;

  @Column()
  weight: number;
}
