import { EventData, BuiltInPlugin, Target } from '../shared/index.js'

export type CreateEventParams = EventData & {
  title: string

  enabled: 0 | 1

  category: string

  plugin: string | BuiltInPlugin

  target: string | Target
}
