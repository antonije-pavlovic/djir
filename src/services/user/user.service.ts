import { hashPassword } from '../../libs/bcrypt';
import AuthorizationService from '../authorization/authorization.service';
import { Role } from '../authorization/roles';
import UserRepository from './user.repository';
import { UserCreate, UserUpdate } from './user.types';

export default class UserService {

  private userRepository: UserRepository;
  private authorizationService: AuthorizationService;

  constructor() {
    this.userRepository = new UserRepository();
    this.authorizationService = new AuthorizationService();
  }

  public create = async (user: UserCreate) => {
    user.password = await hashPassword(user.password);
    const roleIds = await this.authorizationService.getRoleIdsForNames([Role.PUBLIC_USER])

    return await this.userRepository.create(user, roleIds );
  }

  public getById = async (id: number) => {
    return await this.userRepository.getById(id);
  }

  public deleteById = async (id: number) => {
    return await this.userRepository.deleteById(id);
  }

  public updateById = async (id: number, user: UserUpdate) => {
    return await this.userRepository.updateById(id, user);
  }
}