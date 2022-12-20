export enum Role {
  PUBLIC_USER = 'publicUser'
}


export type TemplateRoleMap = {
  [key in Role]: {
    id: number;
  }
}

export interface ITemplateRole {
  id: number;
  name: Role;
}

export interface IPermision {
  name: string;
  id: number;
}
