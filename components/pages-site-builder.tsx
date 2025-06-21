"use client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, LayoutTemplate, Construction } from "lucide-react"

interface PagesSiteBuilderProps {
  userData: any
  onExit: () => void
}

export function PagesSiteBuilder({ userData, onExit }: PagesSiteBuilderProps) {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onExit} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">GitHub Pages Site Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Add Pages specific actions here */}
          <Button variant="outline" size="sm">
            Select Template
          </Button>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            Publish Site
          </Button>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center text-center p-8">
        <div className="bg-white p-12 rounded-lg shadow-xl border">
          <Construction className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-3">GitHub Pages Builder - Coming Soon!</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            This section will allow you to visually design and build a website for your projects, which can be easily
            deployed using GitHub Pages. Imagine dragging and dropping sections like headers, feature lists, image
            galleries, and contact forms!
          </p>
          <div className="flex justify-center items-center gap-4 text-gray-500">
            <LayoutTemplate className="w-6 h-6" />
            <span>Drag & Drop Interface</span>
            <span className="text-2xl">&bull;</span>
            <span>Live Preview</span>
            <span className="text-2xl">&bull;</span>
            <span>Easy Deployment</span>
          </div>
          <Button onClick={onExit} className="mt-8">
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
