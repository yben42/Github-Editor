"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction: "horizontal" | "vertical"
}

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  minSize?: number
  maxSize?: number
}

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className, direction, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex", direction === "horizontal" ? "flex-row" : "flex-col", className)}
        {...props}
      />
    )
  },
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className, defaultSize, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex-1", className)}
        style={{ flexBasis: defaultSize ? `${defaultSize}%` : undefined }}
        {...props}
      />
    )
  },
)
ResizablePanel.displayName = "ResizablePanel"

const ResizableHandle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-border hover:bg-accent hover:bg-opacity-50 transition-colors",
          "w-px cursor-col-resize",
          className,
        )}
        {...props}
      />
    )
  },
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
