export function* generatorSequence() {
  yield 'first';
  yield 'second';
  yield 'third';
}

export function* sayFullName() {
  var firstName = yield;
  var secondName = yield;
  yield firstName + secondName;
}

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

export function* main() {
  const dataOne = yield getDataOne();
  const dataTwo = yield getDataTwo();
  console.log(dataOne);
  console.log(dataTwo);
}

generator = main();
generator.next();
