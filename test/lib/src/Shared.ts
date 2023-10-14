// #region Logger

import { WinstonTransport } from '@axiomhq/winston'
import { arch, platform } from 'os'
import Winston, { transports as WinstonTransports } from 'winston'

const transports: Winston.transport[] = [
  new WinstonTransports.Console({
    format: Winston.format.combine(
      Winston.format.colorize({ colors: { success: 'green', info: 'gray' } }),
      Winston.format.simple()
    ),
  }),
]

// Ensure that we only log to Axiom if all required environment variables are set.
if (process.env.AXIOM_DATA_SET && process.env.AXIOM_TOKEN && process.env.AXIOM_ORG_ID) {
  console.log('Pushing Axiom transport...')
  transports.push(
    new WinstonTransport({
      dataset: process.env.AXIOM_DATA_SET,
      token: process.env.AXIOM_TOKEN,
      orgId: process.env.AXIOM_ORG_ID,
    })
  )
}

export const logger = Winston.createLogger({
  defaultMeta: {
    service: process.env.JOB_NAME || 'cronicle-api-lib-tester',
    nodeEnv: process.env.NODE_ENV || 'development',
    hostname: process.env.HOSTNAME || 'localhost',
    arch: arch(),
    platform: platform(),
  },
  level: process.env.LOG_LEVEL || process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  levels: { ...Winston.config.npm.levels, success: -1 },
  transports,
})

// #endregion Logger

// #region Constants

import { Timezone } from 'cronicle-api-lib'

/** An enum that represents the categories available to Events. */
export enum EventCategory {
  /** The Built-In default category of `General`. */
  General = 'general',

  /** A custom Category for Events related to my work at **Liatrio**. */
  Liatrio = 'clmdmaq4901',

  /** A custom Category for Events related to any form of testing. */
  Testing = 'clnp127gjnq',
}

/** The ID for the `Testing` category in Cronicle. */
export const TESTING_EVENT_CATEGORY: EventCategory = EventCategory.Testing

/** The default Timezone to use for all operations. */
export const DEFAULT_TIMEZONE: Timezone = 'US/Central'

// #endregion Constants

// #region Utility

export function pickRandom(choices: any[]) {
  return choices[Math.floor(Math.random() * choices.length)]
}

// #endregion Utility
