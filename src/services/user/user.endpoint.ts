import { FastifyReply } from 'fastify'
import UserService from './user.service';
import { ApiRequest, IdAPI, ApiParamsRequest } from '../api/api.types';
import { UserUpdate } from './user.types';
import UserMap from './user.data.mapper';

export default class UserEndpoint {

  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  public getById = async (request: ApiParamsRequest<IdAPI>, reply: FastifyReply) => {
    const newUser = await this.userService.getById(request.params.id);
    const userDto = UserMap.toDTO(newUser);

    reply.code(200).send(userDto);
  }

  public deleteById = async (request: ApiParamsRequest<IdAPI>, reply: FastifyReply) => {
    const result = await this.userService.deleteById(request.params.id);
    if(result) {
      reply.code(200).send({ success: result });
    }
  }

  public updateById = async (request: ApiRequest<UserUpdate, IdAPI>, reply: FastifyReply) => {
    const result = await this.userService.updateById(request.params.id, request.body);
    if(result) {
      reply.code(200).send({ success: result });
    }
  }
}
