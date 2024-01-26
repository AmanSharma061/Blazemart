'use client'
import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { getAllEvents, getAllTickets } from '../../../lib/actions/event.actions'
import CARD from '../../../components/shared/Card'
import {
  Card,
  CardBody,
  CardHeader,
  Typography
} from '@material-tailwind/react'
import { formatDateTime } from '../../../lib/utils'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()
  const { user } = useUser()
  const userId = user?.publicMetadata.userId

  const [events, setEvents] = React.useState([])
  const [tickets, setTickets] = React.useState([])
  const getter = async () => {
    const events = await getAllEvents()
    setEvents(events)
  }

  const orderFetcher = async () => {
    const tickets = await getAllTickets()

    setTickets(tickets)
  }
  useEffect(() => {
    getter()
    orderFetcher()
  }, [userId])

  const createdEvents = events?.filter(event => event.organizer._id === userId)

  const OrderEvent = tickets
    ?.filter(ticket => ticket?.buyer._id === userId)
    .map(ticket => ticket.event)

  return (
    <>
      <div className='lg:mx-32 px-14 my-4 py-8 bg-gray-100 lg:py-8 flex items-center justify-between gap-x-1 '>
        <h1 class='mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-4xl dark:text-white'>
          Your Tickets
        </h1>

        <Link href='/'>
          <p className='bg-[#5d34ff] px-4 lg:py-3 lg:px-6 py-2 md:rounded-2xl   sm:rounded-2xl lg:rounded-full rounded-full text-gray-100 lg:text-xs lg:font-semibold md:text-sm text-xs '>
            Explore more Events
          </p>
        </Link>
      </div>
      <div className='grid lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:mx-8 mx-8 lg:mx-32 my-4 md:mx-16 gap-x-4 gap-y-4'>
        {OrderEvent?.length > 0 ? (
          OrderEvent?.map((item, index) => (
            <Card key={index} className='w-70  pointer-events-auto z-10'>
              <CardHeader className='h-44 '>
                <img
                  src={item.imageUrl}
                  alt='profile-picture'
                  className='h-44 w-full object-cover rounded-t-lg'
                  onClick={() => {
                    router.push(`/events/${item._id}`)
                  }}
                />
              </CardHeader>
              <CardBody>
                <div className='flex  gap-y-2  gap-x-4 items-center py-2'>
                  <p className='text-green-800 font-bold text-sm bg-green-500/10 rounded-xl px-4'>
                    {item.isFree ? 'Free' : `$${item.price}`}
                  </p>
                  <p className='text-gray-800/70 font-semibold text-xs py-1'>
                    {formatDateTime(item?.startDateTime).date} |{' '}
                    {formatDateTime(item?.startDateTime).time}
                  </p>
                </div>

                <div className='px-2'>
                  <Typography
                    color='gray'
                    className='font-medium capitalize py-2'
                    textGradient
                  >
                    {item.title}
                  </Typography>
                </div>
              </CardBody>
            </Card>
          ))
        ) : (
          <h1 className='text-center text-2xl font-semibold text-gray-500 flex  justify-center lg:flex-row gap-y-4 '>
            <span>No Tickets Bought Yet</span>
          </h1>
        )}
      </div>
      <div className='lg:mx-32 lg:px-16  sm:px-16 px-16  bg-gray-100 lg:py-8 flex items-center justify-between py-4'>
        <h1 class=' text-2xl font-extrabold leading-none tracking-tight text-gray-700 md:text-5xl lg:text-4xl dark:text-white'>
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
      <div className='grid lg:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 sm:mx-8 mx-8 lg:mx-32 my-4 md:mx-16 gap-x-4 gap-y-4'>
        {createdEvents?.length > 0 ? (
          <CARD data={createdEvents} userId={userId} />
        ) : (
          <h1 className='text-center text-2xl font-semibold text-gray-500 flex  justify-center lg:flex-row gap-y-4 '>
            <span>No Event Created Yet</span>
          </h1>
        )}
      </div>
    </>
  )
}

export default page
