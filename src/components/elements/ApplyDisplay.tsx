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
      {metadataArr.map(([filePath, timeStamp]) => {
        const takenTimestamp = new Date(timeStamp).toDateString()
        return (
          <Popover key={filePath}>
            <div className="flex flex-col gap-2 rounded-md border border-gray-300 p-4">
              <span className="text-lg font-bold">{filePath}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api${workingDir + filePath}`} alt=""></img>
              <p>Taken: {takenTimestamp}</p>
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
        )
      })}
    </div>
  )
}
