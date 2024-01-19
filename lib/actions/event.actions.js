'use server'
import connectToDatabase from '../../app/database/mongoDb/connectDB'
import User from '../../app/database/models/usermodel'
import Event from '../../app/database/models/eventModel'
import Category from '../../app/database/models/categoryModel'
export const createEvent = async ({ event, userId, path }) => {
  // Create event

  try {
    await connectToDatabase()
    const organizer = await User.findOne({ clerkId: userId })

    if (!organizer) throw new Error('Organizer not found')
    const catId = await Category.findOne({ name: event.category })
    const newEvent = await Event.create({
      ...event,
      category: catId,
      organizer: organizer._id
    })
    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    console.log(error)
  }
}
