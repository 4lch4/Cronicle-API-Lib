export interface JobOutput {
  table: JobOutputTable
  html: JobOutputHTML
  type: string
}

export type JobOutputTable = {
  title?: string
  header?: string[]
  rows?: Array<Array<number | string>>
  caption?: string
}

export interface JobOutputHTML {
  title?: string
  content?: string
  caption?: string
}
