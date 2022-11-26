import AccountRepository from './account.repository';
import { AccountUpdate, IAccountDB } from './account.types';

export default class AccountService {

  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  public create = async (account: IAccountDB) => {
    return await this.accountRepository.create(account);
  }

  public get_by_id = async (id: number) => {
    return await this.accountRepository.get_by_id(id);
  }

  public delete_by_id = async (id: number) => {
    return await this.accountRepository.delete_by_id(id);
  }

  public update_by_id = async (id: number, account: AccountUpdate) => {
    return await this.accountRepository.update_by_id(id, account);
  }
}