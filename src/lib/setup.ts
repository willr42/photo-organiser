import os from "node:os"
import path from "node:path"

const photosEnv = process.env.PHOTOS_ROOT_DIR
export const photosRootParsedPath = path.parse(photosEnv as string)
export const WORKING_DIR_PATH = path.join(os.tmpdir(), "photoorg")
