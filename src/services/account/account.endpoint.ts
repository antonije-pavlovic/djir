import { Response } from 'express';
import { ApiBodyRequest } from '../api/api.types';
import AccountService from './account.service';
import { IAccountDB } from './account.types';

export default class AccountEndpoint {

  private userService: AccountService;
  constructor() {
    this.userService = new AccountService();
  }

  public create = async (request: ApiBodyRequest<IAccountDB>, response: Response) => {
    const newUser = await this.userService.create(request.body);
    response.status(200).json(newUser);
  }
}
