"use client"

import { MetadataState, useMetadataContext } from "@/lib/providers"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { ApplyImage } from "./ApplyImage"

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
