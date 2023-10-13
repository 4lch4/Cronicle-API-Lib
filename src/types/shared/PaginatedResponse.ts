import { BaseResponse, PaginatedResponseList } from './index.js'

export type PaginatedResponse = BaseResponse & {
  list: PaginatedResponseList
  rows: any[]
}
