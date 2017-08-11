const map = (array, fn) => {
  const result = [];
  for (const value of array) {
    result.push(fn(value));
  }
  return result;
};

const filter = (array, fn) => {
  const result = [];
  for (const value of array) {
    fn(value) ? result.push(value) : undefined;
  }
  return result;
};

const concatAll = (array) => {
  const result = [];
  for (const value of array) {
    result.push.apply(result, value);
  }
  return result;
};

const reduce = (array, fn, initVal) => {
  let accumlator;

  if (initVal === undefined) {
    accumlator = array[0];
    for (var i = 1; i < array.length; i++) {
      accumlator = fn(accumlator, array[i]);
    }
  } else {
    accumlator = initVal;
    for (const value of array) {
      accumlator = fn(accumlator, value);
    }
  }
  return accumlator;
};

export const arrayUtils = {
  map,
  filter,
  concatAll,
  reduce
};
