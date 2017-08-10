import { expect } from 'chai';

import * as lib from '../lib/ch3_hoc';

describe('Abstraction and Higher-Order Functions', () => {
  describe('forEach()', () => {
    it('iterate each element and do some function', () => {
      let i = 1;
      lib.forEach([1,2,3], (data) => {
        expect(data).to.equal(i);
        i += 1;
      });
    });
  });
  describe('forEachObj()', () => {
    it('iterate each property and value of object', () => {
      const obj = { a:1, b:2, c:undefined };
      lib.forEachObject(obj, (k, v) => {
        expect(v).to.equal(obj[k]);
      })
    });
  });
  describe('unless()', () => {
    it('execute only the predicate is not', () => {
      lib.forEach([1,2,3,4,5,6,7], (number) => {
        lib.unless((number % 2 == 0), () => {
          expect(false).to.equal(number % 2 == 0)
        });
      });
    });
  });
  describe('times()', () => {
    it('get all nums from 0 to i', () => {
      const i = 100;
      let j = 0;
      lib.times(i, (n) => {
        expect(n).to.equal(j);
        j+=1;
      });
    });
  });
});

describe('Higher-Order Functions in the Real World', () => {
  describe('every()', () => {
    it('all elements is correct', () => {
      const array = [NaN,NaN];
      expect(lib.every(array, isNaN)).to.equal(true);
    });
    it('an elelment is not correct', () => {
      const array = [NaN, NaN, NaN, 4];
      expect(lib.every(array, isNaN)).to.equal(false);
    });
  });
  describe('some()', () => {
    it('all elements is not correct', () => {
      const array = [1,2,3,4];
      expect(lib.some(array, isNaN)).to.equal(false);
    });
    it('some elements are correct', () => {
      const array = [1,2,NaN,3];
      expect(lib.some(array, isNaN)).to.equal(true);
    });
  });
  describe('sortBy()', () => {
    const people = [
      { fn: "aafn", ln: "ccln" },
      { fn: "ccfn", ln: "aaln" },
      { fn: "bbfn", ln: "bbln" }
    ];
    it('sorted well', () => {
      const expected = [
        { fn: "aafn", ln: "ccln" },
        { fn: "bbfn", ln: "bbln" },
        { fn: "ccfn", ln: "aaln" }
      ];
      expect(people.sort(lib.sortBy('fn'))).to.eql(expected);
    });
  });
});
