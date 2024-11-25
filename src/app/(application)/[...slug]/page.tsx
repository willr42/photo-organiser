import fs from "node:fs/promises"
import path from "node:path"
import { WORKING_DIR_PATH } from "../page"
import { FileGrid } from "@/components/elements/FileGrid"
import { PhotoDisplay } from "@/components/elements/PhotoDisplay"

export default async function Page({ params }: { params: { slug: string[] } }) {
  const { slug } = await params
  const photoFrontPath = path.join(WORKING_DIR_PATH, ...slug)
  const photoBackPath = photoFrontPath + "_b"

  const DisplayElement = async () => {
    const stats = await fs.stat(photoFrontPath)
    const isFile = stats.isFile()

    if (isFile) {
      let photoHasBack = false
      try {
        const backStat = await fs.stat(photoBackPath)
        photoHasBack = backStat.isFile()
      } catch (err) {
        if (err instanceof Error && "code" in err) {
          const fsErr = err as NodeJS.ErrnoException
          console.error("File not found", fsErr)
        } else {
          throw err
        }
      }

      const frontImageSrc = photoFrontPath
      const backImageSrc = photoHasBack && photoBackPath

      return <PhotoDisplay front={frontImageSrc} back={backImageSrc} />
    }

    const isDir = stats.isDirectory()

    if (isDir) {
      const dirContents = await fs.readdir(photoFrontPath, {
        withFileTypes: true,
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
