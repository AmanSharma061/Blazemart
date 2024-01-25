// import Order from "../../app/database/models/orders.model";
import Ticket from "../../app/database/models/ticketModel";
import connectToDatabase from "../../app/database/mongoDb/connectDB";
export const createOrder = async (eventId, buyerId, amount, orderId) => {
  try {
    await connectToDatabase();
    const order = await Ticket.create({
      event: eventId,
      user: buyerId,
      Amount: Number(amount / 100),
      order_id: orderId,
    }).populate();
    return order;
  } catch (error) {
    console.log(error);
  }
};

