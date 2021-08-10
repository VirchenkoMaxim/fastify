export const composeControllerName = (name: string): string => name[0].toLowerCase() + name.slice(1);

export const composeUrl = (...args: string[]): string => args.filter((i) => i !== '/').join('');
