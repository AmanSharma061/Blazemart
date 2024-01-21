'use server'
import connectToDatabase from '../../app/database/mongoDb/connectDB'
import User from '../../app/database/models/usermodel'
import Event from '../../app/database/models/eventModel'
import Category from '../../app/database/models/categoryModel'
import { revalidatePath } from 'next/cache'
export const createEvent = async ({ event, userId, path }) => {
  // Create event
  console.log(userId)

  try {
    await connectToDatabase()
    const organizer = await User.findOne({ clerkId: userId })

    if (!organizer) throw new Error('Organizer not found')

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: organizer._id
    })
    return JSON.parse(JSON.stringify(newEvent))
  } catch (error) {
    console.log(error)
  }
}
export const updateEvent = async ({ event, userId, path }) => {
  try {
    await connectToDatabase()

    const eventToUpdate = await Event.findById(event._id)

    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    console.log(error)
  }
}

export const getEventById = async eventId => {
  try {
    await connectToDatabase()
    const event = await Event.findOne({ _id: eventId })
      .populate({ path: 'category', model: Category, select: 'name' })
      .populate({
        path: 'organizer',
        model: User,
        select: '_id firstName lastName '
      })
   
    return JSON.parse(JSON.stringify(event))
  } catch (error) {
    console.log(error)
  }
}
export const getAllEvents = async () => {
  try {
    await connectToDatabase()
    const events = await Event.find({})
      .populate({
        path: 'category',
        model: Category,
        select: 'name'
      })
      .populate({
        path: 'organizer',
        model: User,
        select: '_id firstName lastName '
      })

    return JSON.parse(JSON.stringify(events))
  } catch (error) {
    console.log(error)
  }
}

export const getEventsByOrganizer = async organizerId => {
  await connectToDatabase()
  try {
    const events = await Event.find({ organizer: organizerId })
      .populate({
        path: 'category',
        model: Category,
        select: 'name _id'
      })
      .populate({
        path: 'organizer',
        model: User,
        select: '_id firstName lastName '
      })
    // console.log(events)
    return JSON.parse(JSON.stringify(events))
  } catch (error) {
    console.log(error)
  }
}
