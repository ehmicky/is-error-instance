import { expectType } from 'tsd'

import isErrorInstance from './main.js'

expectType<false>(isErrorInstance(true))
expectType<true>(isErrorInstance(new Error('')))
