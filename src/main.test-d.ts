import { expectType } from 'tsd'

import isErrorInstance from 'is-error-instance'

expectType<false>(isErrorInstance(true))
expectType<true>(isErrorInstance(new Error('')))
