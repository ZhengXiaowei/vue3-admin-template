const utilString = Object.prototype.toString;

export const isDate = (date: any): date is Date => {
  return utilString.call(date) === "[object Date]";
};

export const isObject = (value: any): value is object => {
  return utilString.call(value) === "[object Object]";
};

export const isArray = (array: any[]): array is Array<any> => {
  return utilString.call(array) === "[object Array]";
};
