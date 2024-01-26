'use client'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip
} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { getAllEvents } from '../../lib/actions/event.actions'
import { IoCalendar } from 'react-icons/io5'
import { auth, useUser } from '@clerk/nextjs'
import { ThreeDots } from 'react-loader-spinner'
import { useRouter } from 'next/navigation'
import CARD from './Card'
function Collection ({
  data,
  emptyMessage,
  collection_type,
  eventCategory,
  eventId
}) {
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
  const [cards, setCards] = useState([])
  const { user } = useUser()
  const userId = user?.publicMetadata?.userId
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    getAllEvents().then(res => {
      setLoading(false)
      setCards(res)
    })
  }, [])
  const relatedEvents = cards?.filter(
    item => item?.category._id === eventCategory?._id && item._id !== eventId
  )

  return (
    <>
      <div
          className={`lg:px-32 md:px-16 grid  ${
            eventId ? 'lg:grid-cols-3' : 'lg:grid-cols-3'
          } md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-y-4 gap-x-4 my-2 sm:grid-cols-2 grid-cols-1 px-4 `}
        >
        {!loading ? (
          <>
            {collection_type == 'All_Events' ? (
              cards?.length > 0 ? (
                <CARD data={cards} userId={userId} />
              ) : (
                <div className='flex justify-center items-center'>
                  <Typography color='gray' className='font-medium' textGradient>
                    {emptyMessage}
                  </Typography>
                </div>
              )
            ) : relatedEvents?.length > 0 ? (
              <CARD data={relatedEvents} userId={userId} />
            ) : (
              <div className='flex justify-center items-center'>
                <Typography color='gray' className='font-medium' textGradient>
                  {emptyMessage}
                </Typography>
              </div>
            )}
 
          </>
        ) : (
          <>
      <div className='w-full flex justify-center relative left-[150%] px-28'> 
        
      <ThreeDots
              visible={true}
              height='80'
              width='80'
              color='text-blue-700'
              radius='9'
              ariaLabel='three-dots-loading'
              wrapperStyle={{}}
              wrapperClass=''
            />
      </div>
      
          </>
        )}
        </div>
    </>
  )
}

export default Collection
