export interface IUser {
    id: number;

    username: string;

    password: string;
    email: string;

    permissions: IPermission[];
}

export interface IPermission {
    permissionId: number;
    entitityId: number;
    permissionName: string;
}

export type UserCreate = Omit<IUser, 'id' | 'permissions'>;

export type UserUpdate = Partial<IUser>;

export type UserDTO  = Omit<IUser, 'password'>;

export interface IUserFind {
    id?: number;
    email?: string
}