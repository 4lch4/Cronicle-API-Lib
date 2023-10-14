import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const ErrorResponse = BaseResponse.merge(z.object({ description: z.string() }))
