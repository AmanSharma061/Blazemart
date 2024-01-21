import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography
} from '@material-tailwind/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaEdit } from 'react-icons/fa'

const CARD = ({ data, userId }) => {
  const router = useRouter()
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
<>
      {data?.map((item, index) => {
        return (
          <Card key={index} className='w-70'>
            <CardHeader className='h-44 '>
              <img
                src={item.imageUrl}
                alt='profile-picture'
                className=' h-44 w-full object-cover rounded-t-lg -z-10'
                onClick={() => {
                  router.push(`/events/${item._id}`)
                }}
              />

              <Link
                href={`/events/${item._id}/update`}
                className='absolute right-2 top-2 bg-gray-300/70 rounded-xl px-3 z-20'
              >
                {' '}
                {/* {console.log(item.organizer._id)} */}
                {userId === item.organizer._id.toString() ? (
                  <FaEdit className='h-8 ' />
                ) : null}
              </Link>
            </CardHeader>
            <CardBody>
              <div className='flex gap-x-2 py-2 items-center '>
                <p className='text-green-800 font-bold text-sm box-border py-1  bg-green-500/10 w-fit rounded-xl my-2 px-4'>
                  $ {item.isFree ? 'Free' : item.price}
                </p>
                <p className='text-gray-800 font-semibold text-sm px-4 py-1  bg-gray-500/10 w-fit rounded-xl my-2'>
                  {item?.category?.name}
                </p>
              </div>

              <div className='px-1 '>
                {/* start date time and end date time */}
                <p className='text-gray-800/70 font-semibold  text-xs  py-1 gap-x-4  leading-3  flex justify-around     w-fit rounded-xl '>
                  <span> {formatDateTime(item?.startDateTime).date} </span>{' '}
                  <span> {formatDateTime(item?.startDateTime).time}</span>
                </p>
                <Typography
                  color='gray'
                  className='font-medium capitalize  py-2'
                  textGradient
                >
                  {item.title}
                </Typography>
              </div>

              {/* Organizer and location */}
            </CardBody>
            <CardFooter>
              <Typography
                color='gray'
                className='font-medium text-xs text-gray-900/70'
                textGradient
              >
                {item.organizer.firstName} | {item.organizer.lastName}
              </Typography>
            </CardFooter>
          </Card>
        )
      })}
   </> 
  )
}

export default CARD
