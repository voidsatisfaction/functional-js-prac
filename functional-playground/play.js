import forEach from '../lib/es6-functional';

const array = [1,2,3, ...[4,5,6]];
forEach(array, (data) => {
  console.log(data);
});
