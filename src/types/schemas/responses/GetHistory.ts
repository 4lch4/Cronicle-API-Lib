import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const GetHistoryResponse = BaseResponse.merge(z.object({}))
