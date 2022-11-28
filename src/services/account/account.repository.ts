import BaseRepository from '../../repository/base.repository';
import { IAccount, AccountUpdate, AccountCreate } from './account.types';

export default class AccountRepository extends BaseRepository {
  protected table = 'accounts';

  public create = async (account: AccountCreate): Promise<IAccount>  => {
    const transformedObject = this.transformIn(account);

    const columns = this.concatObjectKeys(transformedObject);
    const placeholders = this.getQueryPlaceholders(transformedObject);

    const queryText = `INSERT INTO ${ this.table }(${columns}) VALUES( ${ placeholders } ) RETURNING *`
    const values = Object.values(transformedObject);

    const result = await this.executeQuery(queryText, values);
    return this.tranformOut(result.rows[0]) as IAccount;
  }

  public getById = async (id: number): Promise<IAccount>  => {
    const queryText = `SELECT * FROM ${ this.table } WHERE id = $1`;

    const result = await this.executeQuery(queryText, [id]);
    return this.tranformOut(result.rows[0]) as IAccount;
  }

  public deleteById = async (id: number): Promise<boolean> => {
    const queryText = `DELETE FROM ${ this.table } WHERE id = $1`;

    const result = await this.executeQuery(queryText, [id]);
    if(result.rowCount) {
      return true;
    }

    return false;
  }

  public updateById = async (id: number, doc: AccountUpdate): Promise<boolean | null> => {
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