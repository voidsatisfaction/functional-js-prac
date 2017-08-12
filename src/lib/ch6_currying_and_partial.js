export const curry = (fn) => {
  if (typeof fn !== 'function') {
    throw Error('No function provided');
  }

  return function curriedFunction(...args) {
    if (fn.length > args.length) {
      return function() {
        return curriedFunction.apply(null, (args.concat( [].slice.call(arguments) )));
      };
    }
    return fn(...args);
  };
};

export const partial = (fn, ...partialArgs) => {
  const args = partialArgs;
  return function(...fullArguments) {
    let arg = 0;
    for (var i = 0; i < args.length && arg < fullArguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = fullArguments[arg++];
      }
    }
    return fn.apply(null, args);
  };
};
