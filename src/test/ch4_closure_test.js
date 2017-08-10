import { expect } from 'chai';

import * as lib from '../lib/ch4_closure';

describe('Remebering where it is born', () => {
  describe('fn()', () => {
    it('closure success', () => {
      const closure = lib.fn(5);
      expect(closure()).to.equal(5);
    });
  });
});

describe('HOC in the Real World - next', () => {
  describe('tap()', () => {
    it('tap success', () => {
      expect(lib.tap('hi')((it) => (it))).to.equal('hi');
    });
  });

  describe('unary()', () => {
    it('unary success', () => {
      const array = ['1', '2', '3'];
      const want = [1, 2, 3];
      expect(array.map(lib.unary(parseInt))).to.eql(want);
    });
  });

  describe('once()', () => {
    it('do it only once', () => {
      const doPayment = lib.once(() => 'Payment is done!');
      expect(doPayment()).to.equal('Payment is done!');
      expect(doPayment()).to.equal(undefined);
    });
  });

  describe('memoized()', () => {
    it('memoize fast factorial', () => {
      const fastFactorial = lib.memoized((n) => {
        if (n === 0) {
          return 1;
        }

        return n * fastFactorial(n-1);
      });

      expect(fastFactorial(3)).to.equal(6);
      expect(fastFactorial(5)).to.equal(120);
    });
  });

  describe('memoizedMultiple()', () => {
    it('memoize multiple success', () => {
      const fastPlus = lib.memoizedMultiple((...args) => {
        return args.reduce((a,b) => a+b);
      });

      expect(fastPlus(1,2,3,4)).to.equal(10);
      expect(fastPlus(9,9,8,1,9,9,9)).to.equal(54);
    });
  });
});
