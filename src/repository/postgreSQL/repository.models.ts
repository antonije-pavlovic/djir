export interface CreateQuery {
    text: string;
    values: Array<any>;
}

export enum TRANSACTION {
    BEGIN = 'BEGIN',
    COMMIT = 'COMMIT',
    ROLLBACK = 'ROLLBACK'
}