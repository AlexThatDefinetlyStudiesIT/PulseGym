import { Controller, Get, Param, Body, Post, Delete} from '@nestjs/common';
import { Hallway } from './hallway.entity';
import { HallwaysService } from './hallway.service';

@Controller('hallways')
export class HallwayController {
  constructor(private readonly hallwaysService: HallwaysService) {}
  @Get()
  findAll() {
    return this.hallwaysService.findAll();
  }
  @Post()
  create(@Body() hall: Hallway) {
    return this.hallwaysService.create(hall);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.hallwaysService.remove(id);
  }
}

