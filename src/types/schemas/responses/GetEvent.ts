import { z } from 'zod'
import { BaseResponse, EventData } from '../index.js'

export const GetEventResponse = z.union([BaseResponse, EventData])
