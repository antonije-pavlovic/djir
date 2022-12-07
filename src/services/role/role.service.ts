import RoleRepository from './role.repository';
import { IRole } from './role.types';

export default class AccountService {

  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  public create = async (): Promise<IRole[]> => {
    return await this.roleRepository.getAllRoles();
  }
}