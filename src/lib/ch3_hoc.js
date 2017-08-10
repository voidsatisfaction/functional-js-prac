// Practice
export const forEach = (array, fn) => {
  for (var i = 0; i < array.length; i++) {
    fn(array[i]);
  }
};

export const forEachObject = (obj, fn) => {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      fn(property, obj[property]);
    }
  }
};

export const unless = (predicate, fn) => {
  if (!predicate) {
    fn();
  }
};

export const times = (times, fn) => {
  for (var i = 0; i < times; i++) {
    fn(i);
  }
};

// Realworld
export const every = (array, fn) => {
  let result = true;
  for (const value of array) {
    result = result && fn(value);
  }
  return result;
};

export const some = (array, fn) => {
  let result = false;
  for (const value of array) {
    result = result || fn(value);
  }
  return result;
};

export const sortBy = (property) => {
  return (a, b) => {
    return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
  };
};
