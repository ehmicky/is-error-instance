// Check if a value is an error instance
const isErrorInstance = (value) =>
  isInstanceOfError(value) || hasErrorTag(value)

export default isErrorInstance

const isInstanceOfError = (value) => {
  try {
    return value instanceof Error
  } catch {
    return false
  }
}

const hasErrorTag = (value) => {
  try {
    return ERROR_TAGS.has(protoToString.call(value))
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

const { toString: protoToString } = Object.prototype
