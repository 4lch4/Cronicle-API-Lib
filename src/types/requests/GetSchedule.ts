export type GetScheduleParams = {
  /** The offset into the data. Passing `0` means to get the latest jobs. */
  offset?: number

  /** The number of jobs to fetch. */
  limit?: number
}
