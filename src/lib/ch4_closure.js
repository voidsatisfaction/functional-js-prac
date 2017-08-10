export const fn = (arg) => {
  const inner = () => {
    return arg;
  };
  return inner;
};

export const tap = (value) => (fn) => (
  typeof(fn) === 'function' && fn(value),
  value
);

export const unary = (fn) => {
  return fn.length === 1 ? fn : (arg) => fn(arg);
};

export const once = (fn) => {
  let done = false;
  return (...args) => (
    done ? undefined : ((done = true), fn.apply(this, args))
  );
};

export const memoized = (fn) => {
  const lookupTable = {};

  return (arg) => (lookupTable[arg] || (lookupTable[arg] = fn(arg)));
};

export const memoizedMultiple = (fn) => {
  const lookupTable = {};

  return (...args) => {
    return (lookupTable[String(args)] || (lookupTable[String(args)] = fn(...args)));
  };
};
