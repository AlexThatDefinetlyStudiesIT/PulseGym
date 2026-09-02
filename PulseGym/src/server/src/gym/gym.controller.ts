import { Controller, Get, Param, Body, Post, Delete} from '@nestjs/common';
import { Gym } from './gym.entity';
import { GymsService } from './gym.service';

@Controller('gyms')
export class GymController {
  constructor(private readonly gymsService: GymsService) {}
  @Post()
  create(@Body() gym: Gym) {
    return this.gymsService.create(gym);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gymsService.remove(+id);
  }
  @Get()
  findAll() {
    return this.gymsService.findAll();
  }
}

