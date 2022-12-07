export interface IUser {
    id: number;

    username: string;

    password: string;
    email: string;
}

export type UserCreate = Omit<IUser, 'id'>;

export type UserUpdate = Partial<IUser>;

export type UserDTO  = Omit<IUser, 'password'>;