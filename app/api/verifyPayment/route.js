import { NextResponse } from "next/server";
import crypto from "crypto";
import { createOrder } from "../../../lib/actions/order.actions";
import Ticket from "../../database/models/ticketModel";
export async function POST(request) {
  const data = await request.json();

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    eventId,
    buyerId,
    amount,
    orderId,
  } = data;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", 'o2i24QtKki3xOp5zu9z4xn6r')
    .update(body.toString())
    .digest("hex");

  const isSameSignature = expectedSignature === razorpay_signature;

  if (isSameSignature) {
    const order = await Ticket.create({
      event: eventId,
      buyer: buyerId,
      amount: Number(amount / 100),
      order_id: orderId,
    });
    return NextResponse.json({
      message: "Success",
      success: true,
      order: order,
    });
  } else {
    return NextResponse.json({ err: "Failed", success: false });
  }
}
