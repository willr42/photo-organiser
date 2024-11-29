"use client"

import { MetadataState, useMetadataContext } from "@/lib/providers"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Pencil } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"
import { MetadataForm } from "./MetadataForm"
import { useRouter } from "next/navigation"
import { useState } from "react"
import React from "react"

export function ApplyDisplay({ workingDir }: { workingDir: string }) {
  const [confirm, setConfirm] = useState(false)
  const router = useRouter()
  const { metadata, wipeMetadata } = useMetadataContext()

  if (metadata.length <= 0) {
    return (
      <div className="text-center">
        <p className="mb-2 text-lg font-semibold">
          No metadata to display, add some and come back.
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>
    )
  }

  const handleSubmit = () => {
    const submittingMetadata: MetadataState[] = metadata.map((pic) => {
      return { ...pic, status: "uploading" }
    })
    wipeMetadata(submittingMetadata)
  }

  return (
    <div>
      <div className="grid grid-cols-4 p-6">
        {metadata.map((metadataObj) => (
          <React.Fragment key={metadataObj.path}>
            <ApplyImage
              path={metadataObj.path}
              imageName={metadataObj.path}
              workingDir={workingDir}
              dateStamp={metadataObj.dateStamp}
              status={metadataObj.status}
            />
          </React.Fragment>
        ))}
      </div>
      <div className="mr-20 flex justify-end gap-2">
        {!confirm ? (
          <Button variant="outline" onClick={() => setConfirm(true)}>
            Apply changes?
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button variant="destructive" onClick={handleSubmit}>
              Confirm
            </Button>
            <Button variant="outline" onClick={() => setConfirm(false)}>
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

type ApplyImageProps = MetadataState & { workingDir: string; imageName: string }
function ApplyImage({
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
      stroke-width="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
)
