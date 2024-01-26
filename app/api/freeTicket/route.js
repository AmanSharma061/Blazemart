import { NextResponse } from "next/server";
import connectToDatabase from "../../database/mongoDb/connectDB";
import Ticket from "../../database/models/ticketModel";

export async function POST(request) {
  try {
    await connectToDatabase();
    const data = await request.json();


    const order = await Ticket.create({
      buyer: data.userId,
      event: data.eventId,
      amount: 0,
    });

    return NextResponse.json({ message: "success", order: order });
  } catch (error) {
     return NextResponse.json({ error: "error", error: error });
  }
}
