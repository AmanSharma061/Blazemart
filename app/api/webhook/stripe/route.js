// server.js
import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '../../../../lib/actions/order.action'

export async function POST (request) {
  const details = await request.body
  const sig = request.headers.get('stripe-signature')
  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event
  try {
    event = Stripe.webhooks.constructEvent(details, sig, endPointSecret)
  } catch (error) {
    console.log(error)
  }

  const eventType = event.type

  if (eventType === 'checkout.session.completed') {
    const { id, amount_total, metadata } = event.data.object

    const order = {
      stripeId: id,
      eventId: metadata?.eventId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      createdAt: Date.now()
    }
    const newOrder = await createOrder(order)
    return NextResponse.ok(newOrder)
  }
}
