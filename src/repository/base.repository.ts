/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import config from '../config/config';
import { Pool, PoolClient } from 'pg';


export default class BaseRepository {

  private pool: Pool;
  protected table: string;

  constructor() {
    this.connect()
  }

  private connect = () => {
    this.pool = new Pool({
      host: config.postgres.host,
      port: config.postgres.port,
      user: config.postgres.username,
      password: config.postgres.password,
      max: 20
    });

    this.pool.on('error', (err: Error) => {
      console.log(err);
    });
  }

  protected execute_query = async (text: any, values?: any) => {
    return await this.pool.query(text, values)
  }

  /**
   * Use to get one client from the pool.
   * Use for transactions.
   *
   * @returns PoolClient
   */
  protected get_client = async (): Promise<PoolClient>  =>{
    return await this.pool.connect();
  }

  protected concat_object_keys (object: any) {
    const keys = Object.keys(object);

    if(!keys.length) {
      return null;
    }
    let concatenated_keys = `${keys[0]}`;

    for(let i = 1; i < keys.length; i ++) {
      concatenated_keys += `, ${keys[i]}`;
    }

    return concatenated_keys;
  }

  protected get_query_placeholders(object: any) {
    const keys = Object.keys(object);

    if(!keys.length) {
      return null;
    }
    let placeholders = `$1`;

    for(let i = 1; i < keys.length; i ++) {
      placeholders += `, $${ i + 1 }`;
    }

    return placeholders;
  }

  protected get_update_placeholders(object: any): string | null {
    const keys = Object.keys(object);

    if(!keys.length) {
      return null;
    }
    let placeholders = `${ keys[0] } = $1`;

    for(let i = 1; i < keys.length; i ++) {
      placeholders += `, ${ keys[i] } = $${ i + 1 }`;
    }

    return placeholders;
  }
}
