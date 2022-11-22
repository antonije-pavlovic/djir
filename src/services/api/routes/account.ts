import { Router } from 'express';
import AccountEndpoint from '../../account/account.endpoint';
import catchErrors from '../../../errors/catch.error';
import { validateAccount } from '../../account/account.validate';

class AccountRoute {
  public router: Router;
  private accountEndpoint: AccountEndpoint;

  constructor() {
    this.router = Router();
    this.accountEndpoint = new AccountEndpoint();
  }

  public registerRoutes() {

    this.router.post('/',
      validateAccount,
      catchErrors(this.accountEndpoint.create)
    );

    return this.router;
  }
}

const accountRoute = new AccountRoute();

export default accountRoute;
