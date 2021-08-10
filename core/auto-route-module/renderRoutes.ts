import { forEach } from 'lodash';
import { glob } from 'glob';
import * as path from 'path';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import container from '../../container';
import { composeControllerName, composeUrl } from './helpers';

export const renderRoutes = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: Function) => {
  const data = glob.sync(opts.path);

  forEach(data, (filePath) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const controller = require(filePath);
    const controllerName = composeControllerName(controller.default.name);
    const controllerInstance = container.resolve(controllerName);
    const mainPath = Reflect.getMetadata('route:path', controller.default);
    if (!mainPath) return;
    const propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(controllerInstance)).filter((item) => item !== 'constructor');

    forEach(propertyNames, (propertyName) => {
      const routePath = Reflect.getMetadata('route:path', controllerInstance, propertyName);
      const schema = Reflect.getMetadata('route:schema', controllerInstance, propertyName);
      const method = Reflect.getMetadata('route:method', controllerInstance, propertyName);
      if (!path || !method) return;

      fastify.route({
        method,
        url: composeUrl(mainPath, routePath),
        ...(schema && { schema }),
        handler: controllerInstance[propertyName]
      });
    });
  });

  done();
};
