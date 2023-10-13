import { Cronicle, BuiltInPlugin, Target } from 'cronicle-api-lib'
import { faker } from '@faker-js/faker'

export class EndpointTests {
  public constructor(private lib: Cronicle) {}

  /**
   * Gets scheduled events and returns details about them. It supports pagination to fetch chunks,
   * with the default being the first 50 events.
   *
   * @returns The response from the API.
   */
  public async getSchedule() {
    try {
      const res = await this.lib.getSchedule()

      return res
    } catch (error) {
      console.error(`[EndpointTests#getSchedule]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Gets details about a single event, given its ID or exact title.
   *
   * @param id The ID of the event to retrieve.
   *
   * @returns The response from the API.
   */
  public async getEvent(id: string) {
    try {
      const res = await this.lib.getEvent({ id })

      return res
    } catch (error) {
      console.error(`[EndpointTests#getEvent]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Creates a new Event with a random title and duration. The duration will be between 10 - 30
   * seconds.
   *
   * @returns The response from the API.
   */
  public async createEvent() {
    try {
      const res = await this.lib.createEvent({
        category: 'general',
        title: faker.lorem.sentence({ min: 2, max: 5 }),
        enabled: 0,
        plugin: BuiltInPlugin.Test,
        target: Target.AllServers,
        params: { duration: faker.number.int({ min: 10, max: 30 }) },
      })

      return res
    } catch (error) {
      console.error(`[EndpointTests#createEvent]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Updates an existing event given its ID, replacing any properties specified.
   *
   * @param id The ID of the event to update.
   *
   * @returns The response from the API.
   */
  public async updateEvent(id: string) {
    try {
      const res = await this.lib.updateEvent({
        title: faker.lorem.sentence({ min: 2, max: 5 }),
        id,
      })

      return res
    } catch (error) {
      console.error(`[EndpointTests#updateEvent]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Deletes the Event with the given ID.
   *
   * _NOTE: The event must not have any active jobs still running (or else an error will be
   * returned)._
   *
   * @param id The ID of the event to delete.
   *
   * @returns The response from the API.
   */
  public async deleteEvent(id: string) {
    try {
      const res = await this.lib.deleteEvent(id)

      return res
    } catch (error) {
      console.error(`[EndpointTests#deleteEvent]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Gets the event history (i.e. previously completed jobs) for a specific event. The response
   * array is sorted by reverse timestamp (descending), so the latest jobs are listed first.
   *
   * @param id The ID of the event to get the history for.
   *
   * @returns The response from the API.
   */
  public async getEventHistory(id: string) {
    try {
      const res = await this.lib.getEventHistory({ id })

      return res
    } catch (error) {
      console.error(`[EndpointTests#getEventHistory]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Gets previously completed jobs for all events. The response array is sorted by reverse
   * timestamp (descending), so the latest jobs are listed first.
   *
   * @returns The response from the API.
   */
  public async getHistory() {
    try {
      const res = await this.lib.getHistory()

      return res
    } catch (error) {
      console.error(`[EndpointTests#getHistory]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * immediately starts an on-demand job for an event, regardless of the schedule. This is
   * effectively the same as a user clicking the "Run Now" button in the UI.
   *
   * @param id The ID of the event to run.
   *
   * @returns The response from the API.
   */
  public async runEvent(id: string) {
    try {
      const res = await this.lib.runEvent(id)

      return res
    } catch (error) {
      console.error(`[EndpointTests#runEvent]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Gets the status for a job currently in progress, or one already completed.
   *
   * @param id The ID of the job to get the status for.
   *
   * @returns The response from the API.
   */
  public async getJobStatus(id: string) {
    try {
      const res = await this.lib.getJobStatus(id)

      return res
    } catch (error) {
      console.error(`[EndpointTests#getJobStatus]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Gets status for all active jobs, and returns them all at once.
   *
   * @returns The response from the API.
   */
  public async getActiveJobs() {
    try {
      const res = await this.lib.getActiveJobs()

      return res
    } catch (error) {
      console.error(`[EndpointTests#getActiveJobs]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Updates a job that is already in progress. Only certain job properties may be changed when the
   * job is running, and those are listed below. This is typically used to adjust timeouts, resource
   * limits, or user notification settings.
   *
   * @param id The ID of the job to update.
   *
   * @returns The response from the API.
   */
  public async updateJob(id: string) {
    try {
      const res = await this.lib.updateJob({
        id,
        timeout: faker.number.int({ min: 60, max: 120 }),
        retries: faker.number.int({ min: 1, max: 3 }),
        retry_delay: faker.number.int({ min: 5, max: 10 }),
      })

      return res
    } catch (error) {
      console.error(`[EndpointTests#updateJob]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Aborts a running job given its ID.
   *
   * @param id The ID of the job to abort.
   *
   * @returns The response from the API.
   */
  public async abortJob(id: string) {
    try {
      const res = await this.lib.abortJob(id)

      return res
    } catch (error) {
      console.error(`[EndpointTests#abortJob]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Gets the current application "state", which contains information like the status of the
   * scheduler (enabled or disabled).
   *
   * @returns The response from the API.
   */
  public async getMasterState() {
    try {
      const res = await this.lib.getMasterState()

      return res
    } catch (error) {
      console.error(`[EndpointTests#getMasterState]: Error caught:`)
      console.error(error)

      return undefined
    }
  }

  /**
   * Updates the master application state, i.e. toggling the scheduler on/off.
   *
   * @param state The state to set.
   *
   * @returns The response from the API.
   */
  public async updateMasterState(state: 0 | 1) {
    try {
      const res = await this.lib.updateMasterState(state)

      return res
    } catch (error) {
      console.error(`[EndpointTests#updateMasterState]: Error caught:`)
      console.error(error)

      return undefined
    }
  }
}
