import server from './services/api/api.service';
import config from './config/config';


// Run the server!
server.listen({ port: config.app.port }, function (err, address) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(`Server is ready to ride on port: ${ address }`)
})

const closeApp = (server: any) => {
  try {
    server.close();
  } catch (err) {
    console.log(err)
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
