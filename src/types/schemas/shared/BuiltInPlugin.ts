import { z } from 'zod'
export const BuiltInPlugin = z.enum(['testplug', 'urlplug', 'shellplug'])
