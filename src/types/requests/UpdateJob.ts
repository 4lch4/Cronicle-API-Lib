export type UpdateJobParams = {
  id: string
  timeout?: number
  retries?: number
  retry_delay?: number
  chain?: string
  chain_error?: string
  notify_success?: string
  notify_fail?: string
  web_hook?: string
  cpu_limit?: number
  cpu_sustain?: number
  memory_limit?: number
  memory_sustain?: number
  log_max_size?: number
}
