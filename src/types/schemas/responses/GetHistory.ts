import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const GetHistoryResponse = z.union([BaseResponse, z.object({})])
