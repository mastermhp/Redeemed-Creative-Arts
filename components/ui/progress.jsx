"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <div ref={ref} className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200", className)} {...props}>
    <div
      className="h-full bg-amber-500 transition-all duration-300 ease-in-out"
      style={{ width: `${Math.min(100, Math.max(0, value || 0))}%` }}
    />
  </div>
))
Progress.displayName = "Progress"

export { Progress }
