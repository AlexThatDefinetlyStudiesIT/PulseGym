import { DataSource } from 'typeorm';

const ormConfig: DataSource = new DataSource({
  type:'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'gymDB',
  synchronize:false,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  //migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'] 
});


export default ormConfig;
