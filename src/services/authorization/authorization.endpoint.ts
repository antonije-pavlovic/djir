import AuthorizationService from './authorization.service';
import { FastifyReply } from 'fastify'
import { ApiParamsRequest } from '../api/api.types';

export default class AuthorizationEndpoint {
  private authorizationService: AuthorizationService;

  constructor() {
    this.authorizationService = new AuthorizationService();
  }

  public getTemplatePermssions = async (_request: ApiParamsRequest<any>, reply: FastifyReply) => {
    const result = await this.authorizationService.getTemplatePermssions();

    reply.code(200).send(result);
  }

}
