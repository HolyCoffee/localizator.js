import loc from './require';
import ru from './locales/locale_ru';
import en from './locales/locale_en';
import { expect } from 'chai';

describe('index.js', () => {
  const test = new loc(ru);

  it('create localizator', () => {
    expect(test.l).equal(ru);
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

  it('get translate with plural (one item)', () => {
    expect(test.t('plural', null, [1], { subs: 1, add: 1 })).equal('1 подписчик добавлен');
  });

  it('get translate with plural (two items)', () => {
    expect(test.t('plural', null, [2], { subs: 2, add: 2 })).equal('2 подписчика добавлены');
  });

  it('get translate with plural (five items)', () => {
    expect(test.t('plural', null, [5], { subs: 5, add: 5 })).equal('5 подписчиков добавлены');
  });

  it('change locale', () => {
    test.c(en);
    expect(test.l).equal(en);
  });

  it('check language after locale changed', () => {
    expect(test.t('test')).equal('test');
  });
});
