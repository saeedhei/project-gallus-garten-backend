import http from 'http';
import app from '../src/app';
import debugLib from 'debug';
import { AddressInfo } from 'net';

const NAMESPACE = 'seointro:server';
const COLOR_BLUE = '\x1b[34m';
const COLOR_RESET = '\x1b[0m';
const debug = debugLib(NAMESPACE);
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

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address() as AddressInfo;
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${COLOR_BLUE}http://localhost:${port}/${COLOR_RESET}`);
  debug(`Listening on ${bind}`);
}
