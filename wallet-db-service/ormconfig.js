require('dotenv').config();

const isDocker = process.env.APP_ENV === 'docker';

module.exports = {
  type: 'mysql',
  host: isDocker ? process.env.DB_HOST_DOCKER : process.env.DB_HOST_LOCAL,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
};
