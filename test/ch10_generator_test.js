import { expect } from 'chai';

import https from 'https';

import { generatorSequence, sayFullName } from '../src/lib/ch10_generator';

describe('Creating Generators', () => {
  describe('generatorSequence()', () => {
    it('Generator activation success', () => {
      const generatorResult = generatorSequence();
      expect(generatorResult.next()).to.eql({ value: 'first', done: false });
      expect(generatorResult.next()).to.eql({ value: 'second', done: false });
      expect(generatorResult.next()).to.eql({ value: 'third', done: false});
      expect(generatorResult.next()).to.eql({ value: undefined, done: true});
    });
    it('Passing data to generator', () => {
      const fullName = sayFullName();
      expect(fullName.next()).to.eql({ value: undefined, done: false });
      expect(fullName.next('anto')).to.eql({ value: undefined, done: false });
      expect(fullName.next('aravinth')).to.eql({ value: 'antoaravinth', done: false });
      expect(fullName.next()).to.eql({ value: undefined, done: true });
    });
  });
});

describe('Using Generators to handle async calls', () => {
  describe('Generators for Async - A simple case', () => {
    it('should be success on setTimeout async process', (done) => {
      let generator;
      const getDataOne = () => {
        setTimeout(() => {
          generator.next('dummy data one');
        }, 0.5 * 1000);
      };

      const getDataTwo = () => {
        setTimeout(() => {
          generator.next('dummy data two');
        }, 0.5 * 1000);
      };

      function* main() {
        const dataOne = yield getDataOne();
        const dataTwo = yield getDataTwo();

        expect(dataOne).to.equal('dummy data one');
        expect(dataTwo).to.equal('dummy data two');
        done();
      }

      generator = main();
      generator.next();
    });
  });
});

describe('Generators for async - a real world case', () => {
  describe('request()', () => {
    function httpGetAsync(url, callback) {
      return https.get(url,
        function(response) {
          let body = '';
          response.on('data', (d) => {
            body += d;
          });
          response.on('end', () => {
            let parsed = JSON.parse(body);
            callback(parsed);
          });
        }
      );
    }
    it('should get json data properly', (done) => {
      function request(url) {
        httpGetAsync(url, (response) => {
          generator.next(response);
        });
      }

      function* main() {
        try {
          const picturesJson = yield request('https://www.reddit.com/r/pics/.json');
          const firstPictureData = yield request(picturesJson.data.children[0].data.url + '.json');
          console.log(firstPictureData);
        } catch(e) {
          console.error(e);
        }
        done();
      }

      const generator = main();
      generator.next();
    });
  });
});

describe('generator playground', () => {
  describe('generator()', () => {
    it('should properly print nums', () => {
      function* generator(n) {
        let i = 0;
        while(i < n) {
          yield i;
          i += 1;
        }
      }

      for (let n of generator(5)) {
        console.log(n);
      }
    });
  });
});
