import Header from '../../components/shared/Header'

import Footer from '../../components/shared/Footer'
import React, { Suspense } from 'react'

const layout = ({ children }) => {
  return (
    <div className='w-full h-[100%] relative '>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default layout
