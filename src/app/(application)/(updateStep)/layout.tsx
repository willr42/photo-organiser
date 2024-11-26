import { BackButton } from "@/components/elements/BackButton"
import { Stepper } from "@/components/elements/Stepper/Stepper"
import { buttonVariants } from "@/components/ui/button"
import { ArrowBigRightDash } from "lucide-react"
import Link from "next/link"
import React from "react"

const appSteps = [
  { title: "Update", active: true },
  { title: "Apply", active: false },
]

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div>
        <Stepper steps={appSteps} />
      </div>
      {children}
      <div className="mr-20 flex justify-end gap-2">
        <BackButton />
        <Link className={buttonVariants({ variant: "outline" })} href="/apply">
          Apply
          <ArrowBigRightDash />
        </Link>
      </div>
    </div>
  )
}
