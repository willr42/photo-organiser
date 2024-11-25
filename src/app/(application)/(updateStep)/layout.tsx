import { Stepper } from "@/components/elements/Stepper/Stepper"
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
      <nav>
        <Stepper steps={appSteps} />
      </nav>
      {children}
    </div>
  )
}
