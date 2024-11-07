import RefreshButton from "@/components/elements/RefreshButton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleX, Folder } from "lucide-react"
import fs from "node:fs/promises"
import path from "node:path"
import os from "node:os"
import sharp from "sharp"
import Link from "next/link"

const photosEnv = process.env.PHOTOS_ROOT_DIR
export const WORKING_DIR = await fs.mkdtemp(path.join(os.tmpdir(), "photoorg"))

export default async function Home() {
  if (!photosEnv) {
    return (
      <main className="flex h-screen items-center justify-center">
        <Alert className="w-fit text-red-700">
          <CircleX className="size-4 stroke-red-700" />
          <AlertTitle className="font-bold">
            Your photos directory isn&apos;t configured
          </AlertTitle>
          <AlertDescription>
            Please set a{" "}
            <code className="rounded-md bg-gray-100 p-1">PHOTOS_ROOT_DIR</code>
            in your .env file <br /> and restart the NextJS server.
          </AlertDescription>
          <RefreshButton />
        </Alert>
      </main>
    )
  }

  const photosRootParsedPath = path.parse(photosEnv as string)
  try {
    // Descriptive var name
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const photosIsAccessible = await fs.access(
      path.format(photosRootParsedPath),
      fs.constants.R_OK,
    )
  } catch {
    return (
      <main className="flex h-screen items-center justify-center">
        <Alert className="w-fit text-red-700">
          <CircleX className="size-4 stroke-red-700" />
          <AlertTitle className="font-bold">
            Problem accessing directory
          </AlertTitle>
          <AlertDescription>
            We could not access the
            <code className="rounded-md bg-gray-100 p-1">PHOTOS_ROOT_DIR</code>.
            Please check the path <br /> and restart the NextJS server.
          </AlertDescription>
          <RefreshButton />
        </Alert>
      </main>
    )
  }

  try {
    // Get dir content
    const dirContents = await fs.readdir(path.format(photosRootParsedPath), {
      withFileTypes: true,
      recursive: true,
    })
    // For each file/folder
    for (const element of dirContents) {
      // Get path
      const elementPath = path.parse(
        path.join(element.parentPath, element.name),
      )

      if (element.isDirectory()) {
        // Make relative to root dir
        const relativeFromRootPath = path.join(
          elementPath.dir.replace(path.format(photosRootParsedPath), ""),
          elementPath.name,
        )

        // Make the tmp version
        const inTmpDirPath = path.join(WORKING_DIR, relativeFromRootPath)

        // // Create in temp dir
        await fs.mkdir(inTmpDirPath, { recursive: true })
      } else {
        // Make relative to root dir
        const relativeFromRootPath = path.join(
          elementPath.dir.replace(path.format(photosRootParsedPath), ""),
          elementPath.name,
        )

        const inTmpDirPath = path.join(WORKING_DIR, relativeFromRootPath)

        sharp(path.format(elementPath))
          .metadata()
          .then((metadata) => {
            return sharp(path.format(elementPath))
              .resize({
                width: Math.floor(metadata.width ? metadata.width / 2 : 1000),
                fit: sharp.fit.contain,
              })
              .toFormat("jpg")
              .toFile(inTmpDirPath)
              .catch((err) => console.error("sharp error: ", err))
          })
      }
    }
  } catch (error) {
    console.error(error)
  }
  const tmpDirContents = await fs.readdir(WORKING_DIR, {
    withFileTypes: true,
  })

  return (
    <main className="min-h-screen">
      <div>Files written to {WORKING_DIR}</div>
      <div className="my-10 flex flex-col items-center">
        <h1 className="mb-4 text-lg font-bold">Pick a file or folder</h1>
        <div className="grid w-3/4 grid-cols-4 gap-4">
          {tmpDirContents.map((dirOrFile) => (
            <Link
              key={dirOrFile.name}
              href={dirOrFile.name}
              className="rounded-md bg-gray-100 p-2"
            >
              {dirOrFile.isDirectory() && <Folder size={64} />}
              {dirOrFile.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
