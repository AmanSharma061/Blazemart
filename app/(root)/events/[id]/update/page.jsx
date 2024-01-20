import React from 'react'

import EventForm from '../../../../../components/shared/EventForm'
import { auth } from '@clerk/nextjs'
import { getEventById } from '../../../../../lib/actions/event.actions'

async function UpdateEvent ({ params: { id } }) {
  const { sessionClaims } = auth()

  const event = await getEventById(id)

  const userId = event.organizer._id

  const eventId = event._id
  return (
    <>
      <div className='w-full h-32 flex items-center justify-center bg-gray-100 '>
        <h1 id='create' className='font-bold text-gray-700  text-3xl'>
          Update Event
        </h1>
      </div>
      <div>
        <EventForm
          type={'Update'}
          userId={userId}
          event={event}
          eventId={eventId}
        />
      </div>
    </>
  )
}

export default UpdateEvent
