import AuthorizationRepository from './authorization.repository';
import { Role } from './roles';

export default class AuthorizationService {

  private authorizationRepository: AuthorizationRepository;

  constructor() {
    this.authorizationRepository = AuthorizationRepository.getInstance();
  }

  public getTemplatePermssions = async () => {
    return await this.authorizationRepository.getTemplatePermssions();
  }

  public getTemplateRoles = async () => {
    return await this.authorizationRepository.getTemplateRoles();
  }

  public getRoleIdsForNames = async (roleNames: Role[]) => {
    const templateRoles = await this.authorizationRepository.getTemplateRoles();
    const ids: number[] = [];

    for(let i = 0; i < templateRoles.length; i++) {
      if(roleNames.includes(templateRoles[i].name)) {
        ids.push(templateRoles[i].id);
      }
    }

    return ids;
  }
}