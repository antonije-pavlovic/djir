import { MongooseOptions } from 'mongoose';
import BaseRepository from '../../repository/base.repository';
import { DeleteUser, IUser, IUserDB, UpdateUser, UserGet } from './user.types';

export default class UserRepository extends BaseRepository {

  public create = async (doc: IUserDB, options?: MongooseOptions): Promise<IUser>  => {
    return await this._create(doc, options);
  }

  public get = async (filter: UserGet, options?: MongooseOptions): Promise<IUser> => {
    return await this._get(filter, options);
  }

  public update = async (params: UpdateUser, options?: MongooseOptions): Promise<IUser> => {
    return await this._update(params.filter, params.update, options);
  }

  public delete = async (filter: DeleteUser, options?: MongooseOptions): Promise<IUser> => {
    return await this._delete(filter, options);
  }
}