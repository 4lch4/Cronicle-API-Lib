import { z } from 'zod'
import { BaseResponse } from '../index.js'

// export const CreateEventResponse = z.union([BaseResponse, z.object({ id: z.string() })])
export const CreateEventResponse = BaseResponse.merge(z.object({ id: z.string() }))
