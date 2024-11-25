import { cn } from "@/lib/utils"
import React from "react"

type Props = {
  steps: Array<{ title: string; active: boolean }>
}
export function Stepper({ steps }: Props) {
  return (
    <div className="mx-auto my-5 flex w-fit gap-14">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <Step title={step.title} idx={idx} active={step.active} />
        </React.Fragment>
      ))}
    </div>
  )
}

type StepProps = {
  idx: number
  title: string
  active: boolean
}

export function Step({ idx, title, active }: StepProps) {
  return (
    <div className="flex select-none flex-col items-center gap-2">
      <span
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold",
          active ? "bg-violet-400" : "bg-gray-300",
        )}
      >
        {idx}
      </span>
      <p className="text-lg font-bold">{title}</p>
    </div>
  )
}
