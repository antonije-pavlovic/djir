import UserRepository from './user.repository';
import { UserCreate, UserUpdate } from './user.types';

export default class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public create = async (user: UserCreate) => {
    return await this.userRepository.create(user);
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