import { BuiltInPlugin, AlgorithmChoice, JobTimingDetails, Target } from './index.js'

/**
 * This interfaces describes the various properties that can be attached to any response from the
 * API that has to do with events. It can also be used when creating new events.
 */
export type EventData = {
  /** Specifies the algorithm to use for picking a server from the target group. */
  algo?: AlgorithmChoice

  /** The API Key of the application that originally created the event (if created via API). */
  api_key?: string

  /** Specifies whether the event has **Run All Mode** enabled or not. */
  catch_up?: boolean

  /** The **Category** ID to which the event is assigned. */
  category?: string

  /** The chain reaction event ID to launch when jobs complete successfully. */
  chain?: string

  /** The chain reaction event ID to launch when jobs fail. */
  chain_error?: string

  /** Limit the CPU to the specified percentage (100 = 1 core), abort if exceeded. */
  cpu_limit?: number

  /** Only abort if the CPU limit is exceeded for this many seconds. */
  cpu_sustain?: number

  /** The date/time of the event's initial creation, in Epoch seconds. */
  created?: number

  /** Specifies whether **Detached Mode** is enabled or not. */
  detached?: boolean

  /** Specifies whether the event is enabled (`1`), active in the scheduler, or not (`0`). */
  enabled?: 0 | 1

  /** A unique ID assigned to the event when it was first created. */
  id?: string

  /** Limit the job log file size to the specified amount, in bytes. */
  log_max_size?: number

  /** The total amount of concurrent jobs allowed to run. */
  max_children?: number

  /** Limit the memory usage to the specified amount, in bytes. */
  memory_limit?: number

  /** Only abort if the memory limit is exceeded for this many seconds. */
  memory_sustain?: number

  /** The date/time of the event's last modification, in Epoch seconds. */
  modified?: number

  /** Specifies whether the event has **Multiplexing** mode is enabled or not. */
  multiplex?: boolean

  /** Text notes saved with the event, included in e-mail notifications. */
  notes?: string

  /** List of e-mail recipients to notify upon job failure (CSV). */
  notify_fail?: string

  /** List of e-mail recipients to notify upon job success (CSV). */
  notify_success?: string

  /**
   * An object containing the **Plugin's** custom parameters, filled out with values from the
   * **Event Editor**.
   */
  params?: any

  /** The ID of the **Plugin** which will run jobs for the event. */
  plugin?: string | BuiltInPlugin

  /** Allow jobs to be queued up when they can't run immediately. */
  queue?: boolean

  /** Maximum queue length, when `queue` is enabled. */
  queue_max?: number

  /** The number of retries to allow before reporting an error. */
  retries?: number

  /** Optional delay between retries, in seconds. */
  retry_delay?: number

  /**
   * If Multiplexing is enabled, this specifies the number of seconds to wait between job launches
   */
  stagger?: number

  /** Events can target a **Server Group** (Group ID), or an individual server (hostname). */
  target?: string | Target

  /** The maximum allowed run time for jobs, specified in seconds. */
  timeout?: number

  /**
   * The timezone for interpreting the event timing settings. Needs to be an [IANA timezone
   * string](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
   */
  timezone?: string

  /** An object describing when to run scheduled jobs. */
  timing?: JobTimingDetails

  /**
   * A display name for the event, shown on the **Schedule Tab** as well as in reports and e-mails.
   */
  title?: string

  /** The username of the user who originally created the event (if created in the UI). */
  username?: string

  /** An optional URL to hit for the start and end of each job. */
  web_hook?: string
}
