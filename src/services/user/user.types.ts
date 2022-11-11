import { ObjectId } from 'mongoose';
import {  DeleteParams, UpdateParams, GetParams } from '../../repository/repository.models';
import { IdAPI } from '../api/api.types';

export interface IUserDB {
    name: string;
    lastName: string;

    email: string
    phone: string;
}

export interface IUser extends IUserDB {
    _id: ObjectId
}

export type UserGet = GetParams<Omit<IUser, 'phone' | 'lastName' | 'name'>>;
export type UpdateUser = UpdateParams<UserGet, Partial<IUserDB>>;
export type DeleteUser = DeleteParams<UserGet>;

export type UpdateUserAPI = Partial<IUserDB> & IdAPI;