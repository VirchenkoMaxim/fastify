import fp from 'fastify-plugin';
import swagger, { SwaggerOptions } from 'fastify-swagger';
import { FastifyInstance } from 'fastify';

const options: SwaggerOptions = {
  routePrefix: '/api/v1/docs',
  openapi: {
    info: {
      title: 'Fastify API',
      description: 'Local server',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://localhost:3000/api/v1`,
        description: 'Local server'
      }
    ]
  },
  exposeRoute: true
};

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(swagger, options);
});
