# localizator.js

Very simple module for translate your texts with custom params, cases and plurals.

[![npm version](https://img.shields.io/npm/v/localizator.js.svg?style=flat-square)](https://www.npmjs.org/package/localizator.js)
[![install size](https://packagephobia.now.sh/badge?p=localizator.js)](https://packagephobia.now.sh/result?p=localizator.js)
[![npm downloads](https://img.shields.io/npm/dm/localizator.js.svg?style=flat-square)](http://npm-stat.com/charts.html?package=localizator.js)

## Features

- Simple, fast and small
- Custom params for translate
- Custom params for plural

## Menu

- [Basic usage](#basic)
- [Usage with params](#params)
- [Usage with plural form](#plural)
- [Usage in React](#react)
- [Usage in Vue](#vue)
- [Usage in Svelte](#svelte)

## Installing

Using npm:

```bash
npm install localizator.js
```

## Usage

### <a name="basic" id="basic"></a>Register new localizator class

javascript:

```js
import loc from 'localizator.js';

const myLoc = new loc(localeObject);
```

### Change locale

javascript:

```js
myLoc.c(localeObject);
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

### <a name="params" id="params"></a>Get translate with params

#### Params in array:

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

#### Params in object

locale:

```json
{
  "some.key": "some {test}"
}
```

javascript:

```js
myLoc.t('some.key', 'some fallback', { test: 'param' }); // some param
```

### <a name="plural" id="plural"></a>Get translate with plural form

locale:

```json
{
  "plural": "$0 [subs,subscriber,subscribers,subscribers]"
}
```

```js
[varName, firstForm, secondForm, thirdForm];

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

## <a name="react" id="react"></a>Usage with React

### Without context

registration:

```js
import l from 'localizator.js';

window.l = new l(localeObject);
```

usage in jsx:

```js
render() {
  return (
    <div>
      { window.l.t(params) }
    </div>
  )
}
```

### With context

registration:

```js
import l from 'localizator.js';

export const SomeContext = React.createContext({
  l: new l(localeObject)
});

...

render() {
    return (
      <div>
        <SomeContext.Provider>
          {this.props.children}
        </SomeContext.Provider>
      </div>
    );
  }
```

usage:

```js
import { SomeContext } from '../path/to/provider';

...

render() {
    return (
      <div>
        <SomeContext.Consumer>
          {({ l }) => (
            <div>
              {l.t(params)}
            </div>
          )}
        </SomeContext.Consumer>
      </div>
    );
  }
```

## <a name="vue" id="vue"></a>Usage with Vue

You must be use localizator.js as vue plugin

registration:

```js
import loc, { vuel } from 'localizator.js';

Vue.use(vuel, { loc, localeObject });
```

usage:

```js
<script>
  export default {
    ...
    methods: {
      translate() {
        return this.$t(params)
      }
    }
  }
</script>

<template>
  <div>
    {{ $t(params) }}
  </div>
</template>
```

change locale:

```js
<script>
  export default {
    ...
    methods: {
      changeLocale() {
        this.$cl(localeObject)
      }
    }
  }
</script>
```

if you use typescript, you must be create `localizator.d.ts` file into `src` folder,
and write into him:

```ts
import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $t: (
      k: string,
      f?: string,
      p?: Array<string | number> | { [key: string]: string },
      pl?: { [key: string]: number }
    ) => string;
    $cl: (newLocale: { [key: string]: string }) => void;
  }
}
```

## <a name="svelte" id="svelte"></a>Usage with Svelte

registration:

```js
// main.js
import App from './App.svelte';
import { Store } from 'svelte/store.js';
import loc from 'localizator.js';
const l = new loc({ test: 'test' });
new App({
  target: document.body,
  store: new Store({
    l
  })
});
```

usage in components:

```html
<div>
  { $t.t(params) } // translate

  <button on:click="someMethod(localeObject)">change locale</button>
</div>

<script>
  export default {
    ...
    methods: {
      someMethod(localeObject) { // change locale
        const { l } = this.store.get();
        l.c(localeObject);
        this.store.set({ l });
      }
    }
  }
</script>
```
