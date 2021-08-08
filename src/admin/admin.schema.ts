import * as Joi from '@hapi/joi';
import { FastifySchema } from 'fastify';

export const createOne: FastifySchema = {
  response: {
    201: {
      id: { type: 'string' },
    },
  },
};

export const getOne: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' },
    },
  },
  // response: {
  //   200: {
  //     id: { type: 'string' },
  //     name: { type: 'string' },
  //   },
  // },
};
