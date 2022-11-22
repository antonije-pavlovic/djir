import BaseRepository from '../../repository/base.repository';
import { IAccountDB } from './account.types';

export default class AccountRepository extends BaseRepository {
  protected table = 'accounts';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public create = async (account: IAccountDB): Promise<any>  => {
    return await this._create(account);
  }

}