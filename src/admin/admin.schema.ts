import { FastifySchema } from 'fastify';

export const createOne: FastifySchema = ({ body, response }) => {
  return {
    body,
    response: {
      201: {
        id: { type: 'string' }
      }
    }
  };
};

export const getOne: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  }
  // response: {
  //   200: {
  //     id: { type: 'string' },
  //     name: { type: 'string' },
  //   },
  // },
};
