import { JobTimingDetails, EventData, PaginatedResponse, BuiltInPlugin } from '../shared/index.js'

/**
 * This interface defines the shape of the response from the `GET /api/app/get_schedule` endpoint
 * provided by the Cronicle API.
 */
export interface GetScheduleResponse extends PaginatedResponse {
  rows: GetScheduleResponseRow[]
}

/**
 * This interface defines the shape of the `rows` property of the `GetScheduleResponse` interface.
 * It is used to represent a single row of data from the `GET /api/app/get_schedule` endpoint.
 *
 * _NOTE: I set all of the properties to optional as I'm not 100% sure which ones will **always** be
 * returned._
 */
export type GetScheduleResponseRow = EventData & {
  enabled?: number
  params?: any
  timing?: JobTimingDetails
  max_children?: number
  timeout?: number
  catch_up?: number
  queue_max?: number
  timezone?: string
  plugin?: string | BuiltInPlugin
  title?: string
  category?: string
  target?: string
  algo?: string
  multiplex?: number
  stagger?: number
  retries?: number
  retry_delay?: number
  detached?: number
  queue?: number
  chain?: string
  chain_error?: string
  notify_success?: string
  notify_fail?: string
  web_hook?: string
  cpu_limit?: number
  cpu_sustain?: number
  memory_limit?: number
  memory_sustain?: number
  log_max_size?: number
  notes?: string
  id?: string
  modified?: number
  created?: number
  username?: string
}
