import { NextResponse } from 'next/server'
import connectToDatabase from '../../database/mongoDb/connectDB'
import Category from '../../database/models/categoryModel'

export async function POST (request) {
  try {
    await connectToDatabase()
    const getData = await request.json()
    console.log(getData)
    await Category.create(getData)
    return NextResponse.json(
      { message: 'Ho Gya Save' },
      {
        status: 200
      }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error' },
      {
        status: 500
      }
    )
  }
}
export async function GET (request) {
  try {
    await connectToDatabase()
    const getData = await Category.find({})
    return NextResponse.json(getData, {
      status: 200
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Error' },
      {
        status: 500
      }
    )
  }
}
