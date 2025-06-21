"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, HelpCircle, Eye, Undo, Redo, Type } from "lucide-react"

interface SimpleCodeEditorProps {
  file: string | null
  content: string
  onChange: (content: string) => void
  onNeedHelp: () => void
}

export function SimpleCodeEditor({ file, content, onChange, onNeedHelp }: SimpleCodeEditorProps) {
  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose a File to Edit</h3>
            <p className="text-gray-600 mb-4">Select any file from the list on the left to start editing</p>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Click on a file name to get started
            </Badge>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Editing: {file}</h2>
            <p className="text-sm text-gray-600">Make your changes below</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </Button>

            <Button
              onClick={onNeedHelp}
              variant="outline"
              size="sm"
              className="gap-2 text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              <HelpCircle className="w-4 h-4" />
              Need Help?
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b bg-white px-6 py-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Redo className="w-4 h-4" />
          </Button>
          <div className="w-px h-4 bg-gray-300 mx-2" />
          <Button variant="ghost" size="sm" className="gap-2">
            <Type className="w-4 h-4" />
            Format
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-6 font-mono text-sm bg-white border-none outline-none resize-none leading-relaxed"
          placeholder="Start typing your code here..."
          spellCheck={false}
        />

        {/* Helpful overlay for empty content */}
        {!content && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg mb-2">This file is empty</p>
              <p className="text-sm">Start typing to add content</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer with helpful tips */}
      <div className="border-t bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-600">
            <span>Lines: {content.split("\n").length}</span>
            <span>Characters: {content.length}</span>
          </div>

          <div className="text-gray-500">💡 Tip: Click "Need Help?" if you want AI assistance</div>
        </div>
      </div>
    </div>
  )
}
