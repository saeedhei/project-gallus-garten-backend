import http from 'http';
import app from '../src/app';
import debugLib from 'debug';
import { AddressInfo } from 'net';

const debug = debugLib('server');
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
  console.log(`Listening on http://localhost:${port}/`);
  debug(`Listening on ${bind}`);
}
