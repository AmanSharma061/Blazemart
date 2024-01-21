'use client'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React, { useEffect } from 'react'
import GetTickt from './GetTickt'

const CheckOut = ({ event }) => {
  const isEventFinished = new Date(event?.endDateTime) < new Date()
  const { user } = useUser()

  return (
    <div>
      {isEventFinished ? (
        <p className='text-red-500 bg-gray-50 px-2 py-1 rounded-full '>
          No Tickets Available
        </p>
      ) : (
        <>
          <SignedOut>
            <Link
              href={'/sign-in'}
              className='text-white  bg-red-500 px-4 py-2  font-semibold  text-xs     flex    w-fit rounded-xl '
            >
              Get Ticket
            </Link>
          </SignedOut>
          <SignedIn>
            <GetTickt userId={user?.publicMetadata?.userId} event={event} />
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckOut
