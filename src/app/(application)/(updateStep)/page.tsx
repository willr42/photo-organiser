import RefreshButton from "@/components/elements/RefreshButton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleX } from "lucide-react"
import fs from "node:fs/promises"
import path from "node:path"
import { FileGrid } from "@/components/elements/FileGrid"
import { photosRootParsedPath, WORKING_DIR_PATH } from "@/lib/setup"

export default async function Home() {
  if (!photosRootParsedPath) {
    return (
      <main className="flex items-center justify-center">
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

  try {
    // Descriptive var name
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const photosIsAccessible = await fs.access(
      path.format(photosRootParsedPath),
      fs.constants.R_OK,
    )
  } catch {
    return (
      <main className="flex items-center justify-center">
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

  const tmpDirContents = await fs.readdir(WORKING_DIR_PATH, {
    withFileTypes: true,
  })

  return (
    <main>
      <div>Files written to {WORKING_DIR_PATH}</div>
      <div className="my-10 flex flex-col items-center">
        <h1 className="mb-4 text-lg font-bold">Pick a file or folder</h1>
        <div className="flex">
          <FileGrid contents={tmpDirContents} />
        </div>
      </div>
    </main>
  )
}
