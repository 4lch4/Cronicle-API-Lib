import {
  // BuiltInPlugin,
  // Target
  Cronicle,
} from 'cronicle-api-lib'
// import { z } from 'zod'
import { EndpointTests } from './Endpoints.js'

const API_URL = process.env.CRONICLE_API_URL
const API_KEY = process.env.CRONICLE_API_KEY

export const TEST_EVENT_ID = 'elnnsnmli2f'

if (!API_URL || !API_KEY) {
  console.error('Missing environment variables CRONICLE_API_URL or CRONICLE_API_KEY')
  process.exit(1)
}

const lib = new Cronicle(API_URL, API_KEY)
const tester = new EndpointTests(lib)

async function main(): Promise<any> {
  try {
    const starterEvent = await tester.createEvent()

    if (starterEvent?.id) {
      const getEvent = await tester.getEvent(starterEvent.id)
      const updateEvent = await tester.updateEvent(starterEvent.id)
      const getUpdatedEvent = await tester.getEvent(starterEvent.id)
      const runEvent = await tester.runEvent(starterEvent.id)

      return {
        starterEvent,
        getEvent,
        updateEvent,
        getUpdatedEvent,
        runEvent,
      }
    } else {
      console.error('Failed to create starter event.')
      console.error(starterEvent)
    }

    // const schedule = await lib.getSchedule()

    // const getEventAlpha = await lib.getEvent({ id: TEST_EVENT_ID })

    // const updateEvent = await lib.updateEvent({
    //   id: TEST_EVENT_ID,
    //   title: 'Test Event 3',
    // })

    // const getEventBeta = await lib.getEvent({ id: TEST_EVENT_ID })

    const createEvent = await tester.createEvent()

    if (createEvent.id) {
      const getEvent = await lib.getEvent({ id: createEvent.id })

      return {
        createEvent,
        getEvent,
      }
    }

    return {
      // getEventAlpha,
      // updateEvent,
      // getEventBeta,
      createEvent,
      // schedule,
    }
  } catch (error) {
    console.error('Error caught:', error)

    return [error]
  }
}

main()
  .then(res => {
    console.log('Execution completed successfully!')

    console.log(JSON.stringify(res, null, 2))
  })
  .catch(console.error)
