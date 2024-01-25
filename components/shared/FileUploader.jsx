'use client'
import '@uploadthing/react/styles.css'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

import { useDropzone } from '@uploadthing/react/hooks'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { generateClientDropzoneAccept } from 'uploadthing/client'
import { convertFileToUrl } from '../../lib/utils'
import { Button } from '../ui/button'
import DatePicker from "react-datepicker";




export function FileUploader ({ setFiles, onFieldChange, imageUrl }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles)
    onFieldChange(convertFileToUrl(acceptedFiles[0]))

  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*' ? generateClientDropzoneAccept(['image/*']) : undefined
  })

  return (
    <div
      {...getRootProps()}
      className='h-40 bg-gray-100 flex items-end justify-center rounded-md'
    >
      <input {...getInputProps()} />
      <div className=' '>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt='preview'
            className='w-full h-40 rounded-md object-cover'
          />
        ) : (
          <div className='w-full h-40 bg-gray-100 rounded-md items-center justify-center flex-col flex  '>
            <p className='flex items-center  justify-center  w-full  '>
              <FaCloudUploadAlt className="text-4xl  text-gray-400" />
            </p>
            <h1 className='text-gray-400'>Drag files here!</h1>
            <p className='text-xs flex justify-center text-gray-400'>
              SVG, PNG, JPG{' '}
            </p>
          <p className='pt-2'>
          <Button className='bg-blue-500   rounded-full text-xs ' onClick={(e)=>e.preventDefault()} size={'lg'}> Select from device</Button>
          </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUploader
