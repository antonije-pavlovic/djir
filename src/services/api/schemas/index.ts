import { FastifyInstance } from 'fastify';
import account_schemas from './account.schemas';

const allSchemas = [
  account_schemas
];

export default function registerSchemas(fastify: FastifyInstance) {
  for(let i = 0; i < allSchemas.length; i++) {
    for(let j = 0; j < allSchemas[i].length; j++) {
      fastify.addSchema(allSchemas[i][j]);
    }
  }
}

