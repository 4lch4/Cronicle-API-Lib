import { z } from 'zod'

export const AlgorithmChoice = z.enum([
  'random',
  'round_robin',
  'least_cpu',
  'least_mem',
  'prefer_first',
  'prefer_last',
  'multiplex',
])