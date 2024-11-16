"use client"

import { useState } from "react"

type Props = {
  front: string
  back: string | false
}

export function PhotoDisplay({ front, back }: Props) {
  const [activePhoto, setActivePhoto] = useState(front)
  return (
    <div>
      {back && (
        <div>
          <button onClick={() => setActivePhoto(back)}>Back</button>
          <button onClick={() => setActivePhoto(front)}>Front</button>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/api${activePhoto}`} alt="Image" className="max-w-96" />
    </div>
  )
}
