'use strict'

/* eslint-env mocha */

const request = require('supertest')
const Koa = require('koa')

const cc = require('..')

describe('Koa Context Cache Control', () => {
  ;[
    'context',
    'response'
  ].forEach(type => {
    describe(type === 'context' ? 'ctx.cacheControl' : 'ctx.response.cacheControl', () => {
      it('(`X seconds`) should set the header with a valid number', done => {
        const app = new Koa()
        cc(app)

        app.use((ctx) => {
          if (type === 'context') {
            ctx.cacheControl('1 second')
          } else {
            ctx.response.cacheControl('1 second')
          }

          ctx.status = 204
        })

        request(app.listen())
        .get('/')
        .expect('Cache-Control', /\bmax-age=1\b/)
        .expect(204, done)
      })

      it('(cacheControl) should set the header with the right max age', done => {
        const HEADER = 'private, no-cache, no-store, max-age=0'

        const app = new Koa()
        cc(app)

        app.use((ctx) => {
          if (type === 'context') {
            ctx.cacheControl(HEADER)
          } else {
            ctx.response.cacheControl(HEADER)
          }

          ctx.status = 204
        })

        request(app.listen())
        .get('/')
        .expect('Cache-Control', HEADER)
        .expect(204, done)
      })

      it('(<number>) should set the header with the right max age', done => {
        const app = new Koa()
        cc(app)

        app.use((ctx) => {
          if (type === 'context') {
            ctx.cacheControl(0)
          } else {
            ctx.response.cacheControl(0)
          }

          ctx.status = 204
        })

        request(app.listen())
        .get('/')
        .expect('Cache-Control', /\bmax-age=0\b/)
        .expect(204, done)
      })

      it('(false) should set the header no caching', done => {
        const app = new Koa()
        cc(app)

        app.use((ctx) => {
          if (type === 'context') {
            ctx.cacheControl(false)
          } else {
            ctx.response.cacheControl(false)
          }

          ctx.status = 204
        })

        request(app.listen())
        .get('/')
        .expect('Cache-Control', /\bno-cache\b/)
        .expect('Cache-Control', /\bno-store\b/)
        .expect('Cache-Control', /\bprivate\b/)
        .expect(204, done)
      })
    })
  })
})
