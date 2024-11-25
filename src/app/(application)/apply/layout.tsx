import { Stepper } from "@/components/elements/Stepper/Stepper"
import React from "react"

const appSteps = [
  { title: "Update", active: false },
  { title: "Apply", active: true },
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
