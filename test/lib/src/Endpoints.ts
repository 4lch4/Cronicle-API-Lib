import { faker } from '@faker-js/faker'
import {
  BuiltInPlugin,
  CreateEventParams,
  Cronicle,
  Schemas,
  Target,
  UpdateEventParams,
  UpdateJobParams,
} from 'cronicle-api-lib'
import { DEFAULT_TIMEZONE, TESTING_EVENT_CATEGORY, logger } from './Shared.js'

export class Endpoints {
  public constructor(private lib: Cronicle) {}

  /**
   * Gets scheduled events and returns details about them. It supports pagination to fetch chunks,
   * with the default being the first 50 events.
   *
   * @returns The response from the API.
   */
  public async getSchedule() {
    try {
      logger.debug(`[Endpoints#getSchedule]: Calling getSchedule...`)

      const res = await this.lib.getSchedule()

      return Schemas.GetScheduleResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#getSchedule]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#getEvent]: Calling getEvent({ id: ${id} })...`)

      const res = await this.lib.getEvent({ id })

      return Schemas.GetEventResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#getEvent]: Error caught:`, error)

      throw error
    }
  }

  /**
   * Creates a new Event with a random title and test duration. The duration will be between 10 - 30
   * seconds.
   *
   * @returns The response from the API.
   */
  public async createEvent() {
    try {
      const eventTitle = faker.lorem.sentence({ min: 2, max: 5 })
      const eventDuration = faker.number.int({ min: 10, max: 30 })
      const eventRetries = faker.number.int({ min: 1, max: 3 })

      const successfulTestEvent: CreateEventParams = {
        category: TESTING_EVENT_CATEGORY,
        title: eventTitle,
        enabled: 0,
        retries: eventRetries,
        plugin: BuiltInPlugin.Test,
        target: Target.AllServers,
        timezone: DEFAULT_TIMEZONE,
        params: { duration: eventDuration, burn: 0, action: 'Success' },
      }

      logger.debug(
        `[Endpoints#createEvent]: Calling createEvent() with title "${eventTitle}" and duration "${eventDuration}"...`,
        { successfulTestEvent }
      )

      const res = await this.lib.createEvent(successfulTestEvent)

      return Schemas.CreateEventResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#createEvent]: Error caught:`, error)

      throw error
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
      const eventData: UpdateEventParams = {
        title: faker.lorem.sentence({ min: 2, max: 5 }),
        id,
      }

      logger.debug(
        `[Endpoints#updateEvent]: Calling updateEvent() with title "${eventData.title}" and ID "${eventData.id}"...`,
        eventData
      )

      const res = await this.lib.updateEvent(eventData)

      return Schemas.UpdateEventResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#updateEvent]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#deleteEvent]: Calling deleteEvent({ id: ${id} })...`)

      const res = await this.lib.deleteEvent(id)

      return Schemas.DeleteEventResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#deleteEvent]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#getEventHistory]: Calling getEventHistory({ id: ${id} })...`)

      const res = await this.lib.getEventHistory({ id })

      return Schemas.GetEventHistoryResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#getEventHistory]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#getHistory]: Calling getHistory()...`)

      const res = await this.lib.getHistory()

      return Schemas.GetHistoryResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#getHistory]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#runEvent]: Calling runEvent({ id: ${id} })...`)

      const res = await this.lib.runEvent({ id })

      return Schemas.RunEventResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#runEvent]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#getJobStatus]: Calling getJobStatus({ id: ${id} })...`)

      const res = await this.lib.getJobStatus(id)

      return Schemas.GetJobStatusResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#getJobStatus]: Error caught:`, error)

      throw error
    }
  }

  /**
   * Gets status for all active jobs, and returns them all at once.
   *
   * @returns The response from the API.
   */
  public async getActiveJobs() {
    try {
      logger.debug(`[Endpoints#getActiveJobs]: Calling getActiveJobs()...`)

      const res = await this.lib.getActiveJobs()

      return Schemas.GetActiveJobsResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#getActiveJobs]: Error caught:`, error)

      throw error
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
      const updateData: UpdateJobParams = {
        id,
        timeout: faker.number.int({ min: 60, max: 120 }),
        retries: faker.number.int({ min: 1, max: 3 }),
        retry_delay: faker.number.int({ min: 5, max: 10 }),
      }

      logger.debug(
        `[Endpoints#updateJob]: Calling updateJob() with ID "${updateData.id}" and data:`,
        updateData
      )

      const res = await this.lib.updateJob(updateData)

      return Schemas.UpdateJobResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#updateJob]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#abortJob]: Calling abortJob({ id: ${id} })...`)

      const res = await this.lib.abortJob(id)

      return Schemas.AbortJobResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#abortJob]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#getMasterState]: Calling getMasterState()...`)

      const res = await this.lib.getMasterState()

      return Schemas.GetMasterStateResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#getMasterState]: Error caught:`, error)

      throw error
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
      logger.debug(`[Endpoints#updateMasterState]: Calling updateMasterState(${state})...`)

      const res = await this.lib.updateMasterState(state)

      return Schemas.UpdateMasterStateResponse.parse(res)
    } catch (error) {
      logger.error(`[Endpoints#updateMasterState]: Error caught:`, error)

      throw error
    }
  }
}
