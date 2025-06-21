"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, X, Code, FileText, Lightbulb, Bug, Sparkles } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface AIAssistantProps {
  selectedFile: string | null
  fileContent: string
  onClose: () => void
}

export function AIAssistant({ selectedFile, fileContent, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I'm your AI coding assistant. I can help you with code review, debugging, refactoring, and answering questions about your code. What would you like to work on?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    {
      icon: Code,
      label: "Review Code",
      prompt: "Please review the current file for best practices and potential improvements.",
    },
    { icon: Bug, label: "Find Bugs", prompt: "Help me find potential bugs or issues in this code." },
    { icon: Lightbulb, label: "Optimize", prompt: "How can I optimize this code for better performance?" },
    { icon: FileText, label: "Document", prompt: "Help me add proper documentation and comments to this code." },
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
        content: generateAIResponse(content, selectedFile, fileContent),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1000)
  }

  const generateAIResponse = (prompt: string, file: string | null, content: string) => {
    if (prompt.toLowerCase().includes("review")) {
      return `I've analyzed your ${file || "code"} and here are my suggestions:\n\n✅ **Good practices found:**\n- Clean component structure\n- Proper TypeScript usage\n\n🔧 **Improvements:**\n- Consider adding error handling\n- Add prop validation\n- Consider memoization for performance\n\nWould you like me to show you specific examples?`
    }

    if (prompt.toLowerCase().includes("bug")) {
      return `I've scanned your code for potential issues:\n\n🐛 **Potential Issues:**\n- Missing error boundaries\n- Possible memory leaks in useEffect\n- Unhandled promise rejections\n\n💡 **Recommendations:**\n- Add try-catch blocks\n- Clean up event listeners\n- Validate user inputs\n\nShall I help you fix any of these?`
    }

    if (prompt.toLowerCase().includes("optimize")) {
      return `Here are optimization opportunities for your code:\n\n⚡ **Performance:**\n- Use React.memo for expensive components\n- Implement virtual scrolling for large lists\n- Lazy load components\n\n📦 **Bundle size:**\n- Tree shake unused imports\n- Use dynamic imports\n- Optimize images and assets\n\nWhich area would you like to focus on?`
    }

    return `I understand you want help with: "${prompt}"\n\nBased on your current file (${file || "no file selected"}), I can assist with:\n\n- Code review and best practices\n- Bug detection and fixes\n- Performance optimization\n- Adding documentation\n- Refactoring suggestions\n\nWhat specific aspect would you like me to focus on?`
  }

  return (
    <div className="h-full flex flex-col bg-background border-l">
      <div className="border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">AI Assistant</h3>
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}>
              {message.type === "ai" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-100">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <Card className={`max-w-[80%] ${message.type === "user" ? "bg-blue-500 text-white" : ""}`}>
                <CardContent className="p-3">
                  <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  <div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
                </CardContent>
              </Card>

              {message.type === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-blue-100">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <Card>
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
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              size="sm"
              className="justify-start gap-2 h-8 text-xs"
              onClick={() => sendMessage(action.prompt)}
            >
              <action.icon className="w-3 h-3" />
              {action.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your code..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
            disabled={isLoading}
          />
          <Button onClick={() => sendMessage(input)} disabled={isLoading || !input.trim()} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
