import { MongooseOptions } from 'mongoose';
import BaseRepository from '../../repository/base.repository';
import { DeleteAccount, IAccount, IAccountDB, UpdateAccount, AccountGet } from './account.types';

export default class AccountRepository extends BaseRepository {

  public create = async (doc: IAccountDB, options?: MongooseOptions): Promise<IAccount>  => {
    return await this._create(doc, options);
  }

  public get = async (filter: AccountGet, options?: MongooseOptions): Promise<IAccount> => {
    return await this._get(filter, options);
  }

  public update = async (params: UpdateAccount, options?: MongooseOptions): Promise<IAccount> => {
    return await this._update(params.filter, params.update, options);
  }

  public delete = async (filter: DeleteAccount, options?: MongooseOptions): Promise<IAccount> => {
    return await this._delete(filter, options);
  }
}