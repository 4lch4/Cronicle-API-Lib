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
   *
   * @returns The response data from the API request.
   */
  private async get<R = BaseResponse>(endpoint: Endpoints, opts?: AxiosRequestConfig): Promise<R> {
    try {
      const { data } = await this.client.get(`/${endpoint}/v1`, opts)

      return data
    } catch (error) {
      console.error(`[Cronicle#GET]: Error caught while calling ${endpoint}:`, error)
      throw error
    }
  }

  /**
   * Sends a POST request using the provided endpoint, with the provided data, to the Cronicle API
   * and returns the response data via the Promise.
   *
   * @param endpoint The API Endpoint to call
   * @param opts An optional object containing additional options to pass to the request
   *
   * @returns The response data from the API
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
      console.error(`[Cronicle#POST]: Error caught while calling ${endpoint}:`, error)
      throw error
    }
  }

  /**
   * Has to support the following methods:
   *
   * - `get_schedule`
   * - `get_event_history`
   * - `get_history`
   */
  public async getAllPages(endpoint: 'get_schedule' | 'get_event_history' | 'get_history') {
    switch (endpoint) {
      case 'get_schedule': {
        break
      }

      case 'get_event_history': {
        break
      }

      case 'get_history': {
        break
      }
    }
  }

  // #endregion Helpers

  // #region Endpoints

  public async getSchedule(offset: number = 0, limit: number = 50): Promise<GetScheduleResponse> {
    return this.get<GetScheduleResponse>('get_schedule', { params: { offset, limit } })
  }

  // TODO: Finish implementing this method.
  // public async getFullSchedule() {}

  /**
   * Fetches details about a single event, given its ID or exact title.
   *
   * @param eventFilter The ID or title (case-sensitive) of the event to get.
   *
   * @returns The response data from the API.
   */
  public async getEvent(eventFilter: { id?: string; title?: string }): Promise<GetEventResponse> {
    return this.get<GetEventResponse>('get_event', { params: eventFilter })
  }

  public async createEvent(data: CreateEventParams): Promise<CreateEventResponse> {
    return this.post<CreateEventResponse>('create_event', data)
  }

  public async updateEvent(data: UpdateEventParams): Promise<UpdateEventResponse> {
    return this.post<UpdateEventResponse>('update_event', data)
  }

  public async deleteEvent(id: string): Promise<DeleteEventResponse> {
    return this.post<DeleteEventResponse>('delete_event', { id })
  }

  public async getEventHistory(params: GetEventHistoryParams): Promise<GetEventHistoryResponse> {
    return this.get<GetEventHistoryResponse>('get_event_history', { params })
  }

  // TODO: Finish implementing this method.
  // public async getFullEventHistory(id: string) {}

  public async getHistory(): Promise<GetHistoryResponse> {
    return this.get<GetHistoryResponse>('get_history')
  }

  // TODO: Finish implementing this method.
  // public async getFullHistory() {}

  public async runEvent(eventFilter: number | string, data?: EventData): Promise<RunEventResponse> {
    const filter = typeof eventFilter === 'number' ? { id: eventFilter } : { title: eventFilter }

    return this.post('run_event', { ...data, ...filter })
  }

  public async getJobStatus(id: string): Promise<GetJobStatusResponse> {
    return this.get<GetJobStatusResponse>('get_job_status', { params: { id } })
  }

  public async getActiveJobs(): Promise<GetActiveJobsResponse> {
    return this.get<GetActiveJobsResponse>('get_active_jobs')
  }

  public async updateJob(data: UpdateJobParams): Promise<UpdateJobResponse> {
    return this.post<UpdateJobResponse>('update_job', data)
  }

  public async abortJob(id: string): Promise<AbortJobResponse> {
    return this.post<AbortJobResponse>('abort_job', { id })
  }

  public async getMasterState(): Promise<GetMasterStateResponse> {
    return this.get<GetMasterStateResponse>('get_master_state')
  }

  public async updateMasterState(enabled: 0 | 1): Promise<UpdateMasterStateResponse> {
    return this.post<UpdateMasterStateResponse>('update_master_state', { enabled })
  }

  // #endregion Endpoints
}

export * from './types/index.js'
