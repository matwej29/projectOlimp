const {assert} = require('chai');
const {describe, it} = require('mocha');

const formatDate = require('../modules/formatDate');

describe('Formating date', () => {
  it('should equal with 2020-09-09 12:34:22.719308+00', () => {
    assert.equal(
      '12:34 9 сентября 2020',formatDate('2020-09-09 12:34:22.719308+00')
    );
  });
});
