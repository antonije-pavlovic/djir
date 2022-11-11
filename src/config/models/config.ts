import { IAppConfig } from './app';
import { IMongoConfig } from './database';

export const ENVIRONMENT = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production'
}

export interface IConfig {
  app: IAppConfig;
  mongo: IMongoConfig
}