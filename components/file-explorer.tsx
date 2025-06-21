"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  content?: string
}

const mockFileTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "Header.tsx",
            type: "file",
            content: 'import React from "react"\n\nexport function Header() {\n  return <header>My Header</header>\n}',
          },
          {
            name: "Button.tsx",
            type: "file",
            content:
              'import React from "react"\n\ninterface ButtonProps {\n  children: React.ReactNode\n  onClick?: () => void\n}\n\nexport function Button({ children, onClick }: ButtonProps) {\n  return <button onClick={onClick}>{children}</button>\n}',
          },
        ],
      },
      {
        name: "pages",
        type: "folder",
        children: [
          {
            name: "index.tsx",
            type: "file",
            content:
              'import React from "react"\nimport { Header } from "../components/Header"\n\nexport default function Home() {\n  return (\n    <div>\n      <Header />\n      <main>\n        <h1>Welcome to my app!</h1>\n      </main>\n    </div>\n  )\n}',
          },
        ],
      },
      {
        name: "App.tsx",
        type: "file",
        content:
          'import React from "react"\nimport Home from "./pages"\n\nfunction App() {\n  return <Home />\n}\n\nexport default App',
      },
    ],
  },
  {
    name: "package.json",
    type: "file",
    content:
      '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "typescript": "^5.0.0"\n  }\n}',
  },
  {
    name: "README.md",
    type: "file",
    content:
      "# My Awesome Project\n\nThis is a sample project built with React and TypeScript.\n\n## Getting Started\n\n1. Install dependencies: `npm install`\n2. Start the dev server: `npm start`\n\n## Features\n\n- Modern React with TypeScript\n- Component-based architecture\n- Clean and maintainable code",
  },
]

interface FileExplorerProps {
  onFileSelect: (fileName: string, content: string) => void
}

export function FileExplorer({ onFileSelect }: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src"]))
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath)
    } else {
      newExpanded.add(folderPath)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileTree = (nodes: FileNode[], path = "") => {
    return nodes
      .filter((node) => searchQuery === "" || node.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .map((node) => {
        const currentPath = path ? `${path}/${node.name}` : node.name
        const isExpanded = expandedFolders.has(currentPath)

        if (node.type === "folder") {
          return (
            <div key={currentPath}>
              <Button
                variant="ghost"
                className="w-full justify-start h-8 px-2 font-normal"
                onClick={() => toggleFolder(currentPath)}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
                {isExpanded ? <FolderOpen className="w-4 h-4 mr-2" /> : <Folder className="w-4 h-4 mr-2" />}
                {node.name}
              </Button>
              {isExpanded && node.children && <div className="ml-4">{renderFileTree(node.children, currentPath)}</div>}
            </div>
          )
        } else {
          return (
            <Button
              key={currentPath}
              variant="ghost"
              className="w-full justify-start h-8 px-2 font-normal"
              onClick={() => onFileSelect(currentPath, node.content || "")}
            >
              <File className="w-4 h-4 mr-2" />
              {node.name}
            </Button>
          )
        }
      })
  }

  return (
    <div className="h-full border-r bg-background">
      <div className="p-3 border-b">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Files</h3>
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">{renderFileTree(mockFileTree)}</div>
      </ScrollArea>
    </div>
  )
}
