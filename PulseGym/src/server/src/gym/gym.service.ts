import { Injectable } from '@nestjs/common';
import { Gym } from './gym.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GymsService{
  constructor(
    @InjectRepository(Gym)
    private readonly gymRepository: Repository<Gym>,
  ) {}
  async create(new_gym:Gym): Promise<Gym>
  {
    const gym = this.gymRepository.create(new_gym);
    gym.id=new_gym.id;
    await this.gymRepository.save(gym);
    return gym;
  }
  async findAll(): Promise<Gym[]> {
    const gyms = await this.gymRepository.find({});
    return gyms; 
  }
  remove(id: number) {
    this.gymRepository.delete({ id }); 
  } 
}
