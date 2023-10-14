import { z } from 'zod'
import { BaseResponse } from '../shared/index.js'

export const RunEventResponse = BaseResponse.merge(
  z.object({
    ids: z.array(z.string()).optional(),
  })
)
