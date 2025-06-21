"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  PlusCircle,
  Eye,
  Save,
  Trash2,
  GripVertical,
  Palette,
  Settings,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import ReactMarkdown from "react-markdown"
import { componentRegistry, type ProfileComponent, type ComponentType } from "@/lib/profile-builder-types"
import { componentToMarkdown } from "@/lib/profile-markdown-converter"
import { cn } from "@/lib/utils"

const initialComponents: ProfileComponent[] = [
  {
    id: "header-1",
    type: "header",
    content: { title: "Hi there 👋, I'm [Your Name]", subtitle: "Welcome to my GitHub Profile!" },
    settings: { bannerImage: "/placeholder.svg?width=1200&height=300" },
  },
  {
    id: "about-1",
    type: "about",
    content:
      "I'm a passionate developer interested in Web Development & AI. I love building innovative applications and exploring new technologies. Currently learning Advanced TypeScript. Looking to collaborate on open-source AI projects.",
  },
  {
    id: "skills-1",
    type: "skills",
    content: {
      languages: ["JavaScript", "Python", "TypeScript"],
      frameworks: ["React", "Node.js", "Next.js", "FastAPI"],
      tools: ["Git", "Docker", "VS Code", "GitHub Actions"],
    },
    settings: { displayStyle: "badges" },
  },
  // Add default experience and education for demonstration
  {
    ...JSON.parse(JSON.stringify(componentRegistry.experience.defaultContent[0])),
    id: "exp-initial-1",
    type: "experience",
    content: componentRegistry.experience.defaultContent[0],
  },
  {
    ...JSON.parse(JSON.stringify(componentRegistry.education.defaultContent[0])),
    id: "edu-initial-1",
    type: "education",
    content: componentRegistry.education.defaultContent[0],
  },
]

interface VisualProfileBuilderProps {
  userData: any
  onExit: () => void
}

