import BaseRepository from '../../repository/base.repository';
//import { TRANSACTION } from '../../repository/repository.models';

export default class AuthorizationRepository extends BaseRepository {

  private static instance: AuthorizationRepository;

  public static getInstance(): AuthorizationRepository {
    if (!AuthorizationRepository.instance) {
      AuthorizationRepository.instance = new AuthorizationRepository();
    }

    return AuthorizationRepository.instance;
  }

  protected tableTemplateRoles = 'template_roles';
  protected tableTemplatePermissions = 'template_permissions';


  private templatePermissions;
  //private templateRoles;

  private async _getTemplatePermissions () {
    if (!this.templatePermissions) {

      const queryText = `SELECT * FROM template_permissions;`
      const result = await this.executeQuery(queryText);
      this.templatePermissions = result.rows.map(row => {
        return {
          id: row['id'],
          name: row['name']
        }
      });
    }

    return this.templatePermissions;
  }

  public async getTemplatePermssions() {
    return await this._getTemplatePermissions();
  }

}