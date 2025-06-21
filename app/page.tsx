"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, User, LayoutDashboard, FileText, Settings, Sparkles, Rocket, Palette } from "lucide-react"
import { VisualProfileBuilder } from "@/components/visual-profile-builder"
import { PagesSiteBuilder } from "@/components/pages-site-builder" // New component

type ActiveTool = null | "profile-builder" | "pages-builder" | "repo-templates"

export default function GitHubBuilderDashboard() {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null)
  const [userGitHubData, setUserGitHubData] = useState<any>(null) // To store fetched GitHub data

  const handleConnectGitHub = () => {
    setUserGitHubData({
      username: "YourGitHubUser",
      avatarUrl: "/placeholder.svg?width=80&height=80",
      name: "Your Name",
      bio: "Passionate developer and open-source enthusiast.",
      followers: 123,
      following: 45,
      publicRepos: 67,
      pinnedItems: [
        { id: "1", name: "cool-project-1", description: "A very cool project.", stars: 10, language: "JavaScript" },
        { id: "2", name: "another-repo", description: "Something else I built.", stars: 5, language: "Python" },
      ],
    })
    // Default to profile builder after "connecting"
    setActiveTool("profile-builder")
  }

  if (activeTool === "profile-builder") {
    return <VisualProfileBuilder userData={userGitHubData} onExit={() => setActiveTool(null)} />
  }

  if (activeTool === "pages-builder") {
    return <PagesSiteBuilder userData={userGitHubData} onExit={() => setActiveTool(null)} />
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <Github className="w-12 h-12 text-indigo-600" />
          <h1 className="text-5xl font-bold tracking-tight text-slate-900">GitHub Visual Builder</h1>
          <Sparkles className="w-10 h-10 text-amber-500" />
        </div>
        <p className="text-xl text-slate-600">
          Visually craft your GitHub presence – from stunning profiles to project sites.
        </p>
      </header>

      {!userGitHubData ? (
        <div className="flex justify-center">
          <Card className="w-full max-w-md bg-white border-slate-200 shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2 text-slate-800">Connect to GitHub</CardTitle>
              <CardDescription className="text-slate-600">
                Link your GitHub account to start building your presence visually.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center p-8">
              <Button
                size="lg"
                onClick={handleConnectGitHub}
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 gap-2"
              >
                <Github className="w-5 h-5" />
                Connect with GitHub
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ToolCard
            title="Build Your Profile"
            description="Create a stunning GitHub profile README with drag & drop components and AI assistance."
            icon={User}
            onClick={() => setActiveTool("profile-builder")}
            color="bg-blue-600"
          />
          <ToolCard
            title="Create a Project Site"
            description="Visually design and deploy a website for your project using GitHub Pages."
            icon={LayoutDashboard}
            onClick={() => setActiveTool("pages-builder")}
            color="bg-green-600"
            // disabled // Enable this once PagesSiteBuilder is more developed
          />
          <ToolCard
            title="Repository Templates"
            description="Set up new repositories quickly with pre-defined structures and files."
            icon={FileText}
            onClick={() => alert("Repository Templates coming soon!")}
            color="bg-indigo-600"
            disabled
          />
          <ToolCard
            title="Profile Appearance"
            description="Manage pinned repositories and overall profile presentation."
            icon={Palette}
            onClick={() => alert("Profile Appearance settings coming soon!")}
            color="bg-pink-600"
            disabled
          />
          <ToolCard
            title="Automate Workflows"
            description="Visually configure basic GitHub Actions for your projects."
            icon={Rocket}
            onClick={() => alert("Workflow Builder coming soon!")}
            color="bg-orange-600"
            disabled
          />
          <ToolCard
            title="Settings"
            description="Manage your GitHub Visual Builder preferences and integrations."
            icon={Settings}
            onClick={() => alert("Settings coming soon!")}
            color="bg-gray-600"
            disabled
          />
        </div>
      )}

      <footer className="text-center mt-16 text-slate-500">
        <p>&copy; {new Date().getFullYear()} GitHub Visual Builder. Simplify your GitHub presence.</p>
      </footer>
    </div>
  )
}

interface ToolCardProps {
  title: string
  description: string
  icon: React.ElementType
  onClick: () => void
  color: string
  disabled?: boolean
}

function ToolCard({ title, description, icon: Icon, onClick, color, disabled }: ToolCardProps) {
  return (
    <Card
      className={`bg-white border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-3">
          <div className={`p-3 rounded-lg ${color}`}>
            <Icon className="w-7 h-7 text-white" />
          </div>
          <CardTitle className="text-2xl text-slate-800">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-slate-600 text-base">{description}</CardDescription>
        {!disabled && (
          <Button variant="link" className="p-0 mt-4 text-indigo-600 hover:text-indigo-700">
            Launch Tool &rarr;
          </Button>
        )}
        {disabled && <p className="mt-4 text-sm text-amber-600">Coming Soon!</p>}
      </CardContent>
    </Card>
  )
}
