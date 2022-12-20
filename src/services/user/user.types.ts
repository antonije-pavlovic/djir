export interface IUser {
    id: number;

    username: string;

    password: string;
    email: string;

    permissions: string[];
}

export type UserCreate = Omit<IUser, 'id' | 'permissions'>;

export type UserUpdate = Partial<UserCreate>;

export type UserDTO  = Omit<IUser, 'password'> & { permissions: string []};