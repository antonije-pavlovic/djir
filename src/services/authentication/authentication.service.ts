import UserService from '../user/user.service';
import { IJWTPayload, ILoginCredentials, IRegister } from './authentication.types';
import jwt from 'jsonwebtoken';
import { comparePassword } from '../../libs/bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';
import UnauthorizedError from '../../errors/custom/unauthorized.error';
import { IRequestContext } from '../api/api.types';

export default class AuthenticationService {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // TODO: call email service to send confirmation email
  public register = async (params: IRegister): Promise<boolean> => {
    await this.userService.create(params);
    return true;
  }

  public login = async (credentials: ILoginCredentials) => {
    const user = await this.userService.find({ email: credentials.email });

    const isValid = comparePassword(credentials.password, user.password);
    if(!isValid) {
      return false;
    }

    const payload: IJWTPayload = {
      id: user.id,
    }

    const jwt = this.signJwt(payload);

    const loginData = {
      jwt,
      permissions: user.permissions
    }

    return loginData
  }

  public forgotPassword = () => {
    throw Error('Not implemented');
  }

  public resetPassword = () => {
    throw Error('Not implemented');
  }

  public refreshJwt = () => {
    throw Error('Not implemented');
  }

  public invalidateJwt = () => {
    throw Error('Not implemented');
  }

  private signJwt = (payload: IJWTPayload) => {
    return jwt.sign({
      payload
    }, 'secret', { expiresIn: '1h' });
  }

  private decodeJwt = (token: string) => {
    try {
      return jwt.verify(token, 'secret');
    } catch(error) {
      throw new UnauthorizedError();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public authorize = async (request: FastifyRequest, _reply: FastifyReply) => {

    if(!request.headers.authorization) {
      return false;
    }

    const token = request.headers.authorization.split('Bearer ')[1];
    const decodedToken = this.decodeJwt(token);
    const user = await this.userService.find({id: decodedToken.payload.id});

    const ctx: IRequestContext = {
      currentUser: {
        email: user.email,
        id: user.id,
        permissions: user.permissions,
      }
    };

    Object.assign(request, {
      ctx
    })

    return request;
  }
}