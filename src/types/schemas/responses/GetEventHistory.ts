import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const GetEventHistoryResponse = z.union([BaseResponse, z.object({})])
