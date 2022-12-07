import BaseRepository from '../../repository/base.repository';
import { IUser, UserCreate, UserUpdate } from './user.types';

export default class UserRepositpry extends BaseRepository {
  protected table = 'users';

  public create = async (user: UserCreate): Promise<IUser>  => {
    const transformedObject = this.transformIn(user);

    const columns = this.concatObjectKeys(transformedObject);
    const placeholders = this.getQueryPlaceholders(transformedObject);

    const queryText = `INSERT INTO ${ this.table }(${columns}) VALUES( ${ placeholders } ) RETURNING *`
    const values = Object.values(transformedObject);

    const result = await this.executeQuery(queryText, values);
    return this.tranformOut(result.rows[0]) as IUser;
  }

  public getById = async (id: number): Promise<IUser>  => {
    const queryText = `SELECT * FROM ${ this.table } WHERE id = $1`;

    const result = await this.executeQuery(queryText, [id]);
    return this.tranformOut(result.rows[0]) as IUser;
  }

  public deleteById = async (id: number): Promise<boolean> => {
    const queryText = `DELETE FROM ${ this.table } WHERE id = $1`;

    const result = await this.executeQuery(queryText, [id]);
    if(result.rowCount) {
      return true;
    }

    return false;
  }

  public updateById = async (id: number, doc: UserUpdate): Promise<boolean | null> => {
    const transformedObject = this.transformIn(doc);

    const setPlaceholders = this.getUpdatePlaceholders(doc)

    if (!setPlaceholders) {
      return null;
    }

    const values: any[] = Object.values(transformedObject);
    values.push(id);
    const queryText = `UPDATE  ${ this.table } SET ${ setPlaceholders } WHERE id = $${values.length}`;

    const result = await this.executeQuery(queryText, values);

    if(result.rowCount) {
      return true;
    }

    return false;
  }
}