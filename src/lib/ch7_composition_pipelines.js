export const compose = (...fns) => (
  (value) => fns.reverse().reduce((acc, fn) => fn(acc), value)
);

// React Compose function
// export const compose = (...funcs) => {
//   if (funcs.length === 0) {
//     return arg => arg;
//   }
//
//   if (funcs.length === 1) {
//     return funcs[0];
//   }
//
//   return funcs.reduce((a, b) => (...args) => a(b(...args)));
// };

export const pipe = (...fns) => (
  (value) => (
    fns.reduce((acc, fn) => fn(acc), value)
  )
);
