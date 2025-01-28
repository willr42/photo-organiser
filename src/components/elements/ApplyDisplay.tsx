"use client"

import {
  MetadataItem,
  MetadataState,
  useMetadataContext,
} from "@/lib/providers"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { ApplyImage } from "./ApplyImage"

export function ApplyDisplay({ workingDir }: { workingDir: string }) {
  const [confirm, setConfirm] = useState(false)
  const router = useRouter()
  const { metadata, updateMetadata, wipeMetadata } = useMetadataContext()

  const metadataArr = Object.entries(metadata)

  if (metadataArr.length <= 0) {
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

  const handleSubmit = async () => {
    const submittingMetadata: MetadataState = {}
    for (const metadata of metadataArr) {
      submittingMetadata[metadata[0]] = {
        dateStamp: metadata[1].dateStamp,
        status: "uploading",
      }
    }

    wipeMetadata(submittingMetadata)

    const submittingArr = Object.entries(submittingMetadata)
    for (const metadata of submittingArr) {
      const path = metadata[0]
      const patchUrl = `/api/${path}`
      //   //TODO: write backend func
      try {
        await fetch(patchUrl, {
          method: "PATCH",
          body: JSON.stringify({ date: metadata[1].dateStamp, filepath: path }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        const successfulMetadata: MetadataItem = {
          dateStamp: metadata[1].dateStamp,
          status: "success",
        }
        updateMetadata(path, successfulMetadata)
      } catch (error) {
        console.error("Error updating metadata: ", error)
        // Is there a way to only retry the ones that failed?
      }
    }
    // // Fire off a fetch PATCH for each item in metadata
    // // How do I do that in a way where I can update the individual items in the state?
  }

  return (
    <div>
      <div className="grid grid-cols-4 p-6">
        {metadataArr.map(([path, metadataObj]) => (
          <React.Fragment key={path}>
            <ApplyImage
              path={path}
              imageName={path}
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
