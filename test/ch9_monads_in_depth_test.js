import { expect } from 'chai';

import { MayBe } from '../src/lib/ch9_monads_in_depth';

describe('Solving the Problem via join', () => {
  describe('join()', () => {
    it('join simple success1', () => {
      const joinExample = MayBe.of(MayBe.of(5));
      const got = joinExample.join();
      const want = MayBe.of(5);
      expect(got).to.eql(want);
    });

    it('join simple success2', () => {
      const got = MayBe.of(MayBe.of(5).map((value) => value + 4)).join().join();
      const want = 9;
      expect(got).to.equal(want);
    });
  });
});
