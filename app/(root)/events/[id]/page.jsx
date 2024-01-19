'use client'
import { ToastContainer, toast } from 'react-toastify'
import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'

const page = () => {
  useEffect(() => {
    toast.success('Event Successfully created !', {
      position: 'top-center',
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }, [])
  return (
    <div>
      <ToastContainer />
      hqloo g
    </div>
  )
}

export default page
