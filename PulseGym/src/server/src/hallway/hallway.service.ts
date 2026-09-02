import { Injectable } from '@nestjs/common';
import { Hallway } from './hallway.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gym } from '../gym/gym.entity';

@Injectable()
export class HallwaysService{
  constructor(
    @InjectRepository(Hallway)
    private readonly hallwayRepository: Repository<Hallway>,
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>) {}

  async create(hall: Hallway): Promise<Hallway> {
    const enterGym = await this.gymRepository.findOne({ where: { id: hall.enter_id } });
    const exitGym = await this.gymRepository.findOne({ where: { id: hall.exit_id } });
    if (!enterGym || !exitGym) {
      throw new Error("Один или несколько указанных залов не существуют.");
    }
    var existingHallway = await this.hallwayRepository.findOne({ 
      where: { enter_id: hall.enter_id, exit_id: hall.exit_id } 
    });

    if (existingHallway) {
      throw new Error("Маршрут уже существует.");
    }
    existingHallway = await this.hallwayRepository.findOne({ 
      where: { enter_id: hall.exit_id, exit_id: hall.enter_id } 
    });
    if (existingHallway) {
      throw new Error("Маршрут уже существует.");
    }
    if (hall.weight<0){
      throw new Error("Вес не может быть отрицательным.");
    }
    const newHallway = this.hallwayRepository.create({
      id: hall.id,
      enter_id: hall.enter_id,
      exit_id: hall.exit_id,
      weight: hall.weight,
    });
    const savedHallway = await this.hallwayRepository.save(newHallway);
    const reverHall = new Hallway();
    reverHall.id=newHallway.id+1,
    reverHall.enter_id=newHallway.exit_id;
    reverHall.exit_id=newHallway.enter_id;
    reverHall.weight=newHallway.weight;
    this.create_rev(reverHall);
    return savedHallway;
  }

  async create_rev(hall:Hallway) {
    const newHallway = this.hallwayRepository.create({
      enter_id: hall.enter_id,
      exit_id: hall.exit_id,
      weight: hall.weight,
      });
    this.hallwayRepository.save(newHallway);
  }

  async findAll(): Promise<Hallway[]> {
    const halls = await this.hallwayRepository.find({});
    return halls; 
  }

  async remove(id: number) {
    await this.hallwayRepository.delete(id);
  }
}


      

