import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const CreateEventResponse = z.union([BaseResponse, z.object({ id: z.string() })])
