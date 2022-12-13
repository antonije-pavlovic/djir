import BaseRepository from '../../repository/base.repository';
import { TRANSACTION } from '../../repository/repository.models';
import { IUser, UserCreate, UserUpdate } from './user.types';

export default class UserRepositpry extends BaseRepository {
  protected table = 'users';

  /**
   * TODO: use transaction for creating use and user permission
   */
  public create = async (user: UserCreate, roleIds: number[]): Promise<IUser>  => {
    /**
     * Open transaction
     * insert user
     * insert role
     * insert permissions
     * insert role_permission
     * close transaction
     */
    const client = await this.getClient();
    try {
      await client.query(TRANSACTION.BEGIN);

      // CREATE USER
      const transformedUserObject = this.transformIn(user);

      const transformedObject = this.transformIn(user);

      const columns = this.concatObjectKeys(transformedObject);
      const placeholders = this.getQueryPlaceholders(transformedUserObject);

      const queryText = `INSERT INTO ${ this.table }(${columns}) VALUES( ${ placeholders } ) RETURNING *`
      const userValues = Object.values(transformedUserObject);
      const result = await client.query(queryText, userValues);
      const transformedUser = this.tranformOut(result.rows[0]) as IUser;

      // INSET INTO ROLE_USER
      let roleUserQueryText = `INSERT INTO user_role(user_id, role_id) VALUES `;
      for( let i = 0; i < roleIds.length; i++) {
        roleUserQueryText += `(${transformedUser.id}, ${roleIds[i]}),`;
      }
      roleUserQueryText = roleUserQueryText.slice(0, -1);
      await client.query(roleUserQueryText);

      await client.query(TRANSACTION.COMMIT);
      return transformedUser;

    } catch(error) {

      await client.query(TRANSACTION.ROLLBACK);
      throw error;

    } finally {
      client.release();
    }
  }

  public getById = async (id: number): Promise<IUser>  => {
    const queryText = `SELECT * FROM ${ this.table } WHERE id = $1`;

    const result = await this.executeQuery(queryText, [id]);
    return this.tranformOut(result.rows[0]) as IUser;
  }

  // TODO: soft delete in user_role -> use transaction
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