import { expect } from 'chai';

import * as lib from '../src/lib/ch6_currying_and_partial';

describe('Currying', () => {
  describe('curry()', () => {
    it('making autoCurriedAdd success', () => {
      const add = (x, y) => x + y;
      const autoCurriedAdd = lib.curry(add);
      expect(autoCurriedAdd(4)(5)).to.equal(9);
      expect(autoCurriedAdd(0)(0)).to.equal(0);
    });

    it('making multiple arguments function currying success', () => {
      const multiply = (x, y, z, w) => x * y * z * w;
      const autoCurriedMultiply = lib.curry(multiply);
      expect(autoCurriedMultiply(1)(2)(3)(4)).to.equal(24);
      expect(autoCurriedMultiply(1,2)(3,4,5)).to.equal(24);
    });

    it('not function error', () => {
      expect(lib.curry).to.throw('No function provided');
    });

    it('logger function currying implement', () => {
      const loggerHelper = (mode, initialMessage, errorMessage, lineNo) => {
        switch (mode) {
        case 'DEBUG':
          return (initialMessage + errorMessage + ' at line: ' + lineNo);
        case 'ERROR':
          return (initialMessage + errorMessage + ' at line: ' + lineNo);
        case 'WARN':
          return (initialMessage + errorMessage + ' at line: ' + lineNo);
        default:
          throw Error('Wrong Mode');
        }
      };
      const errorLogger = lib.curry(loggerHelper)('ERROR')('Error At Stats.js ');
      const debugLogger = lib.curry(loggerHelper)('DEBUG')('Debug At Stats.js ');
      const warnLogger = lib.curry(loggerHelper)('WARN')('Warn At Stats.js ');
      expect(errorLogger('Error message', 21)).to.equal('Error At Stats.js Error message at line: 21');
      expect(debugLogger('Debug message', 223)).to.equal('Debug At Stats.js Debug message at line: 223');
      expect(warnLogger('Warn message', 45)).to.equal('Warn At Stats.js Warn message at line: 45');
    });
  });
});

describe('Partial', () => {
  describe('partial()', () => {
    it('partial success', (done) => {
      const delay = 10;
      const delayTenMs = lib.partial(setTimeout, undefined, delay);
      let got = '';
      delayTenMs(() => got = 'Do Y task');
      setTimeout(() => {
        expect(got).to.equal('Do Y task');
        done();
      }, delay);
    });
  });
});
