"use client"

import { createContext, useContext, useState } from "react"

export type MetadataState = {
  path: string
  dateStamp: string
  status: "uploading" | "success" | "error" | null
}

type MetadataContext = {
  metadata: MetadataState[]
  updateMetadata: (newMetadata: MetadataState) => void
  wipeMetadata: (newMetadata: MetadataState[]) => void
}

const MetadataContext = createContext<MetadataContext | undefined>(undefined)

export const MetadataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [metadata, setMetadata] = useState<MetadataState[]>([])

  const updateMetadata = (newMetadata: MetadataState) => {
    setMetadata((prev) => {
      const noFormerImage = prev.filter(
        (image) => image.path !== newMetadata.path,
      )
      return [...noFormerImage, newMetadata]
    })
    // TODO: update local storage here
  }

  const wipeMetadata = (newMetadata: MetadataState[]) => {
    setMetadata(newMetadata)
  }

  return (
    <MetadataContext.Provider
      value={{ metadata, updateMetadata, wipeMetadata }}
    >
      {children}
    </MetadataContext.Provider>
  )
}

export const useMetadataContext = () => {
  const context = useContext(MetadataContext)
  if (!context) {
    throw new Error("useMetadataContext must be used within a MetadataProvider")
  }
  return context
}
