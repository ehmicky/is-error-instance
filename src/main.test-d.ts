import { expectType } from 'tsd'

import isErrorInstance from './main.js'

expectType<boolean>(isErrorInstance(true))
