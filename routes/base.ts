import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { join } from 'path';
import { renderRoutes } from '../core/auto-route-module';

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(renderRoutes, { path: join(__dirname, '../src/*/*.controller.ts'), prefix: '/api/v1' });
});
