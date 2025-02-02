import fs from "node:fs/promises"
import path from "node:path"
import { FileGrid } from "@/components/elements/FileGrid"
import { PhotoDisplay } from "@/components/elements/PhotoDisplay"
import { WORKING_DIR_PATH } from "@/lib/setup"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const decodedSlug = slug.map((segment) => decodeURIComponent(segment))
  const photoFrontPath = path.join(WORKING_DIR_PATH, ...decodedSlug)
  const photoBackPath = photoFrontPath + "_b"

  const DisplayElement = async () => {
    console.log(photoFrontPath)
    const stats = await fs.stat(photoFrontPath)
    const isFile = stats.isFile()

    if (isFile) {
      let photoHasBack = false
      try {
        const backStat = await fs.stat(photoBackPath)
        photoHasBack = backStat.isFile()
      } catch (err) {
        if (err instanceof Error && "code" in err) {
          console.log("No back image found")
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
