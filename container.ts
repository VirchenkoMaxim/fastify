import { createContainer, Lifetime, asClass, InjectionMode } from 'awilix';

const container = createContainer();

container.loadModules(['src/**/*.controller.ts', 'src/**/*.service.ts'], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asClass,
    injectionMode: InjectionMode.CLASSIC,
  },
});

export default container;
