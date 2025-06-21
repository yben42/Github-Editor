"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, X, Lightbulb, Bug, Sparkles, Heart } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface FriendlyAIProps {
  selectedFile: string | null
  fileContent: string
  onClose: () => void
}

export function FriendlyAI({ selectedFile, fileContent, onClose }: FriendlyAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi there! 👋 I'm your friendly AI helper. I'm here to help you with your code - no matter if you're a beginner or expert! What would you like help with today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickHelp = [
    {
      icon: Lightbulb,
      label: "Explain this code",
      prompt: "Can you explain what this code does in simple terms?",
      color: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    },
    {
      icon: Bug,
      label: "Fix problems",
      prompt: "Help me find and fix any problems in this code",
      color: "bg-red-100 text-red-700 hover:bg-red-200",
    },
    {
      icon: Sparkles,
      label: "Make it better",
      prompt: "How can I improve this code to make it work better?",
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    },
    {
      icon: Heart,
      label: "Make it prettier",
      prompt: "Help me make this look more attractive and user-friendly",
      color: "bg-pink-100 text-pink-700 hover:bg-pink-200",
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
        content: generateFriendlyResponse(content, selectedFile, fileContent),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateFriendlyResponse = (prompt: string, file: string | null, content: string) => {
    if (prompt.toLowerCase().includes("explain")) {
      return `Great question! Let me break down your ${file || "code"} in simple terms:\n\n🔍 **What it does:**\nThis code creates a webpage that shows information to visitors. Think of it like creating a digital poster!\n\n📝 **The main parts:**\n• The HTML creates the structure (like the frame of a house)\n• The CSS makes it look pretty (like painting and decorating)\n• Any text you see will appear on the webpage\n\n💡 **In everyday terms:**\nImagine you're making a flyer - this code is doing the same thing, but for the internet!\n\nWant me to explain any specific part in more detail?`
    }

    if (prompt.toLowerCase().includes("fix") || prompt.toLowerCase().includes("problem")) {
      return `I've looked at your code and here's what I found:\n\n✅ **Good news:** Your code looks pretty solid!\n\n🔧 **Small suggestions:**\n• Everything seems to be working correctly\n• Your HTML structure is clean and organized\n• The styling looks good\n\n💡 **To make it even better:**\n• You could add more colors to make it more vibrant\n• Consider adding some images to make it more engaging\n• Maybe add some interactive buttons\n\nIs there something specific that's not working the way you expected?`
    }

    if (prompt.toLowerCase().includes("better") || prompt.toLowerCase().includes("improve")) {
      return `Awesome! I love that you want to make your code even better! Here are some friendly suggestions:\n\n🚀 **Easy improvements:**\n• Add some fun colors to make it more eye-catching\n• Include some images or icons to make it more visual\n• Add smooth animations when people hover over things\n\n✨ **Next level ideas:**\n• Make it work great on phones and tablets\n• Add a contact form so people can reach you\n• Include social media links\n\n🎯 **Pro tip:**\nStart with one small change at a time - it's more fun and less overwhelming!\n\nWhich of these sounds most interesting to you?`
    }

    if (prompt.toLowerCase().includes("prettier") || prompt.toLowerCase().includes("attractive")) {
      return `I love that you want to make it look amazing! Here are some design ideas:\n\n🎨 **Color magic:**\n• Try using complementary colors (like blue and orange)\n• Add gradients for a modern look\n• Use consistent colors throughout\n\n✨ **Visual appeal:**\n• Add some nice fonts from Google Fonts\n• Include some spacing between elements (breathing room!)\n• Round the corners of boxes for a friendlier feel\n\n🖼️ **Make it pop:**\n• Add subtle shadows to make things "float"\n• Use icons instead of just text\n• Include some beautiful background patterns\n\nWant me to show you how to add any of these specific touches?`
    }

    return `Thanks for your question! I'm here to help make coding easier and more fun.\n\n🤔 **About your ${file || "file"}:**\nI can see you're working on something interesting! \n\n💬 **I can help you with:**\n• Explaining how things work in simple terms\n• Finding and fixing any issues\n• Making your code work better\n• Making it look more attractive\n• Adding new features\n\n❓ **What specifically would you like help with?**\nJust ask me anything - I'm here to help, and no question is too basic or too advanced!\n\nFeel free to use the quick help buttons above, or just tell me what you're trying to do! 😊`
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
              <h3 className="font-semibold text-gray-900">AI Helper</h3>
              <p className="text-xs text-gray-600">Always here to help! 😊</p>
            </div>
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

      {/* Quick Help Buttons */}
      <div className="border-t bg-white p-4">
        <p className="text-sm text-gray-600 mb-3 text-center">Quick help options:</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickHelp.map((action) => (
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
            placeholder="Ask me anything about your code..."
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
