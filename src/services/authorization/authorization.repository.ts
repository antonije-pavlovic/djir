import BaseRepository from '../../repository/base.repository';
import { ITemplateRole } from './roles';

export default class AuthorizationRepository extends BaseRepository {

  private static instance: AuthorizationRepository;

  public static getInstance = (): AuthorizationRepository => {
    if (!AuthorizationRepository.instance) {
      AuthorizationRepository.instance = new AuthorizationRepository();
    }

    return AuthorizationRepository.instance;
  }

  protected templateRoleTable = 'template_roles';
  protected tableTemplatePermissions = 'template_permissions';


  private templatePermissions;
  private templateRoles: ITemplateRole[] = [];

  private _getTemplatePermissions = async () => {
    if (!this.templatePermissions) {
      const queryText = `SELECT * FROM ${this.tableTemplatePermissions};`
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

  private _getTemplateRoles = async () => {
    if (!this.templatePermissions) {
      const queryText = `SELECT id, name FROM ${this.templateRoleTable};`
      const result = await this.executeQuery(queryText);
      const rows = result.rows as unknown as ITemplateRole[];

      for(let i = 0; i < rows.length; i++) {
        this.templateRoles.push({
          id: rows[i].id,
          name: rows[i].name
        });
      }
    }

    return this.templateRoles;
  }

  public getTemplatePermssions = async () => {
    return await this._getTemplatePermissions();
  }

  public getTemplateRoles = async () => {
    return await this._getTemplateRoles();
  }
}