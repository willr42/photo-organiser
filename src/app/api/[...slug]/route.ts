import { isoToExif } from "@/lib/utils"
import { exiftool } from "exiftool-vendored"
import { NextRequest, NextResponse } from "next/server"
import fs from "node:fs/promises"
import path from "node:path"
import { z } from "zod"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const slug = (await params).slug
  const filePath = path.join("/", ...slug)
  const fileAccessible = await fileExists(filePath)

  if (!fileAccessible) {
    return new Response("Image not accessible", { status: 500 })
  }

  try {
    const fileContent = await fs.readFile(filePath)

    return new NextResponse(fileContent, {
      headers: { "Content-Type": "image/jpeg" },
    })
  } catch (err) {
    console.error(err)
    return new Response(null, { status: 500 })
  }
}

const updateSchema = z.object({ date: z.string(), filepath: z.string() })

export async function PATCH(request: NextRequest) {
  try {
    const jsonBody = await request.json()
    const parsedBody = updateSchema.parse(jsonBody)
    const { filepath: targetFilepath, date: newDatestamp } = parsedBody

    // assert: does not run without this defined
    const resolvedPath = path.join(process.env.PHOTOS_ROOT_DIR!, targetFilepath)
    const datestampExif = isoToExif(newDatestamp)

    try {
      await exiftool.write(
        resolvedPath,
        {
          DateTimeOriginal: datestampExif,
        },
        { writeArgs: ["-overwrite_original_in_place", "-P"] },
      )
      console.log("EXIF data written successfully")
    } catch (error) {
      console.error("Error writing EXIF data:", error)
    }

    return new Response(null, { status: 204 })
  } catch (err) {
    console.error(err)
    return new Response(null, { status: 500 })
  }
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
