import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const convertFileToUrl = function(file) {
  return URL.createObjectURL(file);
};
export function formatDateTime (isoDateTime) {
  const dateTime = new Date(isoDateTime)

  // Get date components
  const year = dateTime.getFullYear()
  const month = String(dateTime.getMonth() + 1).padStart(2, '0')
  const day = String(dateTime.getDate()).padStart(2, '0')

  // Get time components
  const hours = String(dateTime.getHours()).padStart(2, '0')
  const minutes = String(dateTime.getMinutes()).padStart(2, '0')

  // Get day name
  const options = { weekday: 'long' }
  const dayName = dateTime.toLocaleDateString(undefined, options)

  // Get AM/PM
  const ampm = dateTime.toLocaleTimeString([], { hour12: true }).slice(-2)

  // Create formatted date and time string
  const date = `${dayName} , ${day}-${month}-${year}`
  const time = `${hours}:${minutes} ${ampm}`

  return { date, time }
}