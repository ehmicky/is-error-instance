import { runInNewContext } from 'vm'

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
  ],
  ({ title }, error) => {
    test(`Detects errors | ${title}`, (t) => {
      t.true(isErrorInstance(error))
    })
  },
)

each(
  ['test', undefined, null, {}, Object.create(null)],
  ({ title }, nonError) => {
    test(`Detects non-errors | ${title}`, (t) => {
      t.false(isErrorInstance(nonError))
    })
  },
)
