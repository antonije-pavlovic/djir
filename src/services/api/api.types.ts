import { FastifyRequest } from 'fastify'


export interface ApiBodyRequest<T> extends FastifyRequest {
    body: T
}

export interface ApiQueryRequest<T> extends FastifyRequest {
    query: T
}

export interface ApiParamsRequest<T> extends FastifyRequest {
    params: T
}


export interface ApiRequest<U, T> extends FastifyRequest {
    body: U,
    params: T
}


export interface IdAPI {
  id: number;
}