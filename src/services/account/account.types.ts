export interface IAccountDB {
    name: string;
    last_name: string;

    password: string;
    email: string;

    phone: string;
}

export interface IAccount extends IAccountDB {
    id: number
}

export type AccountUpdate = Partial<IAccountDB>;

export type AccountDTO  = Omit<IAccount, 'password'>;