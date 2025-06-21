"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, X, Sparkles, User, FileText, Star, Code } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface AIHelperProps {
  profileContent: string
  templateName: string | null
  onClose: () => void
  onUpdateContent: (content: string) => void
}

export function AIHelper({ profileContent, templateName, onClose, onUpdateContent }: AIHelperProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Hi! 👋 I'm your GitHub Profile AI assistant. I can help you create an amazing profile that showcases your skills and personality!\n\n${templateName ? `I see you're working with the "${templateName}" template - great choice!` : ""}\n\nWhat would you like help with today?`,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    {
      icon: User,
      label: "Write my bio",
      prompt: "Help me write a compelling bio section for my GitHub profile",
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    },
    {
      icon: Code,
      label: "Add tech skills",
      prompt: "Help me showcase my technical skills and technologies",
      color: "bg-green-100 text-green-700 hover:bg-green-200",
    },
    {
      icon: Star,
      label: "Improve projects",
      prompt: "Help me better describe my projects and achievements",
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    },
    {
      icon: FileText,
      label: "Add sections",
      prompt: "What sections should I add to make my profile more complete?",
      color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
    },
  ]

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(content, profileContent, templateName),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (prompt: string, content: string, template: string | null) => {
    if (prompt.toLowerCase().includes("bio") || prompt.toLowerCase().includes("about")) {
      return `Great! Let me help you write a compelling bio. Here's a personalized bio based on your ${template || "profile"}:\n\n**Suggested Bio:**\n\n"👋 Hi! I'm a passionate developer who loves creating innovative solutions and learning new technologies. I enjoy working on challenging projects that make a real impact.\n\n🔭 Currently working on exciting projects in web development\n🌱 Always learning and exploring new technologies\n👯 Looking to collaborate on open source projects\n💬 Ask me about JavaScript, React, and web development\n📫 Let's connect and build something amazing together!"\n\n**Would you like me to:**\n- Customize this further based on your specific skills?\n- Make it more professional or casual?\n- Add specific technologies you work with?\n\nJust let me know what changes you'd like!`
    }

    if (prompt.toLowerCase().includes("tech") || prompt.toLowerCase().includes("skill")) {
      return `Perfect! Let me help you showcase your technical skills effectively. Here are some suggestions:\n\n**Tech Stack Section:**\n\n### 🛠️ Technologies & Tools\n\n**Languages:**\n![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)\n![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)\n![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)\n\n**Frontend:**\n![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)\n![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)\n![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)\n\n**Backend:**\n![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)\n![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)\n\n**Would you like me to:**\n- Add this to your profile?\n- Customize the technologies shown?\n- Add more categories like databases or tools?\n\nWhat technologies do you work with most?`
    }

    if (prompt.toLowerCase().includes("project")) {
      return `Excellent! Let me help you showcase your projects in the best way possible. Here's a template for highlighting your work:\n\n**Featured Projects Section:**\n\n## 🚀 Featured Projects\n\n### 🌟 [Project Name](github-link)\n**Description:** Brief, compelling description of what your project does and why it's awesome\n**Tech Stack:** React, Node.js, MongoDB, etc.\n**Highlights:**\n- 🎯 Key feature or achievement\n- 📈 Impact or results (users, performance, etc.)\n- 🏆 Any recognition or special aspects\n\n### 🎯 [Another Project](github-link)\n**Description:** Another cool project description\n**Tech Stack:** Technologies used\n**Highlights:**\n- ✨ What makes this project special\n- 🚀 Technical challenges solved\n- 💡 Creative solutions implemented\n\n**Tips for great project descriptions:**\n- Start with the problem you solved\n- Highlight the impact or results\n- Mention interesting technical challenges\n- Include live demo links when possible\n\n**Would you like me to help you:**\n- Write descriptions for specific projects?\n- Add this section to your profile?\n- Suggest ways to highlight your best work?\n\nTell me about a project you're proud of!`
    }

    if (prompt.toLowerCase().includes("section") || prompt.toLowerCase().includes("add")) {
      return `Great question! Here are some sections that could make your profile even better:\n\n**Recommended Sections:**\n\n📊 **GitHub Stats** - Show your coding activity\n🏆 **Achievements** - Certifications, awards, milestones\n📚 **Currently Learning** - Show you're always growing\n🤝 **Open Source** - Contributions and projects\n📫 **Connect** - Social links and contact info\n⚡ **Fun Facts** - Personal touches that show personality\n🎯 **Goals** - What you're working toward\n📝 **Blog/Writing** - If you write about tech\n\n**Based on your ${template || "profile"}, I'd especially recommend:**\n- Adding GitHub stats to show your activity\n- Including a "Currently Learning" section\n- Adding social links for networking\n- Including a fun fact to show personality\n\n**Which of these interests you most?** I can help you create any of these sections!\n\nOr if you have other ideas, just let me know what you'd like to add!`
    }

    return `I'd love to help you with that! Based on your ${template || "profile"}, here are some ways I can assist:\n\n**I can help you:**\n✍️ **Write content** - Bios, project descriptions, section text\n🎨 **Improve formatting** - Make your profile look more professional\n📊 **Add elements** - GitHub stats, badges, social links\n🔧 **Optimize sections** - Make existing content more engaging\n💡 **Suggest improvements** - Based on best practices\n\n**Popular requests:**\n- "Help me write a better bio"\n- "Add my technical skills section"\n- "Improve my project descriptions"\n- "What sections should I add?"\n- "Make my profile more engaging"\n\n**What specific aspect of your profile would you like to work on?** Just describe what you need, and I'll provide personalized suggestions!\n\nYou can also use the quick action buttons above for common tasks. 😊`
  }

  const insertSuggestion = (suggestion: string) => {
    onUpdateContent(profileContent + "\n\n" + suggestion)
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">GitHub Profile AI</h3>
              <p className="text-xs text-gray-600">Your personal profile assistant</p>
            </div>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
              {message.type === "ai" && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <Card
                className={`max-w-[85%] ${message.type === "user" ? "bg-blue-500 text-white" : "bg-white shadow-sm"}`}
              >
                <CardContent className="p-3">
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  <div className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </CardContent>
              </Card>

              {message.type === "user" && (
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback className="bg-gray-100">You</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="bg-white shadow-sm">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <span className="text-sm text-gray-600 ml-2">Thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="border-t bg-white p-4">
        <p className="text-sm text-gray-600 mb-3 text-center">Quick help options:</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              className={`justify-start gap-2 h-auto py-2 px-3 text-xs ${action.color} border-0`}
              onClick={() => sendMessage(action.prompt)}
              disabled={isLoading}
            >
              <action.icon className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your GitHub profile..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
