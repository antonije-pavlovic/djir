import AccountRepository from './account.repository';
import { IAccountDB } from './account.types';

export default class AccountService {

  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public create = async (account: IAccountDB) => {
    return await this.accountRepository.create(account);
  }
}