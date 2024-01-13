"use client"

import React, { useEffect } from 'react'

import Card from '../../components/shared/Card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select'
import { Input } from '../../components/ui/input'
import { getCategories } from '../../lib/actions/category.actions'
// import connectToDatabase from '../../lib/database/connection'
function page() {
    useEffect(() => {
        getCategories().then((res) => {
            setCategories(res)
        })
    }, [])

    const [categories, setCategories] = React.useState([])
 
    return (
        <>
            <div className='w-full h-full box-border grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 grid-cols-1  py-6 '>
                <section className=' lg:ml-32 lg:mt-24  my-4 mx-2 lg:my-24 px-4 lg:px-0 md:px-16 '>
                    <h1 className='text-4xl lg:text-5xl font-extrabold  lg:leading-[60px] font-Play'>
                        {' '}
                        Host Your Events with us{' '}
                        <span className='lg:py-2 md:py-2 lg:leading-[50px]'>
                            Your Events : Our Platform
                        </span>{' '}
                    </h1>
                    <p className='lg:py-3 md:py-3 leading-5 font-sans font-medium text-sm py-2'>
                        Book and learn helpful tips from 3,168+ mentors in world-class
                        companies with our global community.
                    </p>
                    <a href='#cc'>
                        <button className='w-[100%] box-border  md:w-fit lg:w-fit sm:w-fit '>
                            <h1 className='bg-[#5d34ff] px-4 lg:py-3 lg:px-6 py-2 md:rounded-2xl  sm:rounded-2xl lg:rounded-full rounded-lg text-gray-100 lg:text-xs lg:font-semibold md:text-base text-sm '>
                                Explore Now
                            </h1>
                        </button>
                    </a>
                </section>

                <section className='  lg:mt-10  lg:px-16 lg:justify-center lg:flex px-6 my-2 lg:my-24  rounded-md w-full sm:justify-center  md:justify md:flex   sm:flex'>
                    <img
                        src='./hero.png'
                        alt='hero'
                        className='rounded-xl lg:w-[65%] md:w-[65%]  sm:w-[65%] w-[90%] mx-auto  lg:mx-1   '
                    />
                </section>
            </div>

            <h1
                className=' lg:px-32 lg:text-5xl  font-bold font-sans text-gray-700 px-8 text-4xl md:px-16 sm:px-8 '
                id='cc'
            >
                Events
            </h1>

            {/* Search ane Category Filter */}
            <div className='  box-border lg:flex grid md:grid-cols-2  sm:grid-cols-1 lg:justify-between lg:px-28  w-full pt-4 gap-x-2 text-gray-500 space-y-2'>
                <div className='lg:w-1/2 lg:pl-4 lg:pr-0  w-full  md:px-16 sm:px-16 md:py-2 px-6  '>
                    <Input
                        type='text'
                        placeholder='Search Events '
                        className='w-full rounded-xl bg-gray-100 outline-none border-none'
                    />
                </div>
                <div className=' lg:w-1/2 box-border px-6'>
                    <Select >
                        <SelectTrigger className="w-full rounded-xl bg-gray-100 outline-none border-none ">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categories</SelectLabel>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.name}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                     
                             
                            </SelectGroup>


                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card />
        </>
    )
}

export default page
