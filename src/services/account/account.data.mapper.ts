import { IAccount, AccountDTO } from './account.types';

export default class AccountMap {
  public static toDTO(account: IAccount): AccountDTO {
    return {
      id: account.id,

      lastName: account.lastName,
      name: account.name,

      email: account.email,
      phone: account.phone
    };
  }

  public static toDTOArray(_accounts: IAccount[]): AccountDTO[] {
    throw Error();
  }
}