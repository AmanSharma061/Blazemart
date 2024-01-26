import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import shortid from "shortid";
export async function POST(request) {
  const data = await request.json();

  const razorpay = new Razorpay({
    key_id: "rzp_test_05PzYBnGlFegWD",
    key_secret: "o2i24QtKki3xOp5zu9z4xn6r",
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
    return NextResponse.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}
