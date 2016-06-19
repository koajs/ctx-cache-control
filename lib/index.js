'use strict'

const ms = require('ms')

module.exports = app => {
  app.context.cacheControl =
  app.response.cacheControl = function cacheControl (maxAge) {
    if (maxAge === false) {
      this.set('Cache-Control', 'private, no-cache, no-store')
      return this
    }

    if (typeof maxAge === 'string') {
      const tmp = ms(maxAge)
      if (tmp) maxAge = tmp
    }

    if (typeof maxAge === 'number') {
      maxAge = Math.round(maxAge / 1000)
      this.set('Cache-Control', 'public, max-age=' + maxAge)
    } else if (typeof maxAge === 'string') {
      this.set('Cache-Control', maxAge)
    } else {
      throw new Error('invalid cache control value: ' + maxAge)
    }
  }

  return app
}
