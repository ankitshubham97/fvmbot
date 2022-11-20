import { Sequelize } from 'sequelize-typescript';
import { DEV } from '../../constants';

import EnvService from '../../services/env';
import logger from '../../services/logger';

logger.info(`Connecting to ${EnvService.env().PGDATABASE}`);

export const sequelize = new Sequelize(
  EnvService.env().PGDATABASE,
  EnvService.env().PGUSER,
  EnvService.env().PGPASSWORD,
  {
    host: EnvService.env().PGHOST,
    port: Number(EnvService.env().PGPORT),
    dialect: 'postgres',
    models: [__dirname + '/**/*.model.*'],
    repositoryMode: true,
    dialectOptions: {
      ssl: EnvService.env().NODE_ENV !== DEV,
    }
  }
);
