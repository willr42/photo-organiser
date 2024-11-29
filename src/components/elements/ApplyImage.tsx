"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MetadataState } from "@/lib/providers"
import { Pencil } from "lucide-react"
import React from "react"
import { buttonVariants } from "../ui/button"
import { MetadataForm } from "./MetadataForm"

type ApplyImageProps = MetadataState & { workingDir: string; imageName: string }

export function ApplyImage({
  path,
  workingDir,
  dateStamp,
  imageName,
  status,
}: ApplyImageProps) {
  const takenTimestamp = new Date(dateStamp).toDateString()
  return (
    <Popover key={path}>
      <div className="relative flex flex-col gap-2 rounded-md border border-gray-300">
        {status && (
          <div className="absolute flex size-full flex-col items-center justify-center bg-gray-100 opacity-70">
            {status === "uploading" && <LoadingSpinner />}
          </div>
        )}
        <div className="p-4">
          <span className="text-lg font-bold">{imageName}</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/api/${workingDir}/${path}`} alt=""></img>
          <p>Taken: {takenTimestamp}</p>
          <div>
            <PopoverTrigger className={buttonVariants({ className: "inline" })}>
              Edit <Pencil />
            </PopoverTrigger>
            <PopoverContent>
              <MetadataForm path={path} />
            </PopoverContent>
          </div>
        </div>
      </div>
    </Popover>
  )
}

const LoadingSpinner = () => (
  <svg
    className="-ml-1 mr-3 h-10 w-10 animate-spin text-violet-800"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)
