import { runInNewContext } from 'node:vm'

import test from 'ava'
import isErrorInstance from 'is-error-instance'
import { each } from 'test-each'

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
    // eslint-disable-next-line fp/no-proxy
    new Proxy(new Error('test'), {}),
  ],
  ({ title }, error) => {
    test(`Detects errors | ${title}`, (t) => {
      t.true(isErrorInstance(error))
    })
  },
)

each(
  [
    'test',
    undefined,
    null,
    {},
    Object.create(null),
    // eslint-disable-next-line fp/no-proxy
    new Proxy(new Error('test'), {
      getPrototypeOf: () => {
        throw new Error('unsafe')
      },
    }),
    // eslint-disable-next-line fp/no-proxy
    new Proxy(new Error('test'), {
      getPrototypeOf: () => {
        throw new Error('unsafe')
      },
      get: () => {
        throw new Error('unsafe')
      },
    }),
  ],
  ({ title }, nonError) => {
    test(`Detects non-errors | ${title}`, (t) => {
      t.false(isErrorInstance(nonError))
    })
  },
)
