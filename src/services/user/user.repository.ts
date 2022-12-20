import BaseRepository from '../../repository/base.repository';
import { TRANSACTION } from '../../repository/repository.models';
import { IUser, UserCreate, UserUpdate } from './user.types';

export default class UserRepositpry extends BaseRepository {
  protected table = 'users';

  public create = async (user: UserCreate, roleIds: number[]): Promise<IUser>  => {
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

      // INSET INTO ROLE_USER
      let roleUserQueryText = `INSERT INTO user_role(user_id, role_id) VALUES `;
      for( let i = 0; i < roleIds.length; i++) {
        roleUserQueryText += `(${result.rows[0].id}, ${roleIds[i]}),`;
      }
      roleUserQueryText = roleUserQueryText.slice(0, -1);
      await client.query(roleUserQueryText);

      await client.query(TRANSACTION.COMMIT);

      return await this.getById(result.rows[0].id);
    } catch(error) {

      await client.query(TRANSACTION.ROLLBACK);
      throw error;

    } finally {
      client.release();
    }
  }

  public getById = async (id: number): Promise<IUser>  => {
    const queryText = `SELECT users.id as user_id, users.username, users.email,
                      users.password, permissions.id as permission_id FROM users
                INNER JOIN user_role 
                   ON users.id = user_role.user_id
                INNER JOIN roles
                    ON user_role.role_id = roles.id
                INNER JOIN role_permission
                    ON roles.id = role_permission.role_id
                INNER JOIN permissions
                    ON role_permission.permission_id = permissions.id
                WHERE users.id = $1`;
    const result = await this.executeQuery(queryText, [id]);

    const fullUser: IUser = {
      id: result.rows[0]['user_id'],
      username: result.rows[0]['username'],
      email: result.rows[0]['email'],
      password: result.rows[0]['password'],
      permissions: []
    };
    for(let i = 0; i < result.rows.length; i++) {
      fullUser.permissions.push(result.rows[i]['permission_id'])
    }
    return fullUser;
  }
  // TODO: use transaction, use soft delete on role_user table, add field deleted: true/false
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