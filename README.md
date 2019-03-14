# localizator.js

Very simple module for translate your texts with custom params, cases and plurals.

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

```js
myLoc.t('some.key', 'some fallback', ['param']); // some param
```
