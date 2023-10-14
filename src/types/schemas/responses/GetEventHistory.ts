import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const GetEventHistoryResponse = BaseResponse.merge(z.object({}))
