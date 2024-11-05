import RefreshButton from "@/components/elements/RefreshButton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleX } from "lucide-react"
import fs from "node:fs/promises"
import path from "node:path"

const photosEnv = process.env.PHOTOS_ROOT_DIR

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
            <code className="rounded-md bg-gray-100 p-1">PHOTOS_ROOT_DIR</code>{" "}
            in your .env file
            <br></br> and restart the NextJS server.
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
            Please check the path
            <br></br> and restart the NextJS server.
          </AlertDescription>
          <RefreshButton />
        </Alert>
      </main>
    )
  }

  return (
    <main>
      <div>{JSON.stringify(photosRootParsedPath)}</div>
    </main>
  )
}
