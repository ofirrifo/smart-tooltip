import { tryCatch } from '../decorators/try-catch.decorator';

export class TooltipUtils {
  @tryCatch()
  static cloneDeep(value: any): any {
    return JSON.parse(JSON.stringify(value));
  }


  /**
   * Simple object check.
   * @param value any value we want to check if it object
   * @returns true if object
   */
  static isObject(value: any) {
    return (value && typeof value === 'object' && !Array.isArray(value));
  }

  /**
   * Deep merge two objects.
   */
  static mergeDeep(target, ...sources) {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (TooltipUtils.isObject(target) && TooltipUtils.isObject(source)) {
      for (const key in source) {
        if (TooltipUtils.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, {[key]: {}});
          }
          TooltipUtils.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {[key]: source[key]});
        }
      }
    }

    return TooltipUtils.mergeDeep(target, ...sources);
  }

  static isNil(value: any): boolean {
    return value === void 0 || value === null;
  }


}

