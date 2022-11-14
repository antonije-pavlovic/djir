import { ObjectId } from 'mongoose';
import {  DeleteParams, UpdateParams, GetParams } from '../../repository/repository.models';
import { IdAPI } from '../api/api.types';

export interface IAccountDB {
    name: string;
    lastName: string;

    email: string
    phone: string;
}

export interface IAccount extends IAccountDB {
    _id: ObjectId
}

export type AccountGet = GetParams<Omit<IAccount, 'phone' | 'lastName' | 'name'>>;
export type UpdateAccount = UpdateParams<AccountGet, Partial<IAccountDB>>;
export type DeleteAccount = DeleteParams<AccountGet>;

export type UpdateUserAPI = Partial<IAccountDB> & IdAPI;