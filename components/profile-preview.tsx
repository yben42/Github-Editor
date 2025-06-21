"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, ExternalLink, Copy } from "lucide-react"
import ReactMarkdown from "react-markdown"

interface ProfilePreviewProps {
  content: string
  onClose: () => void
}

export function ProfilePreview({ content, onClose }: ProfilePreviewProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b px-4 py-3 flex items-center justify-between bg-gray-50">
        <div>
          <h3 className="font-semibold text-gray-900">Profile Preview</h3>
          <p className="text-sm text-gray-600">How your profile will look on GitHub</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
            <Copy className="w-4 h-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Open in GitHub
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* GitHub-style container */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    // Custom components to match GitHub styling
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">{children}</h2>
                    ),
                    h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">{children}</h3>,
                    p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 space-y-1 text-gray-700">{children}</ul>
                    ),
                    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    code: ({ children }) => (
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                    ),
                    img: ({ src, alt }) => (
                      <img
                        src={src || "/placeholder.svg"}
                        alt={alt}
                        className="max-w-full h-auto rounded-lg shadow-sm"
                      />
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-blue-600 hover:text-blue-800 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {content || "# Your Profile Preview\n\nStart editing to see your profile come to life!"}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>This is how your profile will appear on GitHub</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  )
}
