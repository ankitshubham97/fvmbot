import './utils/loadEnv';

import EnvService from './services/env';

const services = [EnvService];
for (const service of services) {
  service.init();
  console.log('initing service')
}

import App from './app';
import { sequelize } from './models/sql/sequelize';
import UserController from './controllers/user/user.controller';
import HookController from './controllers/hook/hook.controller';

// Setup db connection and then start app
sequelize.sync().then(() => {
  const app = new App([
    new UserController(),
    new HookController(),
  ]);
  app.listen()
});
