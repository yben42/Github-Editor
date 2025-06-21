"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, MessageCircle, Download, Github } from "lucide-react"

interface ProfileHeaderProps {
  onShowAI: () => void
  onShowPreview: () => void
  onBack: () => void
  templateName: string | null
}

export function ProfileHeader({ onShowAI, onShowPreview, onBack, templateName }: ProfileHeaderProps) {
  return (
    <header className="bg-white border-b shadow-sm px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Templates
          </Button>

          <div className="flex items-center gap-3">
            <Github className="w-6 h-6 text-gray-700" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">GitHub Profile Editor</h1>
              {templateName && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Template:</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {templateName}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onShowPreview} className="gap-2">
            <Eye className="w-4 h-4" />
            Preview
          </Button>

          <Button variant="outline" className="gap-2 bg-green-50 text-green-700 border-green-200 hover:bg-green-100">
            <Save className="w-4 h-4" />
            Save to GitHub
          </Button>

          <Button onClick={onShowAI} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <MessageCircle className="w-4 h-4" />
            AI Help
          </Button>

          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>
    </header>
  )
}
