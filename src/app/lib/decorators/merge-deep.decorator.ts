import { TooltipUtils } from '../utils/tooltip.utils';

export function mergeDeep() {
  const cachedValueKey = Symbol();
  return (target: any, key: PropertyKey) => {
    Object.defineProperty(target, key, {
      set(value: any) {
        if (this[cachedValueKey]) {
          this[cachedValueKey] = TooltipUtils.mergeDeep(this[cachedValueKey], value);
        } else {
          this[cachedValueKey] = value;
        }
      },
      get(): any {
        return this[cachedValueKey];
      },
    });
  };
}
