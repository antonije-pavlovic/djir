import { Db, MongoClient } from 'mongodb';
import config from '../../config/config';

export default class MongoBaseRepository {
  protected client: MongoClient;
  protected database: Db;

  constructor() {
    const username = config.mongo.username;
    const password = config.mongo.password;
    const port = config.mongo.port;
    const host = config.mongo.host;
    const database = config.mongo.database;

    const url = `mongodb://${username}:${password}@${host}:${port}/${database}`;

    this.client = new MongoClient(url, {
      maxPoolSize: config.mongo.maxPoolSize,
      minPoolSize: config.mongo.minPoolSize,
      maxConnecting: config.mongo.maxConnecting,
    });

    // avoid await on purpose
    this.client.connect().then(() => {
      console.log('connected to database');
    })

    this.database = this.client.db(database);
  }
}