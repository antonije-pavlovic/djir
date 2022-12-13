import UserService from '../user/user.service';
import { IRegister } from './authentication.types';

export default class AuthenticationService {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public register = async (params: IRegister) => {
    const newUser = await this.userService.create(params);
    // TODO: call email service to send confirmation email
    // TODO: calculate jwt token
    // TODO: return jwt token
    return newUser;
  }

  public login = () => {
    // TODO: find user
    // TODO: compare password
    // TODO: generate jwt
    throw Error('Not implemented');
  }

  public forgotPassword = () => {
    throw Error('Not implemented');
  }

  public resetPassword = () => {
    throw Error('Not implemented');
  }

  public refreshJwt = () => {
    throw Error('Not implemented');
  }

  public invalidateJwt = () => {
    throw Error('Not implemented');
  }

  public signJwt = () => {
    throw Error('Not implemented');
  }

  public decodeJwt = () => {
    throw Error('Not implemented');
  }
}