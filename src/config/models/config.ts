import { IAppConfig } from './app';
import { IMongoConfig, IPostgresConfig } from './database';

export interface IConfig {
  app: IAppConfig;
  postgres: IPostgresConfig;
  mongo: IMongoConfig
}