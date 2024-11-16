"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Props = {
  front: string
  back: string | false
}

export function PhotoDisplay({ front, back }: Props) {
  const [activePhoto, setActivePhoto] = useState(front)
  return (
    <div className="flex flex-col gap-4">
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/api${activePhoto}`} alt="Image" className="max-w-96" />
    </div>
  )
}
