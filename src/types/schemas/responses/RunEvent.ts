import { z } from 'zod'
import { BaseResponse } from '../shared/index.js'

export const RunEventResponseSchema = BaseResponse.merge(
  z.object({
    ids: z.array(z.string()).optional(),
  })
)
