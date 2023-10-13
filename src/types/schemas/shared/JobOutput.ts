import { z } from 'zod'

export const JobOutputHTML = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  caption: z.string().optional(),
})

export const JobOutputTable = z.object({
  title: z.string().optional(),
  header: z.array(z.string()).optional(),
  rows: z.array(z.array(z.union([z.number(), z.string()]))).optional(),
  caption: z.string().optional(),
})

export const JobOutput = z.object({
  table: JobOutputTable,
  html: JobOutputHTML,
  type: z.string(),
})
