import BaseRepository from '../../repository/base.repository';
import { IRole } from './role.types';

export default class RoleRepository extends BaseRepository {
  protected table = 'roles';

  public getAllRoles = async (): Promise<IRole[]>  => {
    const queryText = `SELECT * FROM ${ this.table }`;

    const result = await this.executeQuery(queryText);
    return this.tranformOut(result.rows[0]) as IRole[];
  }
}