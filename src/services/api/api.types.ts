import { FastifyContext, FastifyRequest } from 'fastify'
import { IUser } from '../user/user.types'


export interface ApiBodyRequest<T> extends FastifyRequest {
    body: T
    ctx: IRequestContext
}

export interface ApiQueryRequest<T> extends FastifyRequest {
    query: T
    ctx: FastifyContext & IRequestContext
}

export interface ApiParamsRequest<T> extends FastifyRequest {
    params: T
    ctx: FastifyContext & IRequestContext
}


export interface ApiRequest<U, T> extends FastifyRequest {
    body: U,
    params: T
    ctx: FastifyContext & IRequestContext
}


export interface IdAPI {
  id: number;
}

export interface IRequestContext {
    currentUser: Omit<IUser, 'password' | 'username'>;
}
