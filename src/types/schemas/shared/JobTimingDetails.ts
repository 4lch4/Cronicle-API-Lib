import { z } from 'zod'

export const JobTimingDetails = z
  .object({
    years: z.array(z.number()),
    months: z.array(z.number()),
    weekdays: z.array(z.number()),
    days: z.array(z.number()),
    hours: z.array(z.number()),
    minutes: z.array(z.number()),
  })
  .partial()
