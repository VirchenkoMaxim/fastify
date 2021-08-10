import 'reflect-metadata';

// eslint-disable-next-line no-underscore-dangle
const _addMetadataToMethod = (routeMethod: string) => (path: string) => (target: Object, method: string) => {
  Reflect.defineMetadata('route:path', path, target, method);
  Reflect.defineMetadata('route:method', routeMethod, target, method);
};

export const Schema =
  <T>(schema: T) =>
  (target: Object, method: string) => {
    Reflect.defineMetadata('route:schema', schema, target, method);
  };

export const Controller =
  (path: string) =>
  (target: any): void => {
    Reflect.defineMetadata('route:path', path, target);
  };

export const Get = _addMetadataToMethod('GET');
export const Post = _addMetadataToMethod('POST');
export const Put = _addMetadataToMethod('PUT');
export const Patch = _addMetadataToMethod('PATCH');
export const Delete = _addMetadataToMethod('DELETE');
