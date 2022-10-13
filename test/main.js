import test from 'ava'
import isErrorInstance from 'is-error-instance'

test('Dummy test', (t) => {
  t.true(isErrorInstance(true))
})
