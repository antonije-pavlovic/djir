export enum Role {
  PUBLIC_USER = 'publicUser'
}


export type TemplateRole = {
  [key in Role]: {
    id: number;
    permissions: Array<IPermision>
  }
}

export interface IPermision {
  name: string;
  id: number;
}
