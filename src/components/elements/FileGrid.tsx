import { WORKING_DIR_PATH } from "@/lib/setup"
import { Folder } from "lucide-react"
import Link from "next/link"
import { Dirent } from "node:fs"
import path from "node:path"

export function FileGrid({ contents }: { contents: Dirent[] }) {
  //   Filter out _a & _b files
  const contentsNoDupes = contents
    .map((dirent) => {
      if (!dirent.isFile()) return dirent
      const pathNoExt = path
        .basename(dirent.name)
        .replace(path.extname(dirent.name), "")
      const isSupplemental =
        pathNoExt.endsWith("_a") || pathNoExt.endsWith("_b")
      if (isSupplemental) return undefined
      return dirent
    })
    .filter(
      (dirent): dirent is Dirent => !!dirent && dirent.name !== ".DS_Store",
    )

  return (
    <div className="grid grid-cols-4 gap-4">
      {contentsNoDupes.map((dirent) => {
        const relativeFromRootPath = path.join(
          dirent.parentPath.replace(WORKING_DIR_PATH, ""),
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
