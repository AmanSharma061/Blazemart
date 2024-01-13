import axios from 'axios'

export const createCategory = async category => {
  try {
    await fetch('/api/category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(category)
    })
  } catch (error) {
    console.log(error)
  }
}

export const getCategories = async () => {
  try {
    const res = await fetch('/api/category', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
