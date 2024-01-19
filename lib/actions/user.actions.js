'use server'
import User from '../../app/database/models/usermodel.js'
import connectToDatabase from '../../app/database/mongoDb/connectDB.js'
export const createUser = async user => {
  try {
    await connectToDatabase()
    const newUser = await User.create(user)

    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.log('Error connecting to database', error)
  }
}
