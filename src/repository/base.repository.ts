/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import config from '../config/config';
import { Pool, PoolClient } from 'pg';
import { DestructuredQuery } from './repository.models';


export default class BaseRepository {

  protected pool: Pool;
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

  protected executeQuery = async (text: any, values: any) => {
    console.log(text)
    console.log(values)
    return await this.pool.query(text, values)
  }

  /**
   * Use to get one client from the pool.
   * Use for transactions.
   *
   * @returns PoolClient
   */
  protected getClient = async (): Promise<PoolClient>  =>{
    return await this.pool.connect();
  }

  protected _create = async (object: any) => {
    const destructureQueryObject = this.destructureQueryObject(object)

    if(!destructureQueryObject) {
      return;
    }

    const queryText = `INSERT INTO ${this.table}(${ destructureQueryObject.keys })
          VALUES(${ destructureQueryObject.placeholders }) RETURNING *`;

    return await this.executeQuery(queryText, destructureQueryObject.values)
  }

  protected destructureQueryObject(object: any): DestructuredQuery | null {
    const values = Object.values(object);
    const keys = Object.keys(object);
    const numOfProps = values.length;

    if(!numOfProps) {
      return null;
    }

    let placeholders = '$1';
    for(let i = 1; i < numOfProps; i++) {
      placeholders += `, $${i + 1}`
    }

    const doubleQuatedKeys: string[] = []
    for(let i = 0; i < numOfProps; i++) {
      doubleQuatedKeys.push(`${keys[i]}`)
    }
    return {
      keys: doubleQuatedKeys,
      values,
      placeholders
    }
  }
}