export function VisualProfileBuilder({ userData, onExit }: VisualProfileBuilderProps) {
  const [components, setComponents] = useState<ProfileComponent[]>(() => {
    // Initialize with default content for experience and education if they are part of initial setup
    // This is a bit manual, ideally initialComponents would be fully formed
    const initial: ProfileComponent[] = [
      {
        id: "header-1",
        type: "header",
        content: { title: "Hi there 👋, I'm [Your Name]", subtitle: "Welcome to my GitHub Profile!" },
        settings: { bannerImage: "/placeholder.svg?width=1200&height=300" },
      },
      {
        id: "about-1",
        type: "about",
        content:
          "I'm a passionate developer interested in Web Development & AI. I love building innovative applications and exploring new technologies. Currently learning Advanced TypeScript. Looking to collaborate on open-source AI projects.",
      },
      {
        id: "skills-1",
        type: "skills",
        content: {
          languages: ["JavaScript", "Python", "TypeScript"],
          frameworks: ["React", "Node.js", "Next.js", "FastAPI"],
          tools: ["Git", "Docker", "VS Code", "GitHub Actions"],
        },
        settings: { displayStyle: "badges" },
      },
      {
        id: "exp-initial-1",
        type: "experience",
        content: JSON.parse(JSON.stringify(componentRegistry.experience.defaultContent[0])),
        settings: JSON.parse(JSON.stringify(componentRegistry.experience.defaultSettings || {})),
      },
      {
        id: "edu-initial-1",
        type: "education",
        content: JSON.parse(JSON.stringify(componentRegistry.education.defaultContent[0])),
        settings: JSON.parse(JSON.stringify(componentRegistry.education.defaultSettings || {})),
      },
    ]
    return initial
  })

  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)
  const [generatedMarkdown, setGeneratedMarkdown] = useState("")
  const [activeTab, setActiveTab] = useState<"properties" | "preview" | "aiHelper">("properties")

  useEffect(() => {
    if (userData?.username) {
      setComponents((prev) =>
        prev.map((comp) =>
          comp.type === "stats" || comp.type === "socials"
            ? { ...comp, content: { ...comp.content, username: userData.username } }
            : comp,
        ),
      )
    }
  }, [userData])

  useEffect(() => {
    let md = ""
    components.forEach((comp) => {
      md += componentToMarkdown(comp, userData) + "\n\n"
    })
    setGeneratedMarkdown(md.trim())
  }, [components, userData])

  const addComponent = (type: ComponentType) => {
    const newId = `${type}-${Date.now()}`
    const compInfo = componentRegistry[type]

    let defaultContentForType = compInfo.defaultContent
    // For array-based content like experience, projects, education, ensure it's an array
    if (
      Array.isArray(compInfo.defaultContent) &&
      compInfo.defaultContent.length > 0 &&
      (type === "experience" || type === "education" || type === "projects")
    ) {
      defaultContentForType = [JSON.parse(JSON.stringify(compInfo.defaultContent[0]))] // Start with one item
    } else if (Array.isArray(compInfo.defaultContent)) {
      defaultContentForType = JSON.parse(JSON.stringify(compInfo.defaultContent))
    } else {
      defaultContentForType = JSON.parse(JSON.stringify(compInfo.defaultContent))
    }

    setComponents([
      ...components,
      {
        id: newId,
        type,
        content: defaultContentForType,
        settings: JSON.parse(JSON.stringify(compInfo.defaultSettings || {})),
      },
    ])
    setSelectedComponentId(newId)
    setActiveTab("properties")
  }

  const removeComponent = (id: string) => {
    setComponents(components.filter((comp) => comp.id !== id))
    if (selectedComponentId === id) setSelectedComponentId(null)
  }

  const updateComponentContent = (id: string, newContent: any) => {
    setComponents(components.map((comp) => (comp.id === id ? { ...comp, content: newContent } : comp)))
  }

  const updateComponentSettings = (id: string, newSettings: any) => {
    setComponents(
      components.map((comp) => (comp.id === id ? { ...comp, settings: { ...comp.settings, ...newSettings } } : comp)),
    )
  }

  const moveComponent = (id: string, direction: "up" | "down") => {
    const index = components.findIndex((comp) => comp.id === id)
    if (index === -1) return

    const newComponents = [...components]
    const [item] = newComponents.splice(index, 1)

    if (direction === "up" && index > 0) {
      newComponents.splice(index - 1, 0, item)
    } else if (direction === "down" && index < components.length - 1) {
      // Corrected this line
      newComponents.splice(index + 1, 0, item)
    } else {
      newComponents.splice(index, 0, item)
      return
    }
    setComponents(newComponents)
  }

  const selectedComponent = components.find((comp) => comp.id === selectedComponentId)

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onExit} className="gap-1.5 text-slate-700 hover:bg-slate-100">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Button>
          <span className="w-px h-6 bg-slate-200"></span>
          <h1 className="text-lg font-semibold text-slate-800">Profile Visual Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={activeTab === "aiHelper" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("aiHelper")}
            className="gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-yellow-500" /> AI Helper
          </Button>
          <Button
            variant={activeTab === "preview" ? "secondary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("preview")}
            className="gap-1.5"
          >
            <Eye className="w-4 h-4" /> Preview
          </Button>
          <Button
            size="sm"
            className="gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => alert("Saving to GitHub (simulated). Markdown:\n\n" + generatedMarkdown)}
          >
            <Save className="w-4 h-4" /> Save to GitHub
          </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-72 bg-white border-r border-slate-200 p-4 overflow-y-auto shadow-md z-10">
          <h2 className="text-base font-semibold mb-4 text-slate-700 px-2">Add Sections</h2>
          <div className="space-y-1.5">
            {Object.entries(componentRegistry).map(([type, { name, icon: Icon }]) => (
              <Button
                key={type}
                variant="ghost"
                className="w-full justify-start gap-2.5 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 py-2.5 px-2 h-auto"
                onClick={() => addComponent(type as ComponentType)}
              >
                <Icon className="w-5 h-5 opacity-80" />
                <span className="text-sm font-medium">{name}</span>
              </Button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-3">
              {components.map((comp, index) => (
                <ProfileSectionItem
                  key={comp.id}
                  component={comp}
                  isSelected={selectedComponentId === comp.id}
                  onSelect={() => {
                    setSelectedComponentId(comp.id)
                    setActiveTab("properties")
                  }}
                  onRemove={() => removeComponent(comp.id)}
                  onMoveUp={() => moveComponent(comp.id, "up")}
                  onMoveDown={() => moveComponent(comp.id, "down")}
                  isFirst={index === 0}
                  isLast={index === components.length - 1}
                />
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-6 w-full gap-2 border-dashed border-slate-400 text-slate-600 hover:border-slate-500 hover:text-slate-700 py-3"
              onClick={() => alert("Click a section type from the left panel to add.")}
            >
              <PlusCircle className="w-4 h-4" /> Add New Section
            </Button>
          </div>
        </main>

        <aside
          className={cn(
            "bg-white border-l border-slate-200 shadow-lg transition-all duration-300 ease-in-out overflow-y-auto z-10",
            selectedComponentId || activeTab !== "properties" ? "w-[520px] p-0" : "w-0 p-0", // Increased width for more complex editors
          )}
        >
          {activeTab === "preview" ? (
            <ProfilePreviewPanel markdown={generatedMarkdown} />
          ) : activeTab === "aiHelper" ? (
            <AIHelperPanel
              selectedComponent={selectedComponent}
              profileComponents={components}
              onApplySuggestion={(suggestion, targetComponentId) => {
                const targetId = targetComponentId || selectedComponent?.id
                if (!targetId) {
                  alert("No component selected to apply suggestion.")
                  return
                }
                const compToUpdate = components.find((c) => c.id === targetId)
                if (!compToUpdate) return

                let newContent = JSON.parse(JSON.stringify(compToUpdate.content))
                if (typeof newContent === "string") {
                  newContent += "\n\n" + suggestion
                } else if (compToUpdate.type === "skills" && newContent.languages) {
                  const skillToAdd = suggestion.split(":")[1]?.trim()
                  if (skillToAdd && !newContent.tools.includes(skillToAdd)) newContent.tools.push(skillToAdd)
                } else {
                  newContent.ai_suggestion = (newContent.ai_suggestion || "") + "\n" + suggestion
                }
                updateComponentContent(targetId, newContent)
              }}
            />
          ) : selectedComponent ? (
            <PropertiesPanel
              key={selectedComponent.id}
              component={selectedComponent}
              onContentChange={(newContent) => updateComponentContent(selectedComponent.id, newContent)}
              onSettingsChange={(newSettings) => updateComponentSettings(selectedComponent.id, newSettings)}
            />
          ) : (
            <div className="p-6 text-center text-slate-500 h-full flex flex-col justify-center items-center">
              <Palette className="w-16 h-16 mx-auto mb-6 opacity-40" />
              <p className="text-xl font-medium">Select a section to edit.</p>
              <p className="text-sm mt-2">Or, add a new section from the left panel.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function ProfileSectionItem({
  component,
  isSelected,
  onSelect,
  onRemove,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  component: ProfileComponent
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}) {
  const compInfo = componentRegistry[component.type]
  const Icon = compInfo.icon

  let previewText = ""
  if (typeof component.content === "string") {
    previewText = component.content.substring(0, 70) + (component.content.length > 70 ? "..." : "")
  } else if (component.type === "header" && typeof component.content.title === "string") {
    previewText = component.content.title
  } else if (component.type === "skills" && component.content.languages) {
    previewText = `Skills: ${(component.content.languages || []).slice(0, 3).join(", ")}...`
  } else if (component.type === "experience" && Array.isArray(component.content) && component.content.length > 0) {
    previewText = `${component.content[0].role} at ${component.content[0].company}`
  } else if (component.type === "education" && Array.isArray(component.content) && component.content.length > 0) {
    previewText = `${component.content[0].degree} from ${component.content[0].school}`
  } else {
    previewText = `${compInfo.name} section content`
  }

  return (
    <Card
      className={cn(
        "group relative cursor-pointer hover:shadow-xl transition-all duration-200",
        isSelected ? "ring-2 ring-indigo-500 shadow-lg bg-white" : "bg-white shadow-md hover:bg-slate-50",
      )}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="text-slate-400 group-hover:text-slate-500 pt-0.5">
              <GripVertical className="w-5 h-5" />
            </div>
            <Icon className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-800 block truncate">{compInfo.name}</h3>
              <p className="text-xs text-slate-500 block truncate leading-relaxed">{previewText}</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-0.5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100"
              onClick={(e) => {
                e.stopPropagation()
                onMoveUp()
              }}
              disabled={isFirst}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-slate-500 hover:text-indigo-600 hover:bg-indigo-100"
              onClick={(e) => {
                e.stopPropagation()
                onMoveDown()
              }}
              disabled={isLast}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      {isSelected && (
        <Button
          variant="destructive"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="absolute -top-2 -right-2 rounded-full h-7 w-7 p-0 opacity-0 group-hover:opacity-100"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      )}
    </Card>
  )
}

function PropertiesPanel({
  component,
  onContentChange,
  onSettingsChange,
}: {
  component: ProfileComponent
  onContentChange: (newContent: any) => void
  onSettingsChange: (newSettings: any) => void
}) {
  const compInfo = componentRegistry[component.type]

  const renderField = (
    label: string,
    value: string,
    onChange: (val: string) => void,
    type: "input" | "textarea" = "input",
    placeholder?: string,
  ) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      {type === "input" ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="text-sm" />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={value.length > 100 ? 5 : 3}
          placeholder={placeholder}
          className="text-sm leading-relaxed"
        />
      )}
    </div>
  )

  const renderListEditor = (
    listName: string,
    items: Array<any> = [], // Ensure items is an array
    itemSchema: Record<string, { label: string; type?: "input" | "textarea" | "bulletPoints"; placeholder?: string }>,
    defaultItem: any,
    itemTitleField: string,
  ) => (
    <div className="space-y-3">
      {(items || []).map((item, index) => (
        <Card key={index} className="p-3 bg-slate-50 border-slate-200">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-slate-700">
              {item[itemTitleField] || `${listName.slice(0, -1)} ${index + 1}`}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const newList = items.filter((_, i) => i !== index)
                onContentChange(newList) // For components where content IS the list
              }}
              className="h-7 w-7 text-red-500 hover:bg-red-100"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
          <div className="space-y-2">
            {Object.entries(itemSchema).map(([field, { label, type, placeholder }]) => {
              if (type === "bulletPoints") {
                return (
                  <div key={field} className="space-y-1">
                    <label className="text-xs font-medium text-slate-600">{label}</label>
                    <Textarea
                      value={(item[field] || []).join("\n")}
                      onChange={(e) => {
                        const newList = [...items]
                        newList[index] = { ...newList[index], [field]: e.target.value.split("\n") }
                        onContentChange(newList)
                      }}
                      rows={3}
                      placeholder={placeholder || "Enter each point on a new line"}
                      className="text-sm leading-relaxed"
                    />
                  </div>
                )
              }
              return renderField(
                label,
                item[field] || "",
                (val) => {
                  const newList = [...items]
                  newList[index] = { ...newList[index], [field]: val }
                  onContentChange(newList)
                },
                type as "input" | "textarea" | undefined, // Cast because bulletPoints is handled
                placeholder,
              )
            })}
          </div>
        </Card>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const newList = [...(items || []), { ...defaultItem }]
          onContentChange(newList)
        }}
        className="w-full border-slate-300 text-slate-600"
      >
        <PlusCircle className="w-4 h-4 mr-2" /> Add {listName.slice(0, -1)}
      </Button>
    </div>
  )

  const renderContentEditor = () => {
    switch (component.type) {
      case "header":
        return (
          <div className="space-y-3">
            {renderField("Title", component.content.title || "", (val) =>
              onContentChange({ ...component.content, title: val }),
            )}
            {renderField("Subtitle", component.content.subtitle || "", (val) =>
              onContentChange({ ...component.content, subtitle: val }),
            )}
          </div>
        )
      case "about":
        return renderField(
          "About Text",
          component.content || "",
          (val) => onContentChange(val),
          "textarea",
          "Tell your story...",
        )
      case "skills":
        return (
          <div className="space-y-3">
            {renderField("Languages (comma-separated)", (component.content.languages || []).join(", "), (val) =>
              onContentChange({
                ...component.content,
                languages: val
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s),
              }),
            )}
            {renderField(
              "Frameworks/Libraries (comma-separated)",
              (component.content.frameworks || []).join(", "),
              (val) =>
                onContentChange({
                  ...component.content,
                  frameworks: val
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s),
                }),
            )}
            {renderField("Tools/Platforms (comma-separated)", (component.content.tools || []).join(", "), (val) =>
              onContentChange({
                ...component.content,
                tools: val
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s),
              }),
            )}
          </div>
        )
      case "projects":
        return renderListEditor(
          "projects",
          component.content, // content is the array of projects
          {
            name: { label: "Project Name" },
            description: { label: "Description", type: "textarea" },
            link: { label: "Link (URL)" },
            tags: { label: "Technologies (comma-separated)" },
          },
          { name: "New Project", description: "", link: "", tags: [] },
          "name",
        )
      case "experience":
        return renderListEditor(
          "experience",
          component.content, // content is the array of experiences
          {
            role: { label: "Role / Title" },
            company: { label: "Company Name" },
            companyLink: { label: "Company Website (Optional URL)" },
            logo: { label: "Company Logo URL (Optional)" },
            duration: { label: "Duration (e.g., Jan 2022 - Present)" },
            location: { label: "Location (Optional)" },
            descriptionPoints: { label: "Key Responsibilities/Achievements", type: "bulletPoints" },
            technologies: { label: "Technologies Used (comma-separated, Optional)" },
          },
          componentRegistry.experience.defaultContent[0], // Use the detailed default
          "role",
        )
      case "education":
        return renderListEditor(
          "education",
          component.content, // content is the array of education items
          {
            degree: { label: "Degree / Certificate" },
            school: { label: "School / Institution" },
            schoolLink: { label: "School Website (Optional URL)" },
            logo: { label: "School Logo URL (Optional)" },
            duration: { label: "Duration (e.g., Aug 2018 - May 2022)" },
            location: { label: "Location (Optional)" },
            descriptionPoints: { label: "Details (e.g., Thesis, Honors - Optional)", type: "bulletPoints" },
            gpa: { label: "GPA (Optional)" },
          },
          componentRegistry.education.defaultContent[0], // Use the detailed default
          "degree",
        )

      case "socials":
        const socialPlatforms = ["linkedin", "twitter", "github", "portfolio", "email", "website"]
        return (
          <div className="space-y-3">
            {socialPlatforms.map((platform) =>
              renderField(
                platform.charAt(0).toUpperCase() + platform.slice(1),
                component.content[platform] || "",
                (val) => onContentChange({ ...component.content, [platform]: val }),
                "input",
                platform === "email"
                  ? "your@email.com"
                  : platform.includes("url") || platform === "website" || platform === "portfolio"
                    ? "https://example.com"
                    : "yourusername",
              ),
            )}
          </div>
        )
      case "stats":
        return renderField("GitHub Username", component.content.username || "", (val) =>
          onContentChange({ ...component.content, username: val }),
        )
      case "custom-markdown":
        return renderField(
          "Markdown Content",
          component.content || "",
          (val) => onContentChange(val),
          "textarea",
          "Enter your custom Markdown...",
        )
      default:
        return (
          <Textarea
            value={JSON.stringify(component.content, null, 2)}
            onChange={(e) => {
              try {
                onContentChange(JSON.parse(e.target.value))
              } catch (err) {
                console.error("Invalid JSON")
              }
            }}
            rows={8}
            className="font-mono text-xs"
          />
        )
    }
  }

  const renderSettingsEditor = () => {
    if (component.type === "stats" && component.settings) {
      return (
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-600">Theme</label>
          <Select value={component.settings.theme || "dark"} onValueChange={(val) => onSettingsChange({ theme: val })}>
            <SelectTrigger className="text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                "dark",
                "radical",
                "merko",
                "gruvbox",
                "tokyonight",
                "onedark",
                "cobalt",
                "synthwave",
                "highcontrast",
                "dracula",
              ].map((theme) => (
                <SelectItem key={theme} value={theme} className="text-sm">
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )
    }
    if (component.type === "header" && component.settings) {
      return renderField(
        "Banner Image URL",
        component.settings.bannerImage || "",
        (val) => onSettingsChange({ bannerImage: val }),
        "input",
        "https://example.com/banner.png",
      )
    }
    return <p className="text-sm text-slate-500 italic">No specific settings for this component type.</p>
  }

  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-600" /> Edit: {compInfo.name}
        </h3>
      </div>
      <ScrollArea className="flex-1 -mr-3 pr-3">
        <div className="space-y-6">
          <CollapsibleSection title="Content" isOpenDefault={true}>
            {renderContentEditor()}
          </CollapsibleSection>
          <CollapsibleSection title="Settings" isOpenDefault={false}>
            {renderSettingsEditor()}
          </CollapsibleSection>
        </div>
      </ScrollArea>
    </div>
  )
}

function CollapsibleSection({
  title,
  children,
  isOpenDefault = false,
}: { title: string; children: React.ReactNode; isOpenDefault?: boolean }) {
  const [isOpen, setIsOpen] = useState(isOpenDefault)
  return (
    <div>
      <button className="flex items-center justify-between w-full py-2 text-left" onClick={() => setIsOpen(!isOpen)}>
        <h4 className="text-sm font-semibold text-slate-700">{title}</h4>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-slate-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-500" />
        )}
      </button>
      {isOpen && <div className="mt-2 pl-1 pr-1 pb-2 space-y-4">{children}</div>}
    </div>
  )
}

function ProfilePreviewPanel({ markdown }: { markdown: string }) {
  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-600" /> Live Preview
        </h3>
      </div>
      <ScrollArea className="flex-1 bg-slate-50 p-4 rounded-md border border-slate-200 -mr-3 pr-3">
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </ScrollArea>
    </div>
  )
}

