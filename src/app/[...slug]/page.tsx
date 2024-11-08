import fs from "node:fs/promises"
import path from "node:path"
import { WORKING_DIR } from "../page"
import { FileGrid } from "@/components/elements/FileGrid"

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params
  const currentPath = path.parse(path.join(WORKING_DIR, ...slug))
  const dirContents = await fs.readdir(path.format(currentPath), {
    withFileTypes: true,
    recursive: true,
  })

  return (
    <div className="flex flex-col p-6">
      <FileGrid contents={dirContents} />
    </div>
  )
}
