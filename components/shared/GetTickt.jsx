import Link from 'next/link'
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@material-tailwind/react'
import { OrderCheckout } from '../../lib/actions/order.action'
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
const GetTickt = ({ event,userId }) => {
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      console.log(
        'Order canceled -- continue to shop around and checkout when you’re ready.'
      )
    }
  }, [])
  const isFree = event?.isFree
  const onCheckOut = async e => {
  const order={
    eventTitle:event?.title,
    eventId:event?._id,
    price:event?.price,
    isFree:event?.isFree,
    buyer_id:userId  

  }
    await OrderCheckout(order)
  }
  return (
    <form action={onCheckOut} method='POST'>
      <button
        type='submit'

        className='text-white  bg-red-500 px-4 text-clip py-2  font-semibold  text-xs     flex    w-fit rounded-xl '
      >
        {isFree ? 'Get Ticket' : 'Buy Ticket'}
      </button>
    </form>
  )
}

export default GetTickt
