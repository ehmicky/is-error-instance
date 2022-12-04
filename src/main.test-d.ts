import isErrorInstance from 'is-error-instance'
import { expectType } from 'tsd'

expectType<false>(isErrorInstance(true))
expectType<true>(isErrorInstance(new Error('')))
