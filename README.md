# Koa Context Cache Control

[![Greenkeeper badge](https://badges.greenkeeper.io/koajs/ctx-cache-control.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Augments Koa with `ctx.cacheControl()` and `ctx.response.cacheControl()`.

## Example

```js
const Koa = require('koa')

const app = new Koa()

require('koa-ctx-cache-control')(app)

app.use(async (ctx, next) => {
  ctx.cacheControl(false) // no cache

  await next()
})
```

## API

### ctx.cacheControl(<String>)

If it's a time [ms](https://www.npmjs.com/package/ms) can parse, then it uses that time as the max age:

```js
ctx.cacheControl('1 second') // => max-age=1
```

Otherwise, it sets the header directly:

```js
ctx.cacheControl('max-age=0') // => max-age=0
```

### ctx.cacheControl(ms<Number>)

Sets the max age with a number in milliseconds.

```js
ctx.cacheControl(1000) // => max-age=1
```

### ctx.cacheControl(false)

Sets a no cache directive.

[npm-image]: https://img.shields.io/npm/v/koa-ctx-cache-control.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-ctx-cache-control
[travis-image]: https://img.shields.io/travis/koajs/ctx-cache-control/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/koajs/ctx-cache-control
[codecov-image]: https://img.shields.io/codecov/c/github/koajs/ctx-cache-control/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/koajs/ctx-cache-control
[david-image]: http://img.shields.io/david/koajs/ctx-cache-control.svg?style=flat-square
[david-url]: https://david-dm.org/koajs/ctx-cache-control
[license-image]: http://img.shields.io/npm/l/koa-ctx-cache-control.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/koa-ctx-cache-control.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/koa-ctx-cache-control
