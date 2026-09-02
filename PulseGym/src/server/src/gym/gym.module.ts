import { Module } from "@nestjs/common";
import { Gym } from "./gym.entity";
import { GymsService } from "./gym.service";
import { GymController } from "./gym.controller";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module ({
    controllers: [GymController],
    providers: [GymsService],
    imports:[TypeOrmModule.forFeature([Gym])],
})
export class GymsModule{}