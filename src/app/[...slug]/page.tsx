import fs from "node:fs/promises"
import path from "node:path"
import { WORKING_DIR } from "../page"
import { FileGrid } from "@/components/elements/FileGrid"

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params
  const currentPath = path.parse(path.join(WORKING_DIR, ...slug))
  const DisplayElement = async () => {
    const stats = await fs.stat(path.format(currentPath))
    const isFile = stats.isFile()

    if (isFile) {
      console.log("requesting path: ", path.format(currentPath))
      return (
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/api/${path.format(currentPath)}`} alt="Image" />
        </div>
      )
    }

    const isDir = stats.isDirectory()

    if (isDir) {
      const dirContents = await fs.readdir(path.format(currentPath), {
        withFileTypes: true,
        recursive: true,
      })
      return <FileGrid contents={dirContents} />
    }
  }

  return (
    <div className="flex flex-col p-6">
      <DisplayElement />
    </div>
  )
}
