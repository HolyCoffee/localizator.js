const loc = require('../index');
const locale = require('./locale');
const { expect } = require('chai');

describe('index.js', () => {
  const test = new loc(locale, 'ru');

  it('create localizator', () => {
    expect(test.l).equal(locale);
    expect(test.lng).equal('ru');
  });

  it('get translate by string key', () => {
    expect(test.t('test')).equal('тест');
  });

  it('get translate by array key', () => {
    expect(test.t(['some', 'key'])).equal('тест с массивом ключей');
  });

  it('get translate with wrong key', () => {
    expect(test.t('some.key')).equal('some.key');
  });

  it('get fallback', () => {
    expect(test.t('some.key', 'translate is missing')).equal('translate is missing');
  });

  it('get translate with params', () => {
    expect(test.t('params', null, ['some param'])).equal('тест с параметром - some param');
  });
});
