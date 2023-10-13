import { z } from 'zod'

export const ResourceDetails = z
  .object({
    min: z.number(),
    max: z.number(),
    total: z.number(),
    count: z.number(),
    current: z.number(),
  })
  .partial()
