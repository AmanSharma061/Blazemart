'use client'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import 'react-toastify/dist/ReactToastify.css';

import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'

const CheckOutButton = ({ event }) => {
  const { user } = useUser()
  const UserId = user?.publicMetadata.userId
  const router = useRouter()
  const Email = user?.emailAddresses[0].emailAddress
  const Name = user?.firstName + ' ' + user?.lastName

  const checkOutHandler = async () => {
    if (event?.isFree) {
      const res = await fetch('/api/freeTicket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventId: event?._id,
          buyerId: event?.organizer._id,
          userId: UserId
        })
      })
      const data = await (res ? res.json() : null)
      if (data.message) {
        toast.success('Ticket Booked Successfully', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        })
        const waiting = setTimeout(() => {
          router.push('/profile')
        }, 800)
        return () => clearTimeout(waiting)
      } else {
        return alert('Ticket Booking Failed')
      }

      return
    }
    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: event.isFree ? 0 : event?.price * 100,
          eventId: event?._id,
          buyerId: UserId
        })
      })

      const data = await (response ? response.json() : null)

      var options = {
        key: 'rzp_test_05PzYBnGlFegWD',
        name: event?.title,
        currency: data?.response.currency,
        amount: data?.response.amount,
        order_id: data.response.id,
        buyerId: UserId,

        eventId: data.response.notes[1],
        description: 'Thankyou for your test donation',

        image: event?.imageUrl,
        handler: async function (response) {
          const data = await fetch('/api/verifyPayment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_payment_id: response?.razorpay_payment_id,
              razorpay_order_id: response?.razorpay_order_id,
              razorpay_signature: response?.razorpay_signature,
              eventId: event?._id,
              buyerId: UserId,
              amount: event?.isFree ? 0 : event?.price * 100,
              orderId: this.order_id
            })
          })
          const res = await data.json()

          if (res.message) {
            toast.success('Payment Successful', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            })
            const waiting = setTimeout(() => {
              router.push('/profile')
            }, 800)
            return () => clearTimeout(waiting)
          } else {
            return toast.error('Payment Failed', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            })
          }
        },
        UserDetails: {
          name: Name,
          email: Email,
          userId: user?.publicMetadata.userId
        }
      }
      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ToastContainer />
      <SignedOut>
        <Link
          href='/sign-in'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          {event?.isFree ? 'Get Ticket' : 'Buy Ticket'}
        </Link>
      </SignedOut>

      <SignedIn>
        {event?.organizer._id === user?.publicMetadata?.userId ? (
          <></>
        ) : (
          <>
            <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-8 rounded'>
              {event?.isFree ? (
                <>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  rounded'
                    onClick={() => checkOutHandler()}
                  >
                    Get Ticket
                  </button>
                </>
              ) : (
                <>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => checkOutHandler()}
                  >
                    Buy Ticket
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </SignedIn>
    </div>
  )
}

export default CheckOutButton
