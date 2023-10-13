import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const GetMasterStateResponse = BaseResponse.merge(
  z.object({ state: z.object({ enabled: z.number().min(0).max(1) }) })
).partial()
