import connectToDatabase from "../../database/mongoDb/connectDB";
import Ticket from "../../database/models/ticketModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDatabase();
    const data = await request.json();
    const { userId } = data;
    console.log(userId,"jvbrikwbvguijkrbvgbrkjvg");

    const tickets = await Ticket.find({ buyer: userId }).populate({
      path: "buyer",
      select: "_id ",
      model: "User",
    });

    return NextResponse.json(
      { message: "success", data: tickets },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
