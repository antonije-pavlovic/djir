import UserModel from './user.db';
import UserRepository from './user.repository';
import { DeleteUser, IUser, UpdateUser, UserGet } from './user.types';

export default class UserService {

  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(UserModel);
  }

  public create = async (user: IUser): Promise<IUser> => {
    return await this.userRepository.create(user);
  }

  public async get(filter: UserGet): Promise<IUser>{
    return await this.userRepository.get(filter);
  }

  public async update(params: UpdateUser): Promise<IUser> {
    return await this.userRepository.update(params);
  }

  public async delete(filter: DeleteUser): Promise<IUser> {
    return await this.userRepository.delete(filter);
  }
}