import Express from 'express';
import { Send, Query, ParamsDictionary } from 'express-serve-static-core';


export interface ApiBodyRequest<T> extends Express.Request {
    body: T
}

export interface ApiQueryRequest<T> extends Express.Request {
    query: Query & T
}

export interface ApiRequest<U, T> extends Express.Request {
    body: U,
    params: ParamsDictionary & T
}


export interface TypedResponse<ResBody> extends Express.Response {
    json: Send<ResBody, this>;
}

export interface IdAPI {
  id: number;
}