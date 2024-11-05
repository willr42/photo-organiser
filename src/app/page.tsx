const photosEnv = process.env.PHOTOS_ROOT_DIR

export default function Home() {
  if (!photosEnv) {
    return (
      <div>
        <h1>
          Please provide the root directory of your photos as an environment
          variable.
        </h1>
      </div>
    )
  }
}
