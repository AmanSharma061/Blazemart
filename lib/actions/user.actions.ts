'use server'

import { revalidatePath } from 'next/cache'
import connectToDatabase from '../../app/database/mongoDb/connectDB'
import User from "../../app/database/models/usermodel"
import Order from "../../app/database/models/oderModel"
import Event from "../../app/database/models/eventModel"



import { CreateUserParams, UpdateUserParams } from '../../types/index'

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)
    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    console.log(error)
  }
}

export async function getUserById(userId: string) {
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
}

export async function deleteUser(clerkId: string) {
}