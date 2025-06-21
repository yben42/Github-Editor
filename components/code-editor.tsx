"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, MoreHorizontal, Play, FileText } from "lucide-react"

interface CodeEditorProps {
  file: string | null
  content: string
  onChange: (content: string) => void
}

export function CodeEditor({ file, content, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [content])

  const getLanguageFromFile = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase()
    switch (ext) {
      case "tsx":
      case "ts":
        return "TypeScript"
      case "jsx":
      case "js":
        return "JavaScript"
      case "py":
        return "Python"
      case "json":
        return "JSON"
      case "md":
        return "Markdown"
      case "css":
        return "CSS"
      case "html":
        return "HTML"
      default:
        return "Text"
    }
  }

  if (!file) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No file selected</h3>
          <p className="text-muted-foreground">Select a file from the explorer to start editing</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{file}</span>
          <Badge variant="secondary" className="text-xs">
            {getLanguageFromFile(file)}
          </Badge>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Play className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-4 font-mono text-sm bg-background border-none outline-none resize-none"
          placeholder="Start typing your code..."
          spellCheck={false}
        />

        {/* Line numbers */}
        <div className="absolute left-0 top-0 p-4 text-muted-foreground text-sm font-mono pointer-events-none">
          {content.split("\n").map((_, index) => (
            <div key={index} className="leading-6">
              {index + 1}
            </div>
          ))}
        </div>

        <style jsx>{`
          textarea {
            padding-left: ${content.split("\n").length.toString().length * 8 + 32}px;
          }
        `}</style>
      </div>
    </div>
  )
}
