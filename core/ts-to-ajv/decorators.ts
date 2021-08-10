export const validate = (data) => (target: Object, method: string) => {
  Reflect.defineMetadata('avj:validation', data, target, method);
};
