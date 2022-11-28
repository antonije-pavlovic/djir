export interface IAccount {
    id: number;

    name: string;
    lastName: string;

    password: string;
    email: string;

    phone: string;
}

export type AccountCreate = Omit<IAccount, 'id'>;

export type AccountUpdate = Partial<IAccount>;

export type AccountDTO  = Omit<IAccount, 'password'>;