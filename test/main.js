import { runInNewContext } from 'vm'

import test from 'ava'
import isErrorInstance from 'is-error-instance'
import { each } from 'test-each'

each(
  ['test', undefined, null, {}, Object.create(null)],
  ({ title }, nonError) => {
    test(`Detects non-errors | ${title}`, (t) => {
      t.false(isErrorInstance(nonError))
    })
  },
)

// eslint-disable-next-line fp/no-class
class ChildError extends Error {}
// eslint-disable-next-line fp/no-mutation
ChildError.prototype.name = 'ChildError'

each(
  [
    new Error('test'),
    runInNewContext('new Error("test")'),
    new TypeError('test'),
    new ChildError('test'),
    ...['Error', 'DOMException', 'DOMError', 'Exception'].map((tag) => ({
      [Symbol.toStringTag]: tag,
    })),
  ],
  ({ title }, error) => {
    test(`Detects errors | ${title}`, (t) => {
      t.true(isErrorInstance(error))
    })
  },
)

each(
  [
    {
      title: 'none',
      proxy: {},
      isError: true,
    },
    {
      title: 'getPrototypeOf',
      proxy: {
        getPrototypeOf() {
          throw new Error('unsafe')
        },
      },
      isError: false,
    },
    {
      title: 'get',
      proxy: {
        getPrototypeOf() {
          throw new Error('unsafe')
        },
        get() {
          throw new Error('unsafe')
        },
      },
      isError: false,
    },
  ],
  ({ title }, { proxy, isError }) => {
    test(`Detects errors in proxy | ${title}`, (t) => {
      // eslint-disable-next-line fp/no-proxy
      const error = new Proxy(new Error('test'), proxy)
      t.is(isErrorInstance(error), isError)
    })
  },
)
