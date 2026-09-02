import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymsModule } from './gym/gym.module';
import { HallwaysModule } from './hallway/hallway.module';
@Module({
  imports: [
    GymsModule, HallwaysModule, //модули Залов и Маршрутов
    TypeOrmModule.forRoot({ //связь с БД
      type:'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'gymDB',
      synchronize:false,
      logging: 'all',
      entities: ['dist/**/*.entity.js']
    })
],
  controllers: [],
  providers: [],
})
export class AppModule {}
