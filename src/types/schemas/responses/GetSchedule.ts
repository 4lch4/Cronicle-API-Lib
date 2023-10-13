import { z } from 'zod'
import { BuiltInPlugin, EventData, JobTimingDetails, PaginatedResponse } from '../shared/index.js'

/** A Zod Schema to replace the GetScheduleResponseRow type from above. */
export const GetScheduleResponseRow = EventData.merge(
  z
    .object({
      enabled: z.number(),
      params: z.any(),
      timing: JobTimingDetails,
      max_children: z.number(),
      timeout: z.number(),
      catch_up: z.number(),
      queue_max: z.number(),
      timezone: z.string(),
      plugin: z.union([z.string(), BuiltInPlugin]),
      title: z.string(),
      category: z.string(),
      target: z.string(),
      algo: z.string(),
      multiplex: z.number(),
      stagger: z.number(),
      retries: z.number(),
      retry_delay: z.number(),
      detached: z.number(),
      queue: z.number(),
      chain: z.string(),
      chain_error: z.string(),
      notify_success: z.string(),
      notify_fail: z.string(),
      web_hook: z.string(),
      cpu_limit: z.number(),
      cpu_sustain: z.number(),
      memory_limit: z.number(),
      memory_sustain: z.number(),
      log_max_size: z.number(),
      notes: z.string(),
      id: z.string(),
      modified: z.number(),
      created: z.number(),
      username: z.string(),
    })
    .partial()
)

export const GetScheduleResponse = PaginatedResponse.merge(
  z.object({ rows: z.array(GetScheduleResponseRow) })
)
