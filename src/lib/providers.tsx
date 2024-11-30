"use client"

import { createContext, useContext, useState } from "react"

export type MetadataState = Record<
  string,
  {
    dateStamp: string
    status: "uploading" | "success" | "error" | null
  }
>

export type MetadataItem = MetadataState[string]

type MetadataContext = {
  metadata: MetadataState
  updateMetadata: (path: string, newMetadata: MetadataItem) => void
  wipeMetadata: (newMetadata: MetadataState) => void
}

const MetadataContext = createContext<MetadataContext | undefined>(undefined)

export const MetadataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [metadata, setMetadata] = useState<MetadataState>({})

  const updateMetadata = (path: string, newMetadata: MetadataItem) => {
    setMetadata((prev) => {
      // Key already exists
      return {
        ...prev,
        [path]: newMetadata,
      }
    })
    // TODO: update local storage here
  }

  const wipeMetadata = (newMetadata: MetadataState) => {
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
