import _map from "lodash/map";
import _upperFirst from "lodash/upperFirst";
import _words from "lodash/words";
import _capitalize from "lodash/capitalize";
import _omit from "lodash/omit";
import _some from "lodash/some";
import _isBoolean from "lodash/isBoolean";
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import _isObject from "lodash/isObject";
import _isPlainObject from "lodash/isPlainObject";
import _isFunction from "lodash/isFunction";
import { ComponentType } from "react";

export const isBlankOrNil = (value: any) => isNil(value) || value === "";

//Checks for Blank values in all types including blank array and object
export const isEmpty = (value: any) => {
  if (_isArray(value) || _isObject(value)) {
    return _isEmpty(value);
  }
  return isBlankOrNil(value);
};

export const isNil = (value: any) => value == null; // value === undefined || value === null

export const camelcaseToWords = (value?: string) =>
  _words(_upperFirst(value)).join(" ");
export const snakeCaseToWords = (value?: string) => {
  if (isBlankOrNil(value)) {
    return "";
  }

  if (typeof value !== "string") return value;

  return value.split("_").map(_capitalize).join(" "); // 🐍🐍🐍 ➡️️ 🔠🔡 🔠🔡
};

export const getBoolean = (value: any, defaultValue: boolean) =>
  _isBoolean(value) ? value : defaultValue;

export const arrayToHashMap = (
  arr?: string[],
  adapterFn?: (v: string) => any
) =>
  Object.assign(
    {},
    ..._map(arr, (key) => ({ [key]: adapterFn ? adapterFn(key) : true }))
  );

export const head = (list: any[] | undefined, returnValue: any = {}): any =>
  (list && list[0]) || returnValue;

export const objectSafeCheck = (obj: any | undefined): any => obj || {};

export const arraySafeCheck = (arr: any | undefined): any => arr || [];

export const callIfFunction = (attribute: TSAny, ...params: any[]) => {
  return _isFunction(attribute) ? attribute(...params) : attribute;
};

export function shallowEquals(obj1: any, obj2: any): boolean {
  const values1 = Object.values(obj1);
  const values2 = Object.values(obj2);

  if (values1.length !== values2.length) {
    return false;
  }

  for (let i = 0; i < values1.length; i++) {
    if (values1[i] !== values2[i]) {
      return false;
    }
  }

  return true;
}

export function extractNumberFromText(
  text: string,
  allowNegative?: boolean
): number | null {
  let numbers;
  if (allowNegative) {
    numbers = text.match(/-?\d+/g);
  } else {
    numbers = text.match(/\d+/g);
  }
  return numbers && numbers.length ? parseInt(numbers.join("")) : null;
}

// To convert from { id, label } to {name, value} or any other value. It can keeps other values too
export const switchObjectListKeys = (
  originalKeys: [string, string],
  newKeys: [string, string],
  collection: any[],
  keepOtherValues?: boolean
) =>
  _map(collection, (v) =>
    v && typeof v === "object" && v.constructor === Object
      ? {
          [newKeys[0]]: v[originalKeys[0]],
          [newKeys[1]]: v[originalKeys[1]],
          ...(keepOtherValues ? _omit(v, originalKeys) : {}),
        }
      : null
  ).filter(Boolean);

export const valueCount = (value?: any, deepValueCount?: boolean): number => {
  if (isBlankOrNil(value)) {
    return 0;
  }
  if (Array.isArray(value)) {
    return deepValueCount
      ? value.filter((d) => valueCount(d, deepValueCount)).length
      : value.length;
  }
  if (typeof value === "object") {
    return _some(value, (value: any) =>
      deepValueCount
        ? valueCount(value, deepValueCount)
        : Array.isArray(value)
        ? value.length
        : value
    )
      ? 1
      : 0;
  }
  return 1;
};

export const stripEmptyValues = (obj: any, deepStripEmptyValues?: boolean) => {
  const replacer = (key: string, value: any) => {
    if (!valueCount(value, deepStripEmptyValues)) return undefined;

    // For array remove deep values as they are replaced by null in JSON.stringify
    if (Array.isArray(value)) {
      const filteredArray = value.filter((d) =>
        valueCount(d, deepStripEmptyValues)
      );
      return filteredArray.length ? filteredArray : undefined;
    }

    return value;
  };

  if (isNil(obj)) return {};

  const stringifieldJSON = JSON.stringify(obj, replacer); // will return undefined if obj is empty ({})
  return stringifieldJSON === undefined ? {} : JSON.parse(stringifieldJSON);
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export function retryReq(
  fn: Function,
  retriesLeft = 5,
  interval = 1000
): Promise<{ default: ComponentType<any> }> {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error: Error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retryReq(fn, interval, retriesLeft - 1).then(resolve, reject);
        }, interval);
      });
  });
}

export const chooseRandomFromArray = (array: any[]) =>
  array[Math.floor(Math.random() * array.length)];

export const parseStringToJSON = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.error("Parsing failed", e);
  }
};

// copied from https://github.com/tannerlinsley/react-query/blob/master/src/core/utils.ts
export const stableValueHash = (value: any): string => {
  return JSON.stringify(value, (_, val) =>
    _isPlainObject(val)
      ? Object.keys(val)
          .sort()
          .reduce((result, key) => {
            result[key] = val[key];
            return result;
          }, {} as any)
      : val
  );
};
