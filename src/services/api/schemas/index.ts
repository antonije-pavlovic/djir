import { FastifyInstance } from 'fastify';
import accountScheam from './account.schemas';
import errorSchems from './error.schems';

const allSchemas = [
  errorSchems,
  accountScheam
];

export default function registerSchemas(fastify: FastifyInstance) {
  for(let i = 0; i < allSchemas.length; i++) {
    for(let j = 0; j < allSchemas[i].length; j++) {
      fastify.addSchema(allSchemas[i][j]);
    }
  }
}

