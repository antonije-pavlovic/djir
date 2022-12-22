import ConflictError from '../../errors/custom/conflict.error';
import ServerError from '../../errors/custom/server.error';
import BaseRepository from '../../repository/postgreSQL/base.repository';
import { POSTGRES_ERROR_CODES } from '../../repository/postgreSQL/postgres.error.codes';
import { TRANSACTION } from '../../repository/postgreSQL/repository.models';
import { IPermission, IUser, IUserFind, UserCreate, UserUpdate } from './user.types';

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

      return await this.find({ id: result.rows[0].id });

    } catch(error) {
      console.log(error)

      await client.query(TRANSACTION.ROLLBACK);

      if(error.code === POSTGRES_ERROR_CODES.UNIQUE_CONSTRAINT_OCCURRED) {
        throw new ConflictError();
      }

      throw new ServerError();

    } finally {
      client.release();
    }
  }

  public find = async (findParams: IUserFind): Promise<IUser>  => {
    try {

      let queryText = `SELECT id, username, email, password FROM users WHERE`;
      let findBy;

      if(findParams.id) {
        queryText += ` id = $1`;
        findBy = findParams.id;
      } else if(findParams.email) {
        queryText += ` email = $1`;
        findBy = findParams.email;
      }

      const userData = await this.executeQuery(queryText, [findBy]);

      const fullUser: IUser = this.tranformOut(userData.rows[0]) as IUser;
      fullUser.permissions = [];
      const userPermnissionsDataQueryText = `
            SELECT permissions.id as permission_id,
            permissions.name as permission_name , permissions.entity_id
            FROM user_role 
                      INNER JOIN roles
                          ON user_role.role_id = roles.id
                      INNER JOIN role_permission
                          ON roles.id = role_permission.role_id
                      INNER JOIN permissions
                          ON role_permission.permission_id = permissions.id
                      WHERE user_role.user_id  = $1 
                      GROUP BY permissions.id`;
      const permissionData = await this.executeQuery(userPermnissionsDataQueryText, [fullUser.id]);

      for(let i = 0; i < permissionData.rows.length; i++) {
        const permissions = this.tranformOut(permissionData.rows[i]) as IPermission
        fullUser.permissions.push(permissions);
      }

      return fullUser;
    } catch(error) {
      console.log(error);
      throw new ServerError();
    }
  }

  // TODO: use transaction, use soft delete on role_user table, add field deleted: true/false
  public deleteById = async (id: number): Promise<boolean> => {
    try {
      const queryText = `DELETE FROM ${ this.table } WHERE id = $1`;

      const result = await this.executeQuery(queryText, [id]);
      if(result.rowCount) {
        return true;
      }

      return false;
    } catch(error) {
      console.log(error);
      throw new ServerError();
    }

  }

  public updateById = async (id: number, doc: UserUpdate): Promise<boolean | null> => {
    try {
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
    } catch(error) {
      console.log(error);
      throw new ServerError();
    }
  }
}