[![Codecov](https://img.shields.io/codecov/c/github/ehmicky/is-error-instance.svg?label=tested&logo=codecov)](https://codecov.io/gh/ehmicky/is-error-instance)
[![TypeScript](https://img.shields.io/badge/-Typed-brightgreen?logo=typescript&colorA=gray&logoColor=0096ff)](/types/main.d.ts)
[![Node](https://img.shields.io/badge/-Node.js-brightgreen?logo=node.js&colorA=gray&logoColor=66cc33)](https://www.npmjs.com/package/is-error-instance)
[![Browsers](https://img.shields.io/badge/-Browsers-brightgreen?logo=firefox&colorA=gray)](https://en.wikipedia.org/wiki/Isomorphic_JavaScript)
[![Twitter](https://img.shields.io/badge/-Twitter-brightgreen.svg?logo=twitter&colorA=gray)](https://twitter.com/intent/follow?screen_name=ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-brightgreen.svg?logo=medium&colorA=gray)](https://medium.com/@ehmicky)

Check if a value is an `Error` instance.

This is like `value instanceof Error` except it works across realms, such as
iframes or Node.js [`vm`](https://nodejs.org/api/vm.html).

# Example

<!-- eslint-disable fp/no-proxy -->

```js
import isErrorInstance from 'is-error-instance'

console.log(isErrorInstance(new Error(''))) // true
console.log(isErrorInstance('')) // false

const CrossRealmError = vm.runInNewContext('Error')
console.log(isErrorInstance(new CrossRealmError(''))) // true

console.log(isErrorInstance(new TypeError(''))) // true
console.log(isErrorInstance(new AnyOtherError(''))) // true

console.log(isErrorInstance(new DOMException(''))) // true
console.log(isErrorInstance(new DOMError(''))) // true

console.log(isErrorInstance(new Proxy(new Error(''), {}))) // true
console.log(
  isErrorInstance(
    new Proxy(new Error(''), {
      getPrototypeOf() {
        throw new Error('')
      },
    }),
  ),
) // false
```

# Install

```bash
npm install is-error-instance
```

This package works in browsers and Node.js >=14.18.0. It is an ES module and
must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`.

# API

## isErrorInstance(value)

`value` `any`\
_Return value_: `boolean`

# Related projects

- [`modern-errors`](https://github.com/ehmicky/modern-errors): Handle errors
  like it's 2022 🔮
- [`error-custom-class`](https://github.com/ehmicky/error-custom-class): Create
  one error class
- [`error-class-utils`](https://github.com/ehmicky/error-class-utils): Utilities
  to properly create error classes
- [`error-serializer`](https://github.com/ehmicky/error-serializer): Convert
  errors to/from plain objects
- [`merge-error-cause`](https://github.com/ehmicky/merge-error-cause): Merge an
  error with its `cause`
- [`normalize-exception`](https://github.com/ehmicky/normalize-exception):
  Normalize exceptions/errors
- [`set-error-class`](https://github.com/ehmicky/set-error-class): Properly
  update an error's class
- [`set-error-message`](https://github.com/ehmicky/set-error-message): Properly
  update an error's message
- [`set-error-props`](https://github.com/ehmicky/set-error-props): Properly
  update an error's properties
- [`error-cause-polyfill`](https://github.com/ehmicky/error-cause-polyfill):
  Polyfill `error.cause`
- [`handle-cli-error`](https://github.com/ehmicky/handle-cli-error): 💣 Error
  handler for CLI applications 💥
- [`log-process-errors`](https://github.com/ehmicky/log-process-errors): Show
  some ❤ to Node.js process errors

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

<!-- Thanks go to our wonderful contributors: -->

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore -->
<!--
<table><tr><td align="center"><a href="https://twitter.com/ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/is-error-instance/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/is-error-instance/commits?author=ehmicky" title="Documentation">📖</a></td></tr></table>
 -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
