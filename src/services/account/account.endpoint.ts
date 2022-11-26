import { Response } from 'express';
import { ApiBodyRequest, ApiRequest, IdAPI } from '../api/api.types';
import AccountMap from './account.data.mapper';
import AccountService from './account.service';
import { AccountUpdate, IAccountDB } from './account.types';

export default class AccountEndpoint {

  private accountService: AccountService;
  constructor() {
    this.accountService = new AccountService();
  }

  public create = async (request: ApiBodyRequest<IAccountDB>, response: Response) => {
    const new_account = await this.accountService.create(request.body);
    const account_dto = AccountMap.to_DTO(new_account)

    response.status(200).json(account_dto);
  }

  public get_by_id = async (request: ApiRequest<any, IdAPI>, response: Response) => {
    const new_account = await this.accountService.get_by_id(request.params.id);
    const account_dto = AccountMap.to_DTO(new_account)

    response.status(200).json(account_dto);
  }

  public delete_by_id = async (request: ApiRequest<any, IdAPI>, response: Response) => {
    const result = await this.accountService.delete_by_id(request.params.id);
    response.status(200).json(result);
  }

  public update_by_id = async (request: ApiRequest<AccountUpdate, IdAPI>, response: Response) => {
    const result = await this.accountService.update_by_id(request.params.id, request.body);
    response.status(200).json(result);
  }
}
