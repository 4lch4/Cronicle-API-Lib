import { z } from 'zod'
import { BaseResponse } from '../index.js'

export const PaginatedResponseList = z
  .object({
    page_size: z.number(),
    first_page: z.number(),
    last_page: z.number(),
    length: z.number(),
    type: z.string(),
  })
  .partial()

export const PaginatedResponse = BaseResponse.merge(
  z.object({
    list: PaginatedResponseList,
    rows: z.array(z.any()),
  })
)
