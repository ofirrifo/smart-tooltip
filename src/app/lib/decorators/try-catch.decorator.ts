/**
 * try catch decorator
 * @param errors list of error message in order to log error
 */
export function tryCatch() {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      try {
        return originalMethod.apply(this, args);
      } catch (e) {
        console.error(`${target.name} ${propertyKey} failed`, e);
      }
    };
    return descriptor;
  };
}
