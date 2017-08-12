import { expect } from 'chai';

import * as lib from '../src/lib/ch7_composition_pipelines';
import { partial } from '../src/lib/ch6_currying_and_partial';
import { arrayUtils } from '../src/lib/ch5_functional_arrays';

import { apressBooks } from './apress_fixture';

describe('Functional Composition', () => {
  describe('compose()', () => {
    it('Two arguments compose success', () => {
      const number = lib.compose(Math.round, parseFloat);
      const got = number('3.56');
      const want = 4;
      expect(got).to.equal(want);

      const splitIntoSpaces = (string) => string.split(' ');
      const count = (array) => array.length;
      const oddOrEven = (num) => (num % 2 === 0 ? 'even' : 'odd');
      const countWords = lib.compose(oddOrEven, count, splitIntoSpaces);
      const got2 = countWords('hello world my name');
      const want2 = 'even';
      expect(got2).to.equal(want2);
    });

    it('Two arguments Apress Book example', () => {
      // const filterOutStandingBooks = (book) => book.rating[0] === 5;
      const filterGoodBooks = (book) => book.rating[0] > 4.5;
      // const filterBadBooks = (book) => book.rating[0] < 3.5;

      const projectTitleAndAuthor = (book) => ({ title: book.title, author: book.author });
      // const projectTitle = (book) => ({ title: book.title });
      // const projectAuthor = (book) => ({ author: book.author });

      const queryGoodBooks = partial(arrayUtils.filter, undefined, filterGoodBooks);
      const mapTitleAndAuthor = partial(arrayUtils.map, undefined, projectTitleAndAuthor);

      const titleAndAuthorForGoodBooks = lib.compose(mapTitleAndAuthor, queryGoodBooks);

      const got = titleAndAuthorForGoodBooks(apressBooks);
      const want = [{ title: 'C# 6.0', author: 'ANDREW TROELSEN' }];
      expect(got).to.eql(want);
    });
  });
});

describe('Pipelines / Sequences', () => {
  const splitIntoSpaces = (string) => string.split(' ');
  const count = (array) => array.length;
  const oddOrEven = (num) => (num % 2 === 0 ? 'even' : 'odd');

  describe('pipe()', () => {
    it('pipe success', () => {
      const countWords = lib.pipe(splitIntoSpaces, count, oddOrEven);
      const got2 = countWords('hello world my name');
      const want2 = 'even';
      expect(got2).to.equal(want2);
    });
  });
  describe('Odds on Composition', () => {
    it('Composition is associative', () => {
      const countWords1 = lib.compose(lib.compose(oddOrEven, count), splitIntoSpaces);
      const countWords2 = lib.compose(oddOrEven, lib.compose(count, splitIntoSpaces));
      const got1 = countWords1('hello world my name');
      const got2 = countWords2('hello world my name');
      expect(got1).to.equal('even');
      expect(got2).to.equal('even');
    });
  });
});
