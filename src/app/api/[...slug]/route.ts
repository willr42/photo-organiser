import path from "node:path"
import fs from "node:fs/promises"
import { NextResponse } from "next/server"

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

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
