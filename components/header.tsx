"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GitBranch, GitCommit, Save, Bot, Github, Search, Settings, User } from "lucide-react"

interface HeaderProps {
  onToggleAI: () => void
}

export function Header({ onToggleAI }: HeaderProps) {
  return (
    <header className="border-b bg-background px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Github className="w-6 h-6" />
          <span className="font-semibold">AI Code Editor</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>username/repository</span>
          <Badge variant="secondary" className="gap-1">
            <GitBranch className="w-3 h-3" />
            main
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search files..." className="pl-8 w-64" />
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <Save className="w-4 h-4" />
          Save
        </Button>

        <Button variant="outline" size="sm" className="gap-2">
          <GitCommit className="w-4 h-4" />
          Commit
        </Button>

        <Button variant="outline" size="sm" className="gap-2" onClick={onToggleAI}>
          <Bot className="w-4 h-4" />
          AI Assistant
        </Button>

        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>

        <Button variant="ghost" size="sm">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}
