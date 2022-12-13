import { FastifyInstance } from 'fastify';
import userSchemas from './user.schemas';
import errorSchems from './error.schems';

const allSchemas = [
  errorSchems,
  userSchemas
];

export default function registerSchemas(fastify: FastifyInstance) {
  for(let i = 0; i < allSchemas.length; i++) {
    for(let j = 0; j < allSchemas[i].length; j++) {
      fastify.addSchema(allSchemas[i][j]);
    }
  }
}

