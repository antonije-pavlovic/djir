import { Router } from 'express';
import AccountEndpoint from '../../account/account.endpoint';
import catchErrors from '../../../errors/catch.error';
import { validateUser } from '../../account/account.validate';

class AccountRoute {
  public router: Router;
  private accountEndpoint: AccountEndpoint;

  constructor() {
    this.router = Router();
    this.accountEndpoint = new AccountEndpoint();
  }

  public registerRoutes() {

    this.router.get('/',
      catchErrors(this.accountEndpoint.get)
    );

    this.router.post('/',
      validateUser,
      catchErrors(this.accountEndpoint.create)
    );

    this.router.put('/',
      catchErrors(this.accountEndpoint.update)
    );

    this.router.delete('/',
      catchErrors(this.accountEndpoint.delete)
    );

    return this.router;
  }
}

const userRoute = new AccountRoute();

export default userRoute;
