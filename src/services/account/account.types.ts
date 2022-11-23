import {  DeleteParams, UpdateParams, GetParams } from '../../repository/repository.models';
import { IdAPI } from '../api/api.types';

export interface IAccountDB {
    name: string;
    last_name: string;

    email: string
    phone: string;
}

export interface IAccount extends IAccountDB {
    id: string
}

export type AccountGet = GetParams<Omit<IAccount, 'phone' | 'last_name' | 'name'>>;
export type UpdateAccount = UpdateParams<AccountGet, Partial<IAccountDB>>;
export type DeleteAccount = DeleteParams<AccountGet>;

export type UpdateUserAPI = Partial<IAccountDB> & IdAPI;