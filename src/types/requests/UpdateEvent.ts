import { EventData } from '../shared/index.js'

export type UpdateEventParams = EventData & {
  /** The ID of the event you wish to update. */
  id: string

  /** The Epoch timestamp to reset the event clock to. */
  reset_cursor?: number

  /** If you're disabling the event by setting `enabled` to 0, this will abort any running jobs. */
  abort_jobs?: boolean
}
