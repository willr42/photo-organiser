import path from "node:path"
import os from "node:os"
import fs from "node:fs/promises"

const photosEnv = process.env.PHOTOS_ROOT_DIR
export const photosRootParsedPath = path.parse(photosEnv as string)
export const WORKING_DIR_PATH = path.join(os.tmpdir(), "photoorg")
try {
  await fs.mkdir(WORKING_DIR_PATH, { recursive: true })
} catch (err) {
  console.error(err)
}
