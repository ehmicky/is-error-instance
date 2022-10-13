import { expectType, expectAssignable } from 'tsd'

import isErrorInstance, { Options } from './main.js'

expectType<object>(isErrorInstance(true))

isErrorInstance(true, {})
expectAssignable<Options>({})
