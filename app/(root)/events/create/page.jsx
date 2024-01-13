import React from 'react'
import { Metadata } from 'next'
import EventForm from '../../../../components/shared/EventForm'
export const metadata = {
  title: 'Blaze Mart | Create-event '
}

function page () {
  return (
    <>
      <div className='w-full h-32 flex items-center justify-center bg-gray-100 '>
        <h1 id='create' className='font-bold text-gray-700  text-3xl'>
          Create Event
        </h1>
      </div>
      <div>
        <EventForm />
      </div>
    </>
  )
}

export default page
