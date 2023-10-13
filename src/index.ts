import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import {
  AbortJobResponse,
  BaseResponse,
  CreateEventParams,
  CreateEventResponse,
  DeleteEventResponse,
  Endpoints,
  EventData,
  GetActiveJobsResponse,
  GetEventHistoryParams,
  GetEventHistoryResponse,
  GetEventResponse,
  GetHistoryResponse,
  GetJobStatusResponse,
  GetMasterStateResponse,
  GetScheduleResponse,
  RunEventResponse,
  UpdateEventParams,
  UpdateEventResponse,
  UpdateJobParams,
  UpdateJobResponse,
  UpdateMasterStateResponse,
} from './types/index.js'

export class Cronicle {
  private client: AxiosInstance

  constructor(baseUrl: string, apiKey: string) {
    this.client = Axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
      validateStatus: status => status >= 200 && status < 500,
    })
  }

  // #region Helpers

  /**
   * Sends a POST request using the provided endpoint, with the provided data, to the Cronicle API
   * and returns the response data via the Promise.
   *
   * @param endpoint The API Endpoint to call
   * @param opts An optional object containing additional options to pass to the request.
   */
  private async get<R = BaseResponse>(endpoint: Endpoints, opts?: AxiosRequestConfig): Promise<R> {
    try {
      const { data } = await this.client.get(`/${endpoint}/v1`, opts)

      return data
    } catch (error) {
      console.error(`[Cronicle#get]: Error caught while calling ${endpoint}:`, error)
      throw error
    }
  }

  /**
   * Sends a POST request using the provided endpoint, with the provided data, to the Cronicle API
   * and returns the response data via the Promise.
   *
   * @param endpoint The API Endpoint to call
   * @param opts An optional object containing additional options to pass to the request
   */
  private async post<R = BaseResponse>(
    endpoint: Endpoints,
    data: any,
    opts?: AxiosRequestConfig
  ): Promise<R> {
    try {
      const res = await this.client.post(`/${endpoint}/v1`, data, opts)

      return res.data
    } catch (error) {
      console.error(`[Cronicle#post]: Error caught while calling ${endpoint}:`, error)
      throw error
    }
  }

  // #endregion Helpers

  // #region Endpoints

  /**
   * Gets scheduled events and returns details about them. It supports pagination to fetch chunks,
   * with the default being the first 50 events.
   *
   * @param offset The offset into the data to start returning records, defaults to `0`.
   * @param limit The number of records to return, defaults to `50`.
   */
  public async getSchedule(offset: number = 0, limit: number = 50): Promise<GetScheduleResponse> {
    return this.get<GetScheduleResponse>('get_schedule', { params: { offset, limit } })
  }

  // TODO: Finish implementing this method.
  // public async getFullSchedule() {}

  /**
   * Fetches details about a single event, given its ID or exact title.
   *
   * @param eventFilter The ID or title (case-sensitive) of the event to get.
   */
  public async getEvent(eventFilter: { id?: string; title?: string }): Promise<GetEventResponse> {
    return this.get<GetEventResponse>('get_event', { params: eventFilter })
  }

  /**
   * Creates a new event with the provided values and adds it to the schedule.
   *
   * @param data The details of the event to create.
   */
  public async createEvent(data: CreateEventParams): Promise<CreateEventResponse> {
    return this.post<CreateEventResponse>('create_event', data)
  }

  /**
   * Updates an existing event given its ID, replacing any properties specified.
   *
   * @param data The properties to update on the event.
   */
  public async updateEvent(data: UpdateEventParams): Promise<UpdateEventResponse> {
    return this.post<UpdateEventResponse>('update_event', data)
  }

  /**
   * Deletes an event from the schedule, given its ID.
   *
   * @param id The ID of the event to delete.
   */
  public async deleteEvent(id: string): Promise<DeleteEventResponse> {
    return this.post<DeleteEventResponse>('delete_event', { id })
  }

  /**
   * Gets the event history (i.e. previously completed jobs) for a specific event. The response
   * array is sorted by reverse timestamp (descending), so the latest jobs are listed first.
   *
   * @param params Query params to filter the event history by.
   */
  public async getEventHistory(params: GetEventHistoryParams): Promise<GetEventHistoryResponse> {
    return this.get<GetEventHistoryResponse>('get_event_history', { params })
  }

  // TODO: Finish implementing this method.
  // public async getFullEventHistory(id: string) {}

  /**
   * Gets previously completed jobs for all events. The response array is sorted by reverse
   * timestamp (descending), so the latest jobs are listed first.
   */
  public async getHistory(): Promise<GetHistoryResponse> {
    return this.get<GetHistoryResponse>('get_history')
  }

  // TODO: Finish implementing this method.
  // public async getFullHistory() {}

  /**
   * Immediately starts an on-demand job for an event, regardless of the schedule. This is
   * effectively the same as a user clicking the "Run Now" button in the UI.
   *
   * @param filter The value to use for deciding which event to run.
   * @param data Any extra data to pass to the event.
   */
  public async runEvent(
    filter: { id?: string; title?: string },
    data?: EventData
  ): Promise<RunEventResponse> {
    return this.post('run_event', { ...data, ...filter })
  }

  /**
   * Gets the status for a job that is currently in progress or completed.
   *
   * @param id The ID of the job to get the status for.
   */
  public async getJobStatus(id: string): Promise<GetJobStatusResponse> {
    return this.get<GetJobStatusResponse>('get_job_status', { params: { id } })
  }

  /**
   * Gets the status for all active jobs and returns them all at once.
   */
  public async getActiveJobs(): Promise<GetActiveJobsResponse> {
    return this.get<GetActiveJobsResponse>('get_active_jobs')
  }

  /**
   * Updates a job that is already in progress. Only certain job properties may be changed when the
   * job is running, and those are listed below. This is typically used to adjust timeouts, resource
   * limits, or user notification settings.
   *
   * @param data The properties to update on the job.
   */
  public async updateJob(data: UpdateJobParams): Promise<UpdateJobResponse> {
    return this.post<UpdateJobResponse>('update_job', data)
  }

  /**
   * Aborts a running job given its ID.
   *
   * @param id The ID of the job to abort.
   */
  public async abortJob(id: string): Promise<AbortJobResponse> {
    return this.post<AbortJobResponse>('abort_job', { id })
  }

  /**
   * Gets the current application "state", which contains information like the status of the
   * scheduler (enabled or disabled).
   */
  public async getMasterState(): Promise<GetMasterStateResponse> {
    return this.get<GetMasterStateResponse>('get_master_state')
  }

  /**
   * Updates the master application state, i.e. toggling the scheduler on/off.
   *
   * @param enabled The new state to set the scheduler to.
   */
  public async updateMasterState(enabled: 0 | 1): Promise<UpdateMasterStateResponse> {
    return this.post<UpdateMasterStateResponse>('update_master_state', { enabled })
  }

  // #endregion Endpoints
}

export * from './types/index.js'
