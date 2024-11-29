import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import sharp from "sharp"

const photosEnv = process.env.PHOTOS_ROOT_DIR
if (!photosEnv) {
  throw new Error("PHOTOS_ROOT_DIR env var not set")
}
const photosRootParsedPath = path.parse(photosEnv)
const WORKING_DIR_PATH = path.join(os.tmpdir(), "photoorg")
try {
  await fs.mkdir(WORKING_DIR_PATH, { recursive: true })
} catch (err) {
  console.error(err)
}

async function createTempFiles() {
  try {
    // Get dir content
    const dirContents = await fs.readdir(path.format(photosRootParsedPath), {
      withFileTypes: true,
      recursive: true,
    })

    const fileProcessingPromises = []

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

        const inTmpDirPath = path.join(WORKING_DIR_PATH, relativeFromRootPath)

        await fs.mkdir(inTmpDirPath, { recursive: true })
      } else {
        // Make relative to root dir
        const relativeFromRootPath = path.join(
          elementPath.dir.replace(path.format(photosRootParsedPath), ""),
          elementPath.name,
        )
        const inTmpDirPath = path.join(WORKING_DIR_PATH, relativeFromRootPath)

        // Collect processing promises
        const processingPromise = sharp(path.format(elementPath))
          .metadata()
          .then((metadata) => {
            return sharp(path.format(elementPath))
              .resize({
                width: Math.floor(metadata.width ? metadata.width / 2 : 1000),
                fit: sharp.fit.contain,
              })
              .toFormat("jpg")
              .withMetadata({
                exif: {
                  IFD0: {
                    DateTime: "2024:01:01",
                    DateTimeOriginal: "2024:01:01",
                  },
                },
              })
              .toFile(inTmpDirPath)
          })
          .catch((err) => console.error("sharp error:", err, elementPath))

        fileProcessingPromises.push(processingPromise)
      }
    }

    // Wait for all file operations
    await Promise.all(fileProcessingPromises)

    console.log("All files written to temp dir")
  } catch (error) {
    console.error("Error in createTempFiles:", error)
  }
}

console.log("Creating temp files")
createTempFiles()
