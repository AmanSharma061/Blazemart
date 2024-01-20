'use client'
import { ToastContainer, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { IoCalendar, IoLocation } from 'react-icons/io5'
import { useParams } from 'next/navigation'
import 'react-toastify/dist/ReactToastify.css'
import {
  formatDateTime,
  getEventById
} from '../../../../lib/actions/event.actions'
import Image from 'next/image'
import Link from 'next/link'
const page = () => {
  const params = useParams()

  const [event, setUserData] = useState()

  useEffect(() => {
    getEventById(params.id).then(res => {
      setUserData(res)
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
      <div className='lg:flex lg:ml-44 lg:my-24 items-center justify-center h-full lg:px-8'>
        <Image
          src={event?.imageUrl}
          alt='hero image'
          width={1000}
          height={1000}
          className='h-full lg:w-[30%] object-cover object-center '
        />
        <div className=' px-4  py-2 box-border'>
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
            <p className='text-gray-800 font-semibold  text-xs px-4 py-1 gap-x-4 space-x-4  flex    w-fit rounded-xl '>
                 <Link href={'/'} className='text-white  bg-red-500 px-4 py-2  font-semibold  text-xs     flex    w-fit rounded-xl '>
                  Get Ticket
                </Link>
              </p>
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
    </div>
  )
}

export default page
