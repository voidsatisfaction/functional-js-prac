import { expect } from 'chai';

import { arrayUtils } from '../src/lib/ch5_functional_arrays';

describe('Working functionnal on arrays', () => {
  describe('map()', () => {
    it('map success', () => {
      const array = [1,2,3];
      const got = arrayUtils.map(array, (n) => n*n);
      const want = [1,4,9];
      expect(got).to.eql(want);
    });
  });
  describe('filter()', () => {
    it('filter success', () => {
      const array = [1,2,3,4,5,6,7,8,9];
      const got = arrayUtils.filter(array, (n) => n % 3 === 0);
      const want = [3,6,9];
      expect(got).to.eql(want);
    });
  });
});

const apressBooks = [{
  name: 'beginners',
  bookDetails: [
    {
      id: 111,
      title: 'C# 6.0',
      author: 'ANDREW TROELSEN',
      rating: [4.7],
      reviews: [{ good: 4, excellent: 12 }]
    },
    {
      id: 222,
      title: 'Efficient Learning Machines',
      author: 'Rahul khanna',
      rating: [4.5],
      reviews: []
    }
  ]
}, {
  name: 'pro',
  bookDetails: [
    {
      id: 333,
      title: 'Pro AngularJS',
      author: 'Adam Freeman',
      rating: [4.0],
      reviews: []
    },
    {
      id: 444,
      title: 'Pro ASP.NET',
      author: 'Adam Freeman',
      rating: [4.2],
      reviews: [{ good: 14, excellent: 12 }]
    }
  ]
}];

describe('Chaining operations', () => {
  describe('concatAll()', () => {
    it('concatAll success', () => {
      const array = [[1,2,3],[4,5,6,7,8],[9,10,11]];
      const got = arrayUtils.concatAll(array);
      const want = [1,2,3,4,5,6,7,8,9,10,11];
      expect(got).to.eql(want);
    });
    it('get all book details which have ratings more than 4.5', () => {
      const got = arrayUtils.filter(arrayUtils.concatAll(
        arrayUtils.map(apressBooks, (book) => book.bookDetails)
      ), (book) => book.rating[0] > 4.5)[0];
      expect(got).to.eql(apressBooks[0].bookDetails[0]);
    });
  });
});

describe('Reducing Funciton', () => {
  describe('reduce()', () => {
    it('reduce success', () => {
      const array = [1,2,3,4];
      const got = arrayUtils.reduce(array, (a, b) => a+b);
      const want = 10;
      expect(got).to.equal(want);
    });

    it('reduce multiple success', () => {
      const array = [1,2,3,4];
      const got = arrayUtils.reduce(array, (a, b) => a*b);
      const want = 24;
      expect(got).to.equal(want);
    });

    it('get all all good and excellent reviews', () => {
      const allBooks = arrayUtils.concatAll(arrayUtils.map(apressBooks, (book) => book.bookDetails));
      const got = arrayUtils.reduce(allBooks, (acc, b) => {
        acc.good += (b.reviews[0] ? b.reviews[0].good : 0);
        acc.excellent += (b.reviews[0] ? b.reviews[0].excellent : 0);
        return acc;
      }, { good: 0, excellent: 0 });
      const want = { good: 18, excellent: 24 };
      expect(got).to.eql(want);
    });
  });
});
