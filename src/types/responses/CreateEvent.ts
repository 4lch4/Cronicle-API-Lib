import { BaseResponse } from '../shared/index.js'

export type CreateEventResponse = BaseResponse & {
  /** The ID of the newly created Event. */
  id: string
}
