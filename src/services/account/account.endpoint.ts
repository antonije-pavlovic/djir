import { FastifyReply } from 'fastify'
import AccountMap from './account.data.mapper';
import AccountService from './account.service';
import { AccountUpdate, IAccountDB } from './account.types';
import { ApiBodyRequest, ApiRequest, IdAPI, ApiParamsRequest } from '../api/api.types';

export default class AccountEndpoint {

  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  public create = async (request: ApiBodyRequest<IAccountDB>, reply: FastifyReply) => {
    const new_account = await this.accountService.create(request.body);
    const account_dto = AccountMap.to_DTO(new_account)

    reply.code(200).send(account_dto);
  }

  public get_by_id = async (request: ApiParamsRequest<IdAPI>, reply: FastifyReply) => {
    const new_account = await this.accountService.get_by_id(request.params.id);
    const account_dto = AccountMap.to_DTO(new_account)

    reply.code(200).send(account_dto);
  }

  public delete_by_id = async (request: ApiParamsRequest<IdAPI>, reply: FastifyReply) => {
    const result = await this.accountService.delete_by_id(request.params.id);
    reply.code(200).send(result);
  }

  public update_by_id = async (request: ApiRequest<AccountUpdate, IdAPI>, reply: FastifyReply) => {
    const result = await this.accountService.update_by_id(request.params.id, request.body);
    reply.code(200).send(result);
  }
}
