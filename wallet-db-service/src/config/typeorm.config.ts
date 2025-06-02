import * as dotenv from 'dotenv';
dotenv.config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'walletdb',
  autoLoadEntities: true,
  synchronize: true, // Desactívalo en producción
};