function AIHelperPanel({
  selectedComponent,
  profileComponents,
  onApplySuggestion,
}: {
  selectedComponent: ProfileComponent | undefined
  profileComponents: ProfileComponent[]
  onApplySuggestion: (suggestion: string, targetComponentId?: string) => void
}) {
  const [aiInput, setAiInput] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleAskAI = async () => {
    if (!aiInput.trim()) return
    setIsLoading(true)
    setAiResponse("")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let generatedSuggestion = `AI suggestion for "${aiInput}"`
    if (selectedComponent) {
      const compInfo = componentRegistry[selectedComponent.type]
      generatedSuggestion += ` (for your "${compInfo.name}" section):\n\n`
      if (selectedComponent.type === "about") {
        generatedSuggestion += `Consider adding a sentence about your future goals or aspirations. For example: "In the future, I aim to contribute to projects that leverage AI for social good."`
      } else if (selectedComponent.type === "skills") {
        generatedSuggestion += `You could add a "Databases" category. Example: "Add skill: PostgreSQL" or "Add skill: MongoDB" under a new 'Databases' sub-heading.`
      } else {
        generatedSuggestion += `Here's a general improvement: Ensure your descriptions are concise and highlight quantifiable achievements.`
      }
    } else {
      generatedSuggestion += ` (general profile suggestion):\n\nMake sure your profile has a clear call to action. What do you want visitors to do next? (e.g., check out a project, connect on LinkedIn).`
    }
    setAiResponse(generatedSuggestion)
    setIsLoading(false)
  }

  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
        <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-500" /> AI Helper
        </h3>
      </div>
      <div className="space-y-3 mb-4">
        <p className="text-xs text-slate-600">
          {selectedComponent
            ? `Ask AI for help with your "${componentRegistry[selectedComponent.type].name}" section.`
            : "Ask AI for general profile suggestions."}
        </p>
        <Textarea
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="e.g., 'Make my skills section more impactful' or 'Suggest a project description'"
          rows={3}
          className="text-sm"
        />
        <Button
          onClick={handleAskAI}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {isLoading ? "Thinking..." : "Ask AI"}
        </Button>
      </div>
      {aiResponse && (
        <Card className="flex-1 bg-indigo-50 border-indigo-200">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm font-semibold text-indigo-700">AI Suggestion</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-indigo-800 space-y-3">
            <ScrollArea className="h-48 pr-2">
              <pre className="whitespace-pre-wrap font-sans leading-relaxed">{aiResponse}</pre>
            </ScrollArea>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onApplySuggestion(aiResponse, selectedComponent?.id)}
              className="w-full border-indigo-300 text-indigo-700 hover:bg-indigo-100"
            >
              Apply Suggestion
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
