# localizator.js

Very simple module for translate your texts with custom params, cases and plurals.

[![npm version](https://img.shields.io/npm/v/localizator.js.svg?style=flat-square)](https://www.npmjs.org/package/localizator.js)
[![npm downloads](https://img.shields.io/npm/dm/localizator.js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=localizator.js)

## Features

- Simple, fast and small
- Custom params for translate
- Custom params for plural
- Custom params fot cases

## Installing

Using npm:

```bash
npm install localizator.js
```

## Usage

### Register new localizator class

javascript:

```js
import loc from 'localizator.js';

const myLoc = new loc(localeObject, currentLanguage);
```

### Get translate

locale:

```json
{
  "some.key": "some translate"
}
```

javascript:

```js
myLoc.t('some.key'); // some translate
```

### Get nested translate

locale:

```json
{
  "some": {
    "key": "some translate"
  }
}
```

javascript:

```js
myLoc.t(['some', 'key']); // some translate
```

### Get translate with wrong key

javascript:

```js
myLoc.t('wrong.key'); // wrong.key
```

### Get translate with wrong key and fallback

javascript:

```js
myLoc.t('wrong.key', 'some fallback'); // some fallback
```

### Get translate with params

locale:

```json
{
  "some.key": "some $0"
}
```

javascript:

```js
myLoc.t('some.key', 'some fallback', ['param']); // some param
```

### Get translate with plural form

locale:

```json
{
  "plural": "$0 [subs,subscriber,subscribers,subscribers]"
}
```

```js
[varName, firstForm, secondForm, thirdForm]

// varName - name of variable *surprised Nicolas Cage*

// firstForm - singular form (one apple - en, одно яблоко - ru)

// secondForm - plural form, like two items (two apples - en, два яблока - ru)

// thirdForm - plural form, like five items (five apples - en, пять яблок - ru)
```

#### One item

javascript:

```js
myLoc.t('plural', 'some fallback', [1], { subs: 1 }); // 1 subscriber
```

#### Two items

```js
myLoc.t('plural', 'some fallback', [2], { subs: 2 }); // 2 subscribers
```

#### Five items

```js
myLoc.t('plural', 'some fallback', [5], { subs: 5 }); // 5 subscribers
```