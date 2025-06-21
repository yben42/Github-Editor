"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Save, MessageCircle, HelpCircle } from "lucide-react"

interface SimpleHeaderProps {
  onShowAI: () => void
}

export function SimpleHeader({ onShowAI }: SimpleHeaderProps) {
  return (
    <header className="bg-white border-b shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Github className="w-6 h-6 text-gray-700" />
            <h1 className="text-xl font-semibold text-gray-900">Easy Code Editor</h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Project:</span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              My Website
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>

          <Button onClick={onShowAI} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <MessageCircle className="w-4 h-4" />
            Ask AI for Help
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-600">
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}
