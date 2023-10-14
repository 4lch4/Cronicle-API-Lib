import {
  // BuiltInPlugin,
  // Target
  Cronicle,
} from 'cronicle-api-lib'
import { Endpoints } from './Endpoints.js'
import { logger } from './Shared.js'

const API_URL = process.env.CRONICLE_API_URL
const API_KEY = process.env.CRONICLE_API_KEY

if (!API_URL || !API_KEY) {
  logger.error('Missing environment variables CRONICLE_API_URL or CRONICLE_API_KEY!', {
    CRONICLE_API_URL: API_URL,
    CRONICLE_API_KEY: API_KEY,
  })

  process.exit(1)
}

const lib = new Cronicle(API_URL, API_KEY)
const tester = new Endpoints(lib)

async function wait(seconds: number) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, seconds * 1000)
    } catch (err) {
      reject(err)
    }
  })
}

async function main(): Promise<any> {
  try {
    const starterEvent = await tester.createEvent()

    logger.info(`Successfully created starter event. StarterEvent ID: ${starterEvent.id}`)

    const getEvent = await tester.getEvent(starterEvent.id)
    const updateEvent = await tester.updateEvent(getEvent.id)
    const getUpdatedEvent = await tester.getEvent(getEvent.id)
    const runEvent = await tester.runEvent(getEvent.id)

    logger.info('Waiting 30 seconds before deleting event...')

    await wait(getEvent.params.duration + 10 || 30)

    const deleteEvent = await tester.deleteEvent(getEvent.id)

    return {
      starterEvent,
      getEvent,
      updateEvent,
      getUpdatedEvent,
      runEvent,
      deleteEvent,
    }
  } catch (error) {
    console.error('Error caught:', error)

    return [error]
  }
}

main()
  .then(_res => {
    console.log('Execution completed successfully!')

    // console.log(JSON.stringify(res, null, 2))
  })
  .catch(console.error)
