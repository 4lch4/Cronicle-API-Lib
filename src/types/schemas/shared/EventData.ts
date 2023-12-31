import { z } from 'zod'
import { JobTimingDetails } from './JobTimingDetails.js'
import { AlgorithmChoice, BuiltInPlugin, BuiltInTarget } from './index.js'

export const EventData = z
  .object({
    algo: AlgorithmChoice,
    api_key: z.string(),
    catch_up: z.boolean(),
    category: z.string(),
    chain: z.string(),
    chain_error: z.string(),
    cpu_limit: z.number().min(1).max(100),
    cpu_sustain: z.number().min(1),
    created: z.number(),
    detached: z.boolean(),
    enabled: z.number().min(0).max(1),
    id: z.string(),
    log_max_size: z.number().min(1),
    max_children: z.number().min(1),
    memory_limit: z.number().min(1),
    memory_sustain: z.number().min(1),
    modified: z.number(),
    multiplex: z.boolean(),
    notes: z.string(),
    notify_fail: z.string(),
    notify_success: z.string(),
    params: z.any(),
    plugin: z.union([z.string(), BuiltInPlugin]),
    queue: z.boolean(),
    queue_max: z.number().min(1),
    retries: z.number().min(0),
    retry_delay: z.number().min(1),
    stagger: z.number().min(1),
    target: z.union([z.string(), BuiltInTarget]),
    timeout: z.number().min(1),
    timezone: z.string(),
    timing: JobTimingDetails,
    title: z.string(),
    username: z.string(),
    web_hook: z.string(),
  })
  .partial()
