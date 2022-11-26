import server from './services/api/api.service';
import config from './config/config';


// Run the server!
server.listen({ port: config.app.port }, function (err, address) {
  if (err) {
    console.log(err)
    process.exit(1)
  }
  console.log(` Server is now listening on ${ address }`)
})

// const closeApp = (server: any) => {
//   try {
//     server.close();
//   } catch (err) {
//     // log error
//   } finally{
//     process.exit(0);
//   }
// };


// process.on('SIGINT', () => {
//   closeApp(server);
// });
// process.on('SIGTERM', () => {
//   closeApp(server);
// });
