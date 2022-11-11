import { Response } from 'express';
import { ApiBodyRequest, ApiQueryRequest } from '../api/api.types';
import UserService from './user.service';
import { UserGet, IUser, UpdateUser, DeleteUser, UpdateUserAPI } from './user.types';

export default class UserEndpoint {

  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public create = async (request: ApiBodyRequest<IUser>, response: Response) => {
    const newUser = await this.userService.create(request.body);
    response.status(200).json(newUser);
  }

  public get = async (request: ApiQueryRequest<UserGet>, response: Response) => {
    const getParams: UserGet = {
      _id: request.query._id
    };

    if(request.body.email) {
      getParams.email = request.body.email
    }

    const user = await this.userService.get(getParams);
    response.status(200).json(user);
  }

  public update = async (request: ApiBodyRequest<UpdateUserAPI>, response: Response) => {
    const updateParams: UpdateUser = {
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

  public delete = async (request: ApiQueryRequest<DeleteUser>, response: Response) => {
    const deletedUser = await this.userService.delete(request.query);
    response.status(200).json(deletedUser);
  }
}
