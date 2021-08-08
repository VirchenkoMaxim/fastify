import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { forEach } from 'lodash';
import * as importDir from 'directory-import';
import container from './container';
import './src/admin/dto/create-admin.dto';

const routes = (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: Function,
) => {
  const importedModules = importDir({
    directoryPath: './src/',
    importMethod: 'sync',
    /** exclude all that not has "controller.ts" end */
    exclude: /^((?!.*controller.ts).)*$/,
  });

  forEach(importedModules, (value, key) => {
    const controllerName = composeControllerName(value.default.name);
    const controllerInstance = container.resolve(controllerName);
    const mainPath = Reflect.getMetadata('route:path', value.default);

    const propertyNames = Object.getOwnPropertyNames(
      Object.getPrototypeOf(controllerInstance),
    ).filter((item) => item !== 'constructor');

    forEach(propertyNames, (propertyName) => {
      const path = Reflect.getMetadata(
        'route:path',
        controllerInstance,
        propertyName,
      );
      if (!path) return;

      const schema = Reflect.getMetadata(
        'route:schema',
        controllerInstance,
        propertyName,
      );
      const method = Reflect.getMetadata(
        'route:method',
        controllerInstance,
        propertyName,
      );

      const url = composeUrl(mainPath, path);

      fastify.route({
        method,
        url,
        ...(schema && { schema }),
        handler: controllerInstance[propertyName],
      });
    });
  });

  done();
};

const composeControllerName = (name: string): string => {
  return name[0].toLowerCase() + name.slice(1);
};

const composeUrl = (...args: string[]): string => {
  return args.filter((i) => i != '/').join('');
};

export default routes;
