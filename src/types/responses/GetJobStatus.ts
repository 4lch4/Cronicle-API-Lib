import { BaseResponse, EventData, JobOutput, ResourceDetails } from '../shared/index.js'

type GetJobStatusResponseData = {
  /** The hostname of the server currently running, or previously ran, the job. */
  hostname?: string

  /**
   * If the job was started manually via user or API, this will contain a text string identifying
   * who it was.
   */
  source?: string

  /** A local filesystem path to the job's log file (only applicable if job is in progress). */
  log_file?: string

  /** The main PID of the job process that was spawned. */
  pid?: number

  /** Current progress of the job, from `0.0` to `1.0`, as reported by the Plugin (optional). */
  progress?: number

  /** Will be set to 1 when the job is complete, omitted if still in progress. */
  complete?: number

  /**
   * A code representing job success (`0`) or failure (any other value). Only applicable for
   * completed jobs.
   */
  code?: number

  /**
   * If the job failed, this will contain the error message. Only applicable for completed jobs.
   */
  description?: string

  /**
   * Performance metrics for the job, if reported by the Plugin (optional). Only applicable for
   * completed jobs.
   */
  perf?: string | { [key: string]: string | number | boolean }

  /** A Unix Epoch timestamp of when the job started. */
  time_start?: number

  /** A Unix Epoch timestamp of when the job completed. Only applicable for completed jobs. */
  time_end?: number

  /** The elapsed time of the job, in seconds. */
  elapsed?: number

  /** An object representing the CPU use of the job. */
  cpu?: ResourceDetails

  /** An object representing the memory use of the job. */
  mem?: ResourceDetails
}

export type GetJobStatusResponse = BaseResponse & EventData & JobOutput & GetJobStatusResponseData
