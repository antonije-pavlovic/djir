import app from './services/api/api.service';
import { Server } from 'http';
import config from './config/config';

const server = app.listen(config.app.port);

const closeApp = (server: Server) => {
  try {
    server.close();
  } catch (err) {
    // log error
  } finally{
    process.exit(0);
  }
};


process.on('SIGINT', () => {
  closeApp(server);
});
process.on('SIGTERM', () => {
  closeApp(server);
});
