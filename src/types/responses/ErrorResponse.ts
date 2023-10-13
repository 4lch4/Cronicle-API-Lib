import { BaseResponse } from '../shared/index.js'

export type ErrorResponse = BaseResponse & {
  description: string
}
