import { IAppConfig } from './app';
import { IPostgresConfig } from './database';
import { TemplateRole } from './roles';

export const ENVIRONMENT = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production'
}

export interface IConfig {
  app: IAppConfig;
  postgres  : IPostgresConfig;
  roles: TemplateRole
}