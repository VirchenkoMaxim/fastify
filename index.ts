import fastify, { FastifyInstance } from 'fastify';
import { app } from './app';

import './core/ts-to-ajv';

class Server {
  private readonly port: number = 3000;

  private readonly server: FastifyInstance;

  constructor(server: Function) {
    this.server = server({
      logger: false,
      ajv: {
        customOptions: {
          removeAdditional: false,
          useDefaults: true,
          coerceTypes: true,
          allErrors: true,
          strictTypes: true,
          nullable: true,
          strictRequired: true
        }
      }
    });
  }

  start() {
    this.server.register(app);
    this.server.listen(this.port).catch(console.error);
  }
}

const server = new Server(fastify);
server.start();
