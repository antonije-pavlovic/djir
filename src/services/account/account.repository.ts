import BaseRepository from '../../repository/base.repository';
import { IAccountDB, AccountUpdate } from './account.types';

export default class AccountRepository extends BaseRepository {
  protected table = 'accounts';

  public create = async (account: IAccountDB): Promise<any>  => {
    const columns = this.concat_object_keys(account);
    const placeholders = this.get_query_placeholders(account);

    const query_text = `INSERT INTO ${ this.table }(${columns}) VALUES( ${ placeholders } ) RETURNING *`
    const values = Object.values(account);

    const result = await this.execute_query(query_text, values);
    return result.rows[0];
  }

  public get_by_id = async (id: number): Promise<any>  => {
    const query_text = `SELECT * FROM ${ this.table } WHERE id = $1`;

    const result = await this.execute_query(query_text, [id]);
    return result.rows[0];
  }

  public delete_by_id = async (id: number): Promise<boolean> => {
    const query_text = `DELETE FROM ${ this.table } WHERE id = $1`;

    const result = await this.execute_query(query_text, [id]);
    if(result.rowCount) {
      return true;
    }

    return false;
  }

  public update_by_id = async (id: number, doc: AccountUpdate): Promise<boolean | null> => {
    const set_placeholders = this.get_update_placeholders(doc)

    if (!set_placeholders) {
      return null;
    }

    const values: any[] = Object.values(doc);
    values.push(id);
    const query_text = `UPDATE  ${ this.table } SET ${ set_placeholders } WHERE id = $${values.length}`;

    const result = await this.execute_query(query_text, values);

    if(result.rowCount) {
      return true;
    }

    return false;
  }
}