export type GetEventHistoryParams = {
  /**
   * The Event ID of the scheduled event you want to get history for. You can find this on the
   * **Edit Event** page at the very top of the form, above the event title.
   */
  id: string

  /** The offset into the data. Passing `0` means get the latest jobs. */
  offset?: number

  /** The number of jobs to fetch. */
  limit?: number
}
