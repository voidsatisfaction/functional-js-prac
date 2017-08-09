const forEach = (array, fn) => {
  for (var i = 0; i < array.length; i++) {
    fn(array[i]);
  }
};

export default forEach
