import { WORKING_DIR } from "@/app/page"
import { Folder } from "lucide-react"
import Link from "next/link"
import { Dirent } from "node:fs"
import path from "node:path"

export function FileGrid({ contents }: { contents: Dirent[] }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {contents.map((dirent) => {
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
