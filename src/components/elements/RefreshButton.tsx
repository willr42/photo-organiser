"use client"

import { Button } from "@/components/ui/button"

export default function RefreshButton() {
  return (
    <div className="mt-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </div>
  )
}
