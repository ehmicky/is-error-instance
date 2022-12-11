/**
 * Check if a value is an `Error` instance.
 *
 * This is like `value instanceof Error` except it works across realms, such as
 * iframes or Node.js [`vm`](https://nodejs.org/api/vm.html).
 *
 * @example
 * ```js
 * isErrorInstance(new Error('')) // true
 * isErrorInstance('') // false
 *
 * const CrossRealmError = vm.runInNewContext('Error')
 * isErrorInstance(new CrossRealmError('')) // true
 *
 * isErrorInstance(new TypeError('')) // true
 * isErrorInstance(new AnyOtherError('')) // true
 *
 * isErrorInstance(new DOMException('')) // true
 * isErrorInstance(new DOMError('')) // true
 *
 * isErrorInstance(new Proxy(new Error(''), {})) // true
 * isErrorInstance(
 *   new Proxy(new Error(''), {
 *     getPrototypeOf() {
 *       throw new Error('')
 *     },
 *   }),
 * ) // false
 * ```
 */
const isErrorInstance = <T>(value: T) =>
  (isInstanceOfError(value) || hasErrorTag(value)) as ErrorCheck<T>

export default isErrorInstance

type ErrorCheck<T> = T extends Error ? true : false

const isInstanceOfError = (value: unknown) => {
  try {
    return value instanceof Error
  } catch {
    return false
  }
}

const hasErrorTag = (value: unknown) => {
  try {
    return ERROR_TAGS.has(Object.prototype.toString.call(value))
  } catch {
    return false
  }
}

const ERROR_TAGS = new Set([
  // Cross-realm errors
  '[object Error]',
  // Browsers
  '[object DOMException]',
  // Browsers (deprecated)
  '[object DOMError]',
  // Sentry
  '[object Exception]',
])
