import RoleRepository from './role.repository';
import { IRole } from './role.types';

export default class RoleService {

  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  public getAllRoles = async (): Promise<IRole[]> => {
    return await this.roleRepository.getAllRoles();
  }
}