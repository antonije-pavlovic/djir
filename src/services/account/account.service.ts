import AccountRepository from './account.repository';
import { AccountCreate, AccountUpdate } from './account.types';

export default class AccountService {

  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public create = async (account: AccountCreate) => {
    return await this.accountRepository.create(account);
  }

  public getById = async (id: number) => {
    return await this.accountRepository.getById(id);
  }

  public deleteById = async (id: number) => {
    return await this.accountRepository.deleteById(id);
  }

  public updateById = async (id: number, account: AccountUpdate) => {
    return await this.accountRepository.updateById(id, account);
  }
}