import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const ErrorResponse = z.union([BaseResponse, z.object({ description: z.string() })])
