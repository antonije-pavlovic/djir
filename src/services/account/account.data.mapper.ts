import { IAccount, AccountDTO } from './account.types';

export default class AccountMap {
  public static to_DTO(account: IAccount): AccountDTO {
    return {
      id: account.id,

      last_name: account.last_name,
      name: account.name,

      email: account.email,
      phone: account.phone
    };
  }

  public static to_DTO_Array(_accounts: IAccount[]): AccountDTO[] {
    throw Error();
  }
}