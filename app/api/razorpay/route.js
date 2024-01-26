import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
export async function POST(request) {
  const data = await request.json();

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end
  const payment_capture = 1;
  const amount = data.amount;

  const currency = "INR";
  const options = {
    amount: Number(amount),

    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      buyerId: data.buyerId,
      eventId: data.eventId,
    },
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    return NextResponse.json({ message: "Order created", response: response });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Order failed", response: err });
  }
}
