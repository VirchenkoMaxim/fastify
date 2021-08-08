import 'reflect-metadata';
import fastify, { FastifyInstance, FastifySchemaCompiler } from 'fastify';
import * as Joi from '@hapi/joi';
import routes from './router';
import swagger, { options } from './swagger';

class Server {
  private readonly port: number = 3000;

  private readonly server: FastifyInstance;

  constructor(server: Function) {
    this.server = server({ logger: false });
  }

  start() {
    this.server.register(swagger, options);
    this.server.register(routes, { prefix: '/api/v1' });
    this.server.listen(this.port).catch(console.error);
  }
}

const server = new Server(fastify);
server.start();
