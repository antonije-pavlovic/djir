import { IUser, UserDTO } from './user.types';

export default class UserMap {
  public static toDTO(user: IUser): UserDTO {
    return {
      id: user.id,

      username: user.username,
      email: user.email,
    };
  }

  public static toDTOArray(_user: IUser[]): UserDTO[] {
    throw Error();
  }
}