import React from 'react'

function Footer () {
  return (
    <div className='lg:grid-cols-2 grid mg:grid-cols-2 sm::grid-cols-2 grid-cols-1 bg-gray-50 -z-20 items-center py-4 bottom-0 relative  '>
      <div className='flex justify-center lg:justify-start lg:pl-36 md:px-24 md:justify-start'>
        <img src='/logo.png' alt='logo' className='h-8 w-30 ' />
      </div>
      <div className='flex justify-center lg:justify-end md:justify-end lg:px-32 md:px-20 '>
        <h3 className='text-xs font-bold items-center'>
          Copyright &copy; 2024 Blaze Mart All Rights Reserverd
        </h3>
      </div>
    </div>
  )
}

export default Footer
