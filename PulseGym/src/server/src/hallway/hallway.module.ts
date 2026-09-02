import { Module } from "@nestjs/common";
import { Hallway } from "./hallway.entity";
import { HallwaysService } from "./hallway.service";
import { HallwayController } from "./hallway.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gym } from "../gym/gym.entity";

@Module ({
    controllers: [HallwayController],
    providers: [HallwaysService],
    imports:[TypeOrmModule.forFeature([Hallway, Gym])],
})
export class HallwaysModule{}