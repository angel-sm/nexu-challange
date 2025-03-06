import Server from './server';
import { serverPort } from './config';

const server = new Server(serverPort);
server.start();