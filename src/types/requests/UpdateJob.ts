export type UpdateJobParams = {
  /** The ID of the job you wish to update. */
  id: string

  /** The total run time in seconds to allow, before the job is aborted. */
  timeout?: number

  /** The number of retries before the job is reported a failure. */
  retries?: number

  /** The number of seconds between retries. */
  retry_delay?: number

  /** Launch another event when the job completes successfully. */
  chain?: string

  /** Launch another event when the job fails (see Chain Reaction). */
  chain_error?: string

  /** A comma-separated list of e-mail addresses to notify on job success. */
  notify_success?: string

  /** A comma-separated list of e-mail addresses to notify on job failure. */
  notify_fail?: string

  /** A fully-qualified URL to ping when the job completes. */
  web_hook?: string

  /** The maximum allowed CPU before the job is aborted (100 = 1 CPU core). */
  cpu_limit?: number

  /** The number of seconds to allow the max CPU to be exceeded. */
  cpu_sustain?: number

  /** The maximum allowed memory usage (in bytes) before the job is aborted. */
  memory_limit?: number

  /** The number of seconds to allow the max memory to be exceeded. */
  memory_sustain?: number

  /** The maximum allowed job log file size (in bytes) before the job is aborted. */
  log_max_size?: number
}
