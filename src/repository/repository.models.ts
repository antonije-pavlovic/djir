import { ObjectId } from 'mongoose';

type RepositoryGenericMappedType<T> = {
    [Property in keyof T]: T[Property];
}

export type FindParams<T> = Partial<RepositoryGenericMappedType<T>>;

export type GetParams<T> = Partial<RepositoryGenericMappedType<T>> & { _id: ObjectId } ;

export type DeleteParams<T> = Partial<RepositoryGenericMappedType<T>>;

export type UpdateParams<T, K> = {
    filter: {
        [Property in keyof T]: T[Property];
    };
    update: {
        [Property in keyof K]: K[Property];
    }
}

