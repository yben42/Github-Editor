"use client"

import { Button } from "@/components/ui/button"
import { HelpCircle, Undo, Redo, Type, Zap } from "lucide-react"

interface ProfileEditorProps {
  content: string
  onChange: (content: string) => void
  onNeedHelp: () => void
  templateName: string | null
}

export function ProfileEditor({ content, onChange, onNeedHelp, templateName }: ProfileEditorProps) {
  const quickInserts = [
    {
      label: "GitHub Stats",
      code: "![GitHub stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=dark)",
    },
    {
      label: "Top Languages",
      code: "![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername&layout=compact)",
    },
    {
      label: "LinkedIn Badge",
      code: "[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](your-linkedin-url)",
    },
    {
      label: "Email Badge",
      code: "[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:your.email@example.com)",
    },
  ]

  const insertQuickCode = (code: string) => {
    onChange(content + "\n\n" + code)
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="border-b bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Edit Your Profile</h2>
            <p className="text-sm text-gray-600">Customize your GitHub README.md</p>
          </div>

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

      {/* Toolbar */}
      <div className="border-b bg-white px-6 py-3">
        <div className="flex items-center justify-between">
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

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Quick Insert:</span>
            {quickInserts.map((item) => (
              <Button
                key={item.label}
                variant="outline"
                size="sm"
                onClick={() => insertQuickCode(item.code)}
                className="text-xs"
              >
                <Zap className="w-3 h-3 mr-1" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full p-6 font-mono text-sm bg-white border-none outline-none resize-none leading-relaxed"
          placeholder="Start customizing your GitHub profile..."
          spellCheck={false}
        />

        {/* Line numbers */}
        <div className="absolute left-0 top-0 p-6 text-muted-foreground text-sm font-mono pointer-events-none select-none">
          {content.split("\n").map((_, index) => (
            <div key={index} className="leading-relaxed">
              {index + 1}
            </div>
          ))}
        </div>

        <style jsx>{`
          textarea {
            padding-left: ${content.split("\n").length.toString().length * 8 + 48}px;
          }
        `}</style>
      </div>

      {/* Footer with stats */}
      <div className="border-t bg-gray-50 px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-600">
            <span>Lines: {content.split("\n").length}</span>
            <span>Characters: {content.length}</span>
            <span>Words: {content.split(/\s+/).filter((word) => word.length > 0).length}</span>
          </div>

          <div className="text-gray-500">💡 Tip: Use the AI helper for personalized suggestions</div>
        </div>
      </div>
    </div>
  )
}
