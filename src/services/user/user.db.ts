import { getModelForClass, index, prop } from '@typegoose/typegoose';
import { IUserDB } from './user.types';

@index({ age: 1 })
export class User implements IUserDB {

  @prop()
  public  lastName: string;

  @prop()
  public name: string;

  @prop()
  public  email: string;

  @prop()
  public phone: string;
}

const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true
  }
});


export default UserModel;

