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

  protected executeQuery = async (text: any, values?: any) => {
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

  /**
   * Transform object keys from camelCase to snake_case
   * @param object
   * @returns object
   */
  protected transformIn = (object: object): object => {
    const transformedObject = {};

    for(const prop in object) {
      const oldProp = prop;
      let newProp = '';
      for(let i = 0; i < prop.length; i++) {
        if(prop[i] === prop[i].toUpperCase()) {
          newProp += `_${prop[i].toLocaleLowerCase()}`
        } else {
          newProp += `${prop[i]}`
        }
      }

      transformedObject[newProp] = object[oldProp];
    }
    return transformedObject;
  }

  /**
   * Transform object keys from snake_case to camelCase
   * @param object
   * @returns object
   */
  protected tranformOut = (object: object): object => {
    const transformedObject = {};

    for(const prop in object) {
      const oldProp = prop;
      let newProp = '';
      let flag = false;
      for(let i = 0; i < prop.length; i++) {
        if(prop[i] === '_') {
          flag = true;
          continue;
        }

        if(flag) {
          newProp += prop[i].toLocaleUpperCase();
          flag = false;
          continue;
        }
        newProp += prop[i]

      }

      transformedObject[newProp] = object[oldProp];
    }
    return transformedObject;
  }


  protected concatObjectKeys (object: any) {
    const keys = Object.keys(object);

    if(!keys.length) {
      return null;
    }
    let concatenatedKeys = `${keys[0]}`;

    for(let i = 1; i < keys.length; i ++) {
      concatenatedKeys += `, ${keys[i]}`;
    }

    return concatenatedKeys;
  }

  protected getQueryPlaceholders(object: any) {
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

  protected getUpdatePlaceholders(object: any): string | null {
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
