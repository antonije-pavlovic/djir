export interface IPostgresConfig {
  username: string,
  password: string,
  database: string,
  host: string,
  port: number
}

export interface IMongoConfig {
  username: string,
  password: string,
  port: number
  host: string;
  database: string;

  maxPoolSize: number;
  minPoolSize: number;
  maxConnecting: number;
}