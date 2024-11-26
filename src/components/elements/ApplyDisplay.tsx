"use client"

import { useMetadataContext } from "@/lib/providers"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Pencil } from "lucide-react"
import { buttonVariants } from "../ui/button"
import { MetadataForm } from "./MetadataForm"

export function ApplyDisplay({ workingDir }: { workingDir: string }) {
  const { metadata } = useMetadataContext()
  const metadataArr = Object.entries(metadata)
  return (
    <div className="grid grid-cols-4 p-6">
      {metadataArr.map(([filePath, timeStamp]) => (
        <Popover key={filePath}>
          <div className="flex flex-col">
            <span>{filePath}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api${workingDir + filePath}`} alt=""></img>
            <p>Taken: {timeStamp}</p>
            <div>
              <PopoverTrigger
                className={buttonVariants({ className: "inline" })}
              >
                Edit <Pencil />
              </PopoverTrigger>
              <PopoverContent>
                <MetadataForm path={filePath} />
              </PopoverContent>
            </div>
          </div>
        </Popover>
      ))}
    </div>
  )
}
