import * as _ from 'lodash';

export class ObjectUtils {

  public static deepClone(fromObject: any): any {
    return _.cloneDeep(fromObject);
  }

  public static shallowClone(fromObject: any): any {
    return _.clone(fromObject);
  }

  public static deepCloneMap(map: Map<any, any>): Map<any, any> {
    const newMap = new Map();
    for (const key of Array.from(map.keys())) {
      newMap.set(key, ObjectUtils.deepClone(map.get(key)));
    }

    return newMap;
  }

  public static isShallowEquivalent(a: Object, b: Object) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    return true;
  }

  public static getValueByAttrName(obj: any, attrName: string): any {
    const indexOfAttr = Object.keys(obj).indexOf(attrName);
    return Object.values(obj)[indexOfAttr];
  }
}
