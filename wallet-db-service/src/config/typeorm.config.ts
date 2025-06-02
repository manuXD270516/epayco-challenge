import * as dotenv from 'dotenv';
dotenv.config();
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isDocker = process.env.APP_ENV === 'docker';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL,
  port: parseInt(process.env.DB_PORT ?? '3306', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  synchronize: true,
};