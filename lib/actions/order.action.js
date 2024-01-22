'use server'
import { redirect } from 'next/navigation'
import Stripe from 'stripe'
import connectToDatabase from '../../app/database/mongoDb/connectDB'
import Order from '../../app/database/models/oderModel'

export const OrderCheckout = async order => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  const price = order.isFree ? 0 : Number(order.price) * 100

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: price,
            product_data: {
              name: order.eventTitle
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`
    })

    redirect(session.url)
  } catch (error) {
    throw error
  }
}
export const createOrder = async order => {
  try {
    await connectToDatabase()
    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId
    })
    return JSON.parse(JSON.stringify(newOrder))
  } catch (error) {
    throw error
  }
}