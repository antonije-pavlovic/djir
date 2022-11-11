import { Router } from 'express';
import UserEndpoint from '../../user/user.endpoint';
import catchErrors from '../../../errors/catch.error';
import { validateUser } from '../../user/user.validate';

class UserRoute {
  public router: Router;
  private userEndpoint: UserEndpoint;

  constructor() {
    this.router = Router();
    this.userEndpoint = new UserEndpoint();
  }

  public registerRoutes() {

    this.router.get('/',
      catchErrors(this.userEndpoint.get)
    );

    this.router.post('/',
      validateUser,
      catchErrors(this.userEndpoint.create)
    );

    this.router.put('/',
      catchErrors(this.userEndpoint.update)
    );

    this.router.delete('/',
      catchErrors(this.userEndpoint.delete)
    );

    return this.router;
  }
}

const userRoute = new UserRoute();

export default userRoute;
