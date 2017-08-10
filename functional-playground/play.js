import { forEach } from '../lib/ch3_hoc';

const array = [1,2,3, ...[4,5,6]];
forEach(array, (data) => {
  console.log(data);
});
