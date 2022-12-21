import { FastifyReply } from 'fastify'
import { HTTP_SUCCESS_CODE } from '../../errors/success.codes';
import { ApiBodyRequest } from '../api/api.types';
import AuthenticationService from './authentication.service';
import { ILoginCredentials, IRegister } from './authentication.types';

export default class AuthenticationEndpoint {

  private authService: AuthenticationService;
  constructor() {
    this.authService = new AuthenticationService();
  }

  public register = async (request: ApiBodyRequest<IRegister>, reply: FastifyReply) => {
    await this.authService.register(request.body);

    reply.code(HTTP_SUCCESS_CODE.NO_CONTENT.status);
  }

  public login = async (request: ApiBodyRequest<ILoginCredentials>, reply: FastifyReply) => {
    const result = await this.authService.login(request.body);

    reply.code(HTTP_SUCCESS_CODE.REQUEST_WAS_SUCCESSFUL.status).send(result);
  }
}
