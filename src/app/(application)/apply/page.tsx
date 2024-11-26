import { ApplyDisplay } from "@/components/elements/ApplyDisplay"
import { WORKING_DIR_PATH } from "../(updateStep)/page"

export default async function ApplyPage() {
  return (
    <div>
      <ApplyDisplay workingDir={WORKING_DIR_PATH} />
    </div>
  )
}
