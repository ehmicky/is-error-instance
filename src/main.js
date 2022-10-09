// Check if a value is an error instance
export default function isErrorInstance(value) {
  return value instanceof Error || ERROR_TAGS.has(protoToString.call(value))
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
