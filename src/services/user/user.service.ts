import { hashPassword } from '../../libs/bcrypt';
import UserRepository from './user.repository';
import { UserCreate, UserUpdate } from './user.types';
import config from '../../config/config';

export default class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public create = async (user: UserCreate) => {
    user.password = await hashPassword(user.password)
    const roleIds = config.roles.publicUser.id;

    return await this.userRepository.create(user, [roleIds]);
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