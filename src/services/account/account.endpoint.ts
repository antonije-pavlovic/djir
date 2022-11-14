import { Response } from 'express';
import { ApiBodyRequest, ApiQueryRequest } from '../api/api.types';
import AccountService from './account.service';
import { AccountGet, IAccount, UpdateAccount, DeleteAccount, UpdateUserAPI } from './account.types';

export default class AccountEndpoint {

  private userService: AccountService;
  constructor() {
    this.userService = new AccountService();
  }

  public create = async (request: ApiBodyRequest<IAccount>, response: Response) => {
    const newUser = await this.userService.create(request.body);
    response.status(200).json(newUser);
  }

  public get = async (request: ApiQueryRequest<AccountGet>, response: Response) => {
    const getParams: AccountGet = {
      _id: request.query._id
    };

    if(request.body.email) {
      getParams.email = request.body.email
    }

    const user = await this.userService.get(getParams);
    response.status(200).json(user);
  }

  public update = async (request: ApiBodyRequest<UpdateUserAPI>, response: Response) => {
    const updateParams: UpdateAccount = {
      filter: {
        _id: request.body._id
      },
      update: {
        email: request.body.email,
        lastName: request.body.lastName,
        name: request.body.name,
        phone: request.body.phone
      }
    };

    const updatedUser = await this.userService.update(updateParams);
    response.status(200).json(updatedUser);
  }

  public delete = async (request: ApiQueryRequest<DeleteAccount>, response: Response) => {
    const deletedUser = await this.userService.delete(request.query);
    response.status(200).json(deletedUser);
  }
}
