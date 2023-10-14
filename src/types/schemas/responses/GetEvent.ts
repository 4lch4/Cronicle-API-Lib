import { z } from 'zod'
import { BaseResponse, EventData } from '../index.js'

export const GetEventResponse = BaseResponse.merge(EventData).merge(
  z.object({
    id: z.string(),
    title: z.string(),
    enabled: z.number().min(0).max(1),
    category: z.string(),
    plugin: z.string(),
    target: z.string(),
  })
)
