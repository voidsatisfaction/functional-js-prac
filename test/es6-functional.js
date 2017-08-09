import assert from 'assert';

import forEach from '../lib/es6-functional';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(2, [1,2,3, ...[4,5,6]].indexOf(3));
    });
  });

  describe('forEach()', () => {
    it('iterate each element and do some function', () => {
      var i = 1;
      forEach([1,2,3], (data) => {
        assert.strictEqual(i, data);
        i += 1;
      })
    })
  })
});
