import { FastifyReply } from 'fastify'
import { ApiBodyRequest } from '../api/api.types';
import UserMap from '../user/user.data.mapper';
import AuthenticationService from './authentication.service';
import { IRegister } from './authentication.types';

export default class AuthenticationEndpoint {

  private authService: AuthenticationService;
  constructor() {
    this.authService = new AuthenticationService();
  }

  public register = async (request: ApiBodyRequest<IRegister>, reply: FastifyReply) => {
    const newUser = await this.authService.register(request.body);
    const userDto = UserMap.toDTO(newUser);

    reply.code(200).send(userDto);
  }
}
