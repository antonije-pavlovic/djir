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

    this.router.get('/:id',
      catchErrors(this.accountEndpoint.get_by_id)
    );

    this.router.delete('/:id',
      catchErrors(this.accountEndpoint.delete_by_id)
    );

    this.router.put('/:id',
      catchErrors(this.accountEndpoint.update_by_id)
    );

    return this.router;
  }
}

const accountRoute = new AccountRoute();

export default accountRoute;
