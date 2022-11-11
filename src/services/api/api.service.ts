import express, { Express } from 'express';
import formatError from '../../errors/format.errorr';
import routes from './routes';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import docs from '../../docs';

// express setup
const app: Express = express();

// external libs
app.use(bodyParser.json());
app.use(cors());

// applications routes
app.use(routes);

// global error handler
app.use(formatError);

// swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

export default app;
