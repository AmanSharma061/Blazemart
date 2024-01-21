'use client'
import { ToastContainer, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { IoCalendar, IoLocation } from 'react-icons/io5'
import { useParams } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import {
  formatDateTime,
  getAllEvents,
  getEventById
} from '../../../../lib/actions/event.actions'
import Image from 'next/image'
import Link from 'next/link'
import { Typography } from '@material-tailwind/react'
import Collection from '../../../../components/shared/Collection'
import { get } from 'mongoose'
import CheckOut from '../../../../components/shared/CheckOut'

const page = () => {
  const params = useParams()

  const [event, setEvent] = useState()
  const [allEvents, setAllEvents] = useState([])

  useEffect(() => {
    getEventById(params.id).then(res => {
      setEvent(res)
    })
    getAllEvents().then(res => {
      setAllEvents(res)
    })
  }, [])

  function formatDateTime (isoDateTime) {
    const dateTime = new Date(isoDateTime)

    // Get date components
    const year = dateTime.getFullYear()
    const month = String(dateTime.getMonth() + 1).padStart(2, '0')
    const day = String(dateTime.getDate()).padStart(2, '0')

    // Get time components
    const hours = String(dateTime.getHours()).padStart(2, '0')
    const minutes = String(dateTime.getMinutes()).padStart(2, '0')

    // Get day name
    const options = { weekday: 'long' }
    const dayName = dateTime.toLocaleDateString(undefined, options)

    // Get AM/PM
    const ampm = dateTime.toLocaleTimeString([], { hour12: true }).slice(-2)

    // Create formatted date and time string
    const date = `${dayName} , ${day}-${month}-${year}`
    const time = `${hours}:${minutes} ${ampm}`

    return { date, time }
  }

  return (
    <div className='w-full h-[100%] box-border py-3'>
      <div className='lg:mx-32 md:mx-10  md:py-8 lg:px-8 justify-center lg:flex-row flex-col md:flex-row  sm:flex  lg:py-4'>
        <Image
          src={event?.imageUrl}
          alt='hero image'
          width={1000}
          height={800}
          className='h-full lg:py-2 lg:w-[55%] md:w-[60%] 
           md:py-2 object-cover object-center sm:px-8 lg:px-16 my-4'
        />

        <div className=' px-4  py-2 box-border lg:my-4'>
          <h1 className='text-2xl text-red-500 capitalize font-bold px-4 py-2'>
            {event?.title}
          </h1>
          <div className='flex gap-x-2 px-2'>
            <p className='text-green-800 font-bold text-sm box-border py-1  bg-green-500/10 w-fit rounded-xl my-2 px-4'>
              $ {event?.isFree ? 'Free' : event?.price}
            </p>
            <p className='text-gray-800 font-semibold  px-4 py-1  bg-gray-500/10 w-fit rounded-xl my-2'>
              {event?.category?.name}
            </p>
          </div>
          <div className='flex px-4 py-2 text-xs'>
            By : -{' '}
            <p className='text-blue-900 font-semibold px-2'>
              {' '}
              {event?.organizer?.firstName} | {event?.organizer?.lastName}
            </p>
          </div>
          <div className='px-4 py-2'>{/* Get Ticket Button */}</div>

          <div className='flex items-center  px-4 py-1 my-2'>
            <div>
              <IoCalendar className='text-red-500' />
            </div>
            <div className=' '>
              {/* start date time and end date time */}
              <p className='text-gray-800 font-semibold  text-xs px-4 py-1 gap-x-4  leading-3  flex justify-around     w-fit rounded-xl '>
                <span> {formatDateTime(event?.startDateTime).date} </span>{' '}
                <span> {formatDateTime(event?.startDateTime).time}</span>
              </p>

              {/* end date  */}
              <p className='text-gray-800 font-semibold  text-xs px-4 py-1 gap-x-4  leading-3 justify-around    flex    w-fit rounded-xl '>
                <span> {formatDateTime(event?.endDateTime).date} </span>{' '}
                <span> {formatDateTime(event?.endDateTime).time}</span>
              </p>
            </div>
          </div>
          <div className='flex items-center  px-4'>
            <div>
              <IoLocation className='text-red-500' />
            </div>
            <div className=' '>
              <p className='text-gray-800 font-semibold  text-xs px-4 py-1 gap-x-4 space-x-4  flex    w-fit rounded-xl '>
                {event?.location}
              </p>
            </div>
            <div className='text-gray-800 font-semibold  text-xs px-4 py-1 gap-x-4 space-x-4  flex    w-fit rounded-xl '>
             <CheckOut event={event} />
            </div>
          </div>

          <div className='px-4 py-4'>
            <h1 className='py-2 font-bold '>What You'll Learn</h1>
            <p className='text-gray-800 font-semibold  text-xs  py-1  flex    w-fit rounded-xl '>
              {event?.description}
            </p>
            {/* for url */}
            <Link
              href={`${event?.url}`}
              className='text-blue-800 underline font-semibold  text-xs  py-1   flex    w-fit rounded-xl '
            >
              {event?.url}
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:flex lg:mx-32  md:mx-16   h-full lg:px-8 px-8 mt-10 py lg:py-0 lg:mt-0 '>
        <h1 class='mb-4 text-3xl font-extrabold text-gray-900/75 dark:text-white md:text-4xl lg:text-4xl'>
          Related Events
        </h1>
      </div>

      <div className='lg:mx-6 md:mx-4 '>
        <Collection
          collection_type='Related_Events'
          errorMessage='No Related Events Found'
          eventCategory={event?.category}
          eventId={event?._id}
        />
      </div>

      {/* Related Events Collection  using Material Tailwind*/}
    </div>
  )
}

export default page
