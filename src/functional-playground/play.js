let generator;
const getDataOne = () => {
  setTimeout(() => {
    generator.next('dummy data one');
  }, 1 * 1000);
};

const getDataTwo = () => {
  setTimeout(() => {
    generator.next('dummy data two');
  }, 1 * 1000);
};

function* main() {
  const dataOne = yield getDataOne();
  console.log('1');
  const dataTwo = yield getDataTwo();
  console.log('2');
  console.log(dataOne);
  console.log(dataTwo);
}

generator = main();
generator.next();
