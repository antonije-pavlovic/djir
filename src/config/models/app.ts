export interface IAppConfig {
  port: number;
  env: string;
}

export const ENVIRONMENT = {
  LOCAL: 'local',
  DEVELOPMENT: 'development',
  TEST: 'test',
  PRODUCTION: 'production'
}