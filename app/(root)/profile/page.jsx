'use client'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import {
  getAllEvents,
  getEventsByOrganizer
} from '../../../lib/actions/event.actions'
import CARD from '../../../components/shared/Card'
const page = () => {
  const { user } = useUser()
  const userId = user?.publicMetadata.userId
  const [events, setEvents] = React.useState([])
  const getter = async () => {
    const events = await getAllEvents()
    setEvents(events)
    console.log(events)
  }
  useEffect(() => {
    getter()
  }, [])
  const createdEvents = events.filter(event => event.organizer._id === userId)

  return (
    <>
      <div className='lg:mx-32 px-16  bg-gray-100 lg:py-8 flex items-center justify-between '>
        <h1 class='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-4xl dark:text-white'>
          Your Tickets
        </h1>
        {/* Explore more Events */}
        <Link href='/'>
          <p className='bg-[#5d34ff] px-4 lg:py-3 lg:px-6 py-2 md:rounded-2xl  sm:rounded-2xl lg:rounded-full rounded-lg text-gray-100 lg:text-xs lg:font-semibold md:text-base text-sm '>
            Explore more Events
          </p>
        </Link>
      </div>

      <div className='lg:mx-32 lg:px-16  sm:px-16 px-16  bg-gray-100 lg:py-8 flex items-center justify-between py-4'>
        <h1 class=' lg:text-4xl font-extrabold leading-none tracking-tight text-gray-700 md:text-3xl md:px-14 sm:text-xl text-xl  dark:text-white'>
          Events Organized
        </h1>
        {/* Explore more Events */}

        <Link href='/events/create'>
          <p className='bg-[#5d34ff] px-4 lg:py-3 lg:px-6 py-2 md:rounded-2xl  sm:rounded-2xl lg:rounded-full rounded-full text-gray-100 lg:text-xs lg:font-semibold  text-sm sm:text-xs hidden lg:block md:block md:text-xs '>
            Create New Event
          </p>
          <MdAdd className='text-4xl text-gray-100 bg-[#5d34ff] px-2 py-2 rounded-full lg:hidden md:hidden' />
        </Link>
      </div>
      <div className='grid lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:mx-8 mx-8 lg:mx-32 my-4 md:mx-16 gap-x-4 gap-y-4'>
        {createdEvents.length > 0 ? (
          <CARD data={createdEvents} userId={userId} />
        ) : (
          <h1 className='text-center text-2xl font-semibold text-gray-500 flex flex-col lg:flex-row gap-y-4'>
            <span>No Events Created Yet</span>
            <span className='bg-[#5d34ff] px-4 lg:py-3 lg:px-6 py-2 md:rounded-2xl  sm:rounded-2xl lg:rounded-full rounded-full text-gray-100 lg:text-xs lg:font-semibold md:text-base text-sm sm:text-xs'>
              Create New Event
            </span>
          </h1>
        )}
      </div>
    </>
  )
}

export default page
