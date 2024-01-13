"use client"
import React from 'react'

function Card() {

    const card = () => {
        return (
            <>
                <div className=' shadow-md overflow-y-hidden    lg:mx-6 mb-6 bg-gray-50 rounded-xl box-border  sm:mx-1 sm:grid-cols-1 md:mx-2' >
                    <div className=''>
                        <img src="./hero.jpg" alt="" className='rounded-t-xl'/>
                    </div>
                    <div className='  box-border font-sans px-4  '>
                        <h1 className='font-extrabold pt-2 text-wrap text-[#f95a76] whitespace-pre-'>Yo Yo Honey Singh's Concert</h1>
                        <p className='py-2 text-justify gap-0 text-[#181349] font-sans font-medium text-[14px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ducimus voluptate modi sapiente, voluptas expedita eos necessitatibus</p>
                    </div>
                    <div className='flex justify-between items-center  pb-1 px-4'>
                        <h2 className='font-extrabold font-sans text-gray-700'>
                            Venue
                        </h2>
                        <p className='font-bold text-[11px] col-span-3   text-gray-700'>
                            Gulshan Ground , Gandhi Nagar , Jammu
                        </p>
                    </div>
                    <div className='flex justify-between items-center    text-gray-700 px-4'>
                        <h2 className='font-extrabold font-sans  text-gray-700'>
                            Date
                        </h2>
                        <p className='font-bold text-[11px] col-span-3   text-gray-700'>
                            08-01-2024
                        </p>
                    </div>
                    <div className='flex justify-between items-center   text-gray-700 px-4 pb-4'>
                        <h2 className='font-extrabold font-sans  text-gray-700'>
                            Timing
                        </h2>
                        <p className='font-bold text-[11px] col-span-3   text-gray-700'>
                            16:00 P.M.
                        </p>
                    </div>

                </div>

            </>
        )
    }
    return (
        <>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 md:mx-2 lg:px-24 md:px-16 px-6 py-4 '>

                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}
                {card()}

            </div>
        </>
    )
}

export default Card
