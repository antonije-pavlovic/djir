import UserModel from './account.db';
import AccountRepository from './account.repository';
import { DeleteAccount, IAccount, UpdateAccount, AccountGet } from './account.types';

export default class AccountService {

  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository(UserModel);
  }

  public create = async (user: IAccount): Promise<IAccount> => {
    return await this.accountRepository.create(user);
  }

  public async get(filter: AccountGet): Promise<IAccount>{
    return await this.accountRepository.get(filter);
  }

  public async update(params: UpdateAccount): Promise<IAccount> {
    return await this.accountRepository.update(params);
  }

  public async delete(filter: DeleteAccount): Promise<IAccount> {
    return await this.accountRepository.delete(filter);
  }
}