"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MetadataForm } from "./MetadataForm"

type Props = {
  front: string
  back: string | false
  metadata?: string
}

export function PhotoDisplay({ front, back, metadata }: Props) {
  const [activePhoto, setActivePhoto] = useState(front)
  const filename = front.split("/").pop()
  return (
    <main className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">Image display</h1>
        {back && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setActivePhoto(back)}>
              Back
            </Button>
            <Button variant="outline" onClick={() => setActivePhoto(front)}>
              Front
            </Button>
          </div>
        )}
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api${activePhoto}`}
            alt="Image"
            className="min-h-[500px] w-full max-w-96 bg-gray-100"
          />
          <figcaption className="mt-2 flex flex-col">
            <span className="text-lg font-semibold">Path</span>
            {filename}
          </figcaption>
        </figure>
      </div>
      <div>
        <h2 className="text-2xl font-semibold">Metadata</h2>
        <MetadataForm />
      </div>
    </main>
  )
}
