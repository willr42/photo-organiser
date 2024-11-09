import { WORKING_DIR } from "@/app/page"
import { Folder } from "lucide-react"
import Link from "next/link"
import { Dirent } from "node:fs"
import path from "node:path"

export function FileGrid({ contents }: { contents: Dirent[] }) {
  //   Filter out _a & _b files
  const contentsNoDupes = contents
    .map((dirent) => {
      if (!dirent.isFile()) return dirent
      const isSupplemental =
        dirent.name.endsWith("_a") || dirent.name.endsWith("_b")
      if (isSupplemental) return undefined
      return dirent
    })
    .filter((dirent) => !!dirent)

  return (
    <div className="grid grid-cols-4 gap-4">
      {contentsNoDupes.map((dirent) => {
        const relativeFromRootPath = path.join(
          dirent.parentPath.replace(WORKING_DIR, ""),
          dirent.name,
        )
        return (
          <Link
            key={dirent.name}
            href={relativeFromRootPath}
            className="rounded-md bg-gray-100 p-2"
          >
            {dirent.isDirectory() && <Folder size={64} />}
            {dirent.name}
          </Link>
        )
      })}
    </div>
  )
}
