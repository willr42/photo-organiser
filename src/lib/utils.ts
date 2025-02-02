import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isoToExif(isoDateString: string) {
  // Create a Date object from the ISO string
  const date = new Date(isoDateString)

  // Extract the date components
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0") // Months are 0-based
  const day = String(date.getUTCDate()).padStart(2, "0")
  const hours = String(date.getUTCHours()).padStart(2, "0")
  const minutes = String(date.getUTCMinutes()).padStart(2, "0")
  const seconds = String(date.getUTCSeconds()).padStart(2, "0")

  // Format and return the EXIF-compatible timestamp
  return `${year}:${month}:${day} ${hours}:${minutes}:${seconds}`
}
