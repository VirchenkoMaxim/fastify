import AutoLoad from 'fastify-autoload';
import { join } from 'path';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export const app = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: Function) => {
  /** register plugins */
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  });

  /** register routes */
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  });

  done();
};
