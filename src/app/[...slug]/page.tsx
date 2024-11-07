import fs from "node:fs/promises"
import path from "node:path"
import { WORKING_DIR } from "../page"

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params
  const currentPath = path.parse(path.join(WORKING_DIR, ...slug))
  const dirContents = await fs.readdir(path.format(currentPath), {
    withFileTypes: true,
    recursive: true,
  })

  return <div>{JSON.stringify(dirContents)}</div>
}
