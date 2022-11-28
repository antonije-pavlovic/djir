import { FastifyReply } from 'fastify'
import AccountMap from './account.data.mapper';
import AccountService from './account.service';
import { AccountCreate, AccountUpdate } from './account.types';
import { ApiBodyRequest, ApiRequest, IdAPI, ApiParamsRequest } from '../api/api.types';

export default class AccountEndpoint {

  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  public create = async (request: ApiBodyRequest<AccountCreate>, reply: FastifyReply) => {
    const newAccount = await this.accountService.create(request.body);
    const accountDto = AccountMap.toDTO(newAccount);
    reply.code(200).send(accountDto);
  }

  public getById = async (request: ApiParamsRequest<IdAPI>, reply: FastifyReply) => {
    const newAccount = await this.accountService.getById(request.params.id);
    const accountDto = AccountMap.toDTO(newAccount);

    reply.code(200).send(accountDto);
  }

  public deleteById = async (request: ApiParamsRequest<IdAPI>, reply: FastifyReply) => {
    const result = await this.accountService.deleteById(request.params.id);
    if(result) {
      reply.code(200).send({ success: result });
    }
  }

  public updateById = async (request: ApiRequest<AccountUpdate, IdAPI>, reply: FastifyReply) => {
    const result = await this.accountService.updateById(request.params.id, request.body);
    if(result) {
      reply.code(200).send({ success: result });
    }
  }
}
