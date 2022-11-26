import AccountEndpoint from '../../account/account.endpoint';
import { FastifyInstance } from 'fastify'

export default class AccountRoute {

  public static registerRoutes(fastify: FastifyInstance, _opts: any, done: any) {
    // console.log(fastify);
    const accountEndpoint = new AccountEndpoint();
    fastify.post('/account',
      accountEndpoint.create
    );

    fastify.get('/account/:id',
      accountEndpoint.get_by_id
    );

    fastify.delete('/account/:id',
      accountEndpoint.delete_by_id
    );

    fastify.put('/account/:id',
      accountEndpoint.update_by_id
    );

    done();
  }
}
