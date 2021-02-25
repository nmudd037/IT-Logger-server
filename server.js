const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

//Handling Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION !!: Shutting Down...');
  console.log(err.name, err.message);
  process.exit(1);
});

server.use(middlewares);
server.use(router);
//4) Start Server
const port = process.env.PORT || 3500;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

//Handling Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION !!: Shutting Down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
