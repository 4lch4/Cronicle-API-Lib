import { z } from 'zod'
import { BaseResponse, EventData, JobOutput, ResourceDetails } from '../index.js'

export const GetJobStatusResponseData = z
  .object({
    hostname: z.string(),
    source: z.string(),
    log_file: z.string(),
    pid: z.number(),
    progress: z.number().min(0.0).max(1.0),
    complete: z.number().min(1).max(1),
    code: z.union([z.number(), z.string()]),
    description: z.string(),
    perf: z.union([z.string(), z.any()]),
    time_start: z.number(),
    time_end: z.number(),
    elapsed: z.number(),
    cpu: ResourceDetails,
    mem: ResourceDetails,
  })
  .partial()

export const GetJobStatusResponse = z.union([
  BaseResponse,
  EventData,
  JobOutput,
  GetJobStatusResponseData,
])
