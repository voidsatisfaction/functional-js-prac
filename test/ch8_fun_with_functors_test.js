import { expect } from 'chai';

import { Container, MayBe } from '../src/lib/ch8_fun_with_functors';

describe('Functor Is a Container', () => {
  describe('Container()', () => {
    it('value test', () => {
      const testValue = Container.of(3);
      const testObj = Container.of({ a: 1 });
      const testArray = Container.of([1,2]);

      expect(testValue.value).to.equal(3);
      expect(testObj.value).to.eql({ a: 1 });
      expect(testArray.value).to.eql([1,2]);
    });
  });
  describe('Container map()', () => {
    it('map test', () => {
      const double = (n) => n + n;
      const got1 = Container.of(3).map(double).value;
      const got2 = Container.of(3).map(double).map(double).map(double).value;
      const want1 = 6;
      const want2 = 24;
      expect(got1).to.equal(want1);
      expect(got2).to.equal(want2);
    });
  });
});

describe('MayBe Functor', () => {
  describe('MayBe()', () => {
    it('MayBe test', () => {
      const got = MayBe.of('string').map((x) => x.toUpperCase());
      const want = MayBe.of('STRING');
      expect(got).to.eql(want);
    });
    it('MayBe no value null', () => {
      const got = MayBe.of(null).map((x) => x.toUpperCase());
      const want = MayBe.of(null);
      expect(got).to.eql(want);
    });
    it('MayBe chaining success', () => {
      const got = MayBe.of('George')
        .map((x) => x.toUpperCase())
        .map((x) => 'Mr. ' + x);
      const want = MayBe.of('Mr. GEORGE');
      expect(got).to.eql(want);
    });
    it('MayBe chaining undefined error handling success', () => {
      const got = MayBe.of('George')
        .map(() => undefined)
        .map((x) => 'Mr. ' + x);
      const want = MayBe.of(null);
      expect(got).to.eql(want);
    });
  });
});
