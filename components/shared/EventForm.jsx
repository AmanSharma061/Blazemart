'use client'
import * as z from 'zod'
import '@uploadthing/react/styles.css'
import { useForm } from 'react-hook-form'
import { TiAttachmentOutline } from 'react-icons/ti'
import { MdDateRange } from 'react-icons/md'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../ui/button'
import { FaIndianRupeeSign } from 'react-icons/fa6'
import { createEvent } from '../../lib/actions/event.actions'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'

import React, { startTransition, useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Textarea } from '../ui/textarea'
import FileUploader from './FileUploader'
// import { eventFormSchema } from '@/lib/validator'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { Check } from 'lucide-react'
import axios from 'axios'
import { formSchema } from '../../lib/validator'

import {
  createCategory,
  getCategories
} from '../../lib/actions/category.actions'
import { useUploadThing } from '../../lib/uploadthing'
import { useRouter } from 'next/navigation'
function EventForm ({ type, userId }) {
  const [categories, setCategories] = useState([])
  const [newCategory, setNewcategory] = useState('')
  const [files, setFiles] = useState([])

  const { isSignedIn, user, isLoaded } = useUser()
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      imageUrl: '',
      startDateTime: Date.now(),
      endDateTime: Date.now(),
      price: '',
      location: '',
      url: '',
      categoryId: '',
      isfree: false
    }
  })
  const { startUpload } = useUploadThing('imageUploader')
  async function onSubmit (values) {
    let uploadedImageUrl = values.imageUrl
    if (files.length > 0) {
      const uploadedImages = await startUpload(files)

      if (!uploadedImages) {
   toast.error('Error Uploading , Try Again!', {
      position: 'top-center',
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })

        return 
      }
      uploadedImageUrl = uploadedImages[0].url
    }
    if (type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: {
            ...values,
            imageUrl: uploadedImageUrl
          },
          userId,
          path: '/profile'
        })
        form.reset()
        if (newEvent) {
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleAddCategory = useCallback(async () => {
    createCategory({ name: newCategory })
  }, [newCategory, createCategory])

  useEffect(() => {
    const fetchCategories = async () => {
      getCategories().then(res => {
        setCategories(res)
      })
    }
    fetchCategories()
  }, [handleAddCategory])
  return (
    <div className='w-full lg:px-56 py-2 box-border  md:lg-44 sm:px-38'>
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=' grid lg:grid-cols-2 gap-x-4 pr-4 pl-2 gap-y-2'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='Event Title'
                    className=' bg-gray-100 rounded-md'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='categoryId'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select defaultValue=''>
                    <SelectTrigger className='bg-gray-100 rounded-md'>
                      <SelectValue placeholder='Category' />
                    </SelectTrigger>
                    <SelectContent className=''>
                      {categories?.length > 0 &&
                        categories?.map(category => (
                          <SelectItem
                            key={category._id}
                            value={category._id}
                            className='select-item p-regular-14'
                          >
                            {category.name}
                          </SelectItem>
                        ))}

                      <AlertDialog>
                        <AlertDialogTrigger className='text-sm px-8 bg-gray-100 w-full py-2 rounded-md'>
                          Add New Category
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <Input
                            placeholder='Category Name'
                            value={newCategory}
                            onChange={e => setNewcategory(e.target.value)}
                            className=' bg-gray-100 rounded-md'
                          />
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => startTransition(handleAddCategory)}
                            >
                              Add
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={7}
                    placeholder='Description'
                    className=' bg-gray-100 rounded-md'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUploader
                    onFieldChange={field.onChange}
                    setFiles={setFiles}
                    imageUrl={field.value}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='startDateTime'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='bg-gray-100 w-full flex  pr-6   h-10 justify-start px-2 rounded-md  gap-x-2 items-center'>
                    <p>
                      <MdDateRange className='text-xl text-gray-400' />
                    </p>
                    <span className='text-xs'>Start Date :</span>
                    <DatePicker
                      className='w-full bg-gray-100 rounded-md text-sm items-center  text-gray-700 outline-none border-none -z-10'
                      selected={field.value ? new Date(field.value) : null}
                      onChange={date => {
                        field.onChange(date)
                      }}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='Pp'
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='endDateTime'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='bg-gray-100 w-full flex  pr-6   h-10 justify-start px-2 rounded-md  gap-x-2 items-center'>
                    <p>
                      <MdDateRange className='text-xl text-gray-400' />
                    </p>
                    <span className='text-xs'>End Date :</span>
                    <DatePicker
                      className='w-full bg-gray-100 rounded-md text-sm items-center  text-gray-700 outline-none border-none'
                      selected={field.value ? new Date(field.value) : null}
                      onChange={date => {
                        field.onChange(date)
                      }}
                      showTimeSelect
                      timeInputLabel='Time:'
                      dateFormat='Pp'
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='bg-gray-100 w-full flex      h-10 justify-start  rounded-md   items-center'>
                    <div className='flex  items-center  box-border px-2'>
                      <p>
                        <FaIndianRupeeSign className='text-xl text-gray-400 ' />
                      </p>
                    </div>
                    <input
                      type='number'
                      className=' bg-gray-100 outline-none border-none  outline'
                      {...field}
                      placeholder='Price'
                    />
                    <FormField
                      control={form.control}
                      name='isFree'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='bg-gray-100 w-full flex  pr-6    h-10 justify-start px-2 rounded-md my-2 gap-x-2 items-center'>
                              <label htmlFor='isFree' className='text-xs'>
                                Free Ticket
                              </label>

                              <input
                                type='checkbox'
                                id='isFree'
                                className=' bg-gray-100 outline-none border-none'
                                onChange={e => {
                                  field.onChange(e.target.checked)
                                }}
                                // Convert boolean value to string
                              />
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='location'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='bg-gray-100 w-full flex  pr-6   h-10 justify-start px-2 rounded-md  gap-x-2 items-center'>
                    <p>
                      <TiAttachmentOutline className='text-xl text-gray-400' />
                    </p>
                    <input
                      type='text'
                      className='w-full bg-gray-100 text-sm outline-none border-none py-2'
                      placeholder='Location'
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='bg-gray-100 w-full flex  pr-6   h-10 justify-start px-2 rounded-md  gap-x-2 items-center'>
                    <p>
                      <TiAttachmentOutline className='text-xl text-gray-400' />
                    </p>
                    <input
                      type='text'
                      className='w-full bg-gray-100 text-sm outline-none border-none py-2'
                      placeholder='URL'
                      {...field}
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <h2>Submtting</h2>
                <Check className='animate-spin' />
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default EventForm
