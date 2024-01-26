'use client'
import React from 'react'
import { Metadata } from 'next'
import EventForm from '../../../../components/shared/EventForm'
import { useAuth } from '@clerk/nextjs'

function page () {
  const { userId } = useAuth()
 console.log(userId)
  return (
    <>
      <div className='w-full h-32 lg:h-64 flex items-center justify-center bg-gray-100 '>
        <h1 id='create' className='font-bold text-gray-700  text-3xl lg:text-5xl'>
          Create Event
        </h1>
      </div>
      <div>
        <EventForm type={'Create'} userId={userId} />
      </div>
    </>
  )
}

export default page
