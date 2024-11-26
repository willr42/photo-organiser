"use client"

import { createContext, useContext, useState } from "react"

type MetadataState = {
  [key: string]: string
}

type MetadataContext = {
  metadata: MetadataState
  updateMetadata: (newMetadata: MetadataState) => void
}

const MetadataContext = createContext<MetadataContext | undefined>(undefined)

export const MetadataProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [metadata, setMetadata] = useState<MetadataState>({})

  const updateMetadata = (newMetadata: MetadataState) => {
    setMetadata((prev) => ({ ...prev, ...newMetadata }))
    // Update local storage here
  }

  return (
    <MetadataContext.Provider value={{ metadata, updateMetadata }}>
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
