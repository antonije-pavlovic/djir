import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { IAccountDB } from './account.types';

@index({ age: 1 })
export class Account implements IAccountDB {

  @prop()
  public  lastName: string;

  @prop()
  public name: string;

  @prop()
  public  email: string;

  @prop()
  public phone: string;
}

const UserModel = getModelForClass(Account, {
  schemaOptions: {
    timestamps: true,
  }
});


export default UserModel;

