"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, File, ImageIcon, Code } from "lucide-react"

interface SimpleFile {
  name: string
  type: "file" | "folder"
  description: string
  content?: string
  children?: SimpleFile[]
}

const sampleFiles: SimpleFile[] = [
  {
    name: "Home Page",
    type: "file",
    description: "The main page visitors see first",
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Welcome to My Website</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; }
        .welcome { background: #f0f8ff; padding: 20px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="welcome">
        <h1>Welcome to My Website!</h1>
        <p>This is where your visitors will land first.</p>
        <p>You can edit this text to say whatever you want!</p>
    </div>
</body>
</html>`,
  },
  {
    name: "About Page",
    type: "file",
    description: "Tell visitors about yourself",
    content: `<!DOCTYPE html>
<html>
<head>
    <title>About Me</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .about { max-width: 600px; }
        h1 { color: #2c3e50; }
    </style>
</head>
<body>
    <div class="about">
        <h1>About Me</h1>
        <p>Hi! I'm [Your Name] and this is my website.</p>
        <p>I love [your hobbies/interests].</p>
        <p>Feel free to look around and get in touch!</p>
    </div>
</body>
</html>`,
  },
  {
    name: "Contact Page",
    type: "file",
    description: "How people can reach you",
    content: `<!DOCTYPE html>
<html>
<head>
    <title>Contact Me</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .contact { max-width: 500px; }
        input, textarea { width: 100%; padding: 10px; margin: 5px 0; }
        button { background: #3498db; color: white; padding: 10px 20px; border: none; }
    </style>
</head>
<body>
    <div class="contact">
        <h1>Get In Touch</h1>
        <form>
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit">Send Message</button>
        </form>
    </div>
</body>
</html>`,
  },
  {
    name: "Style Sheet",
    type: "file",
    description: "Makes your website look pretty",
    content: `/* This file controls how your website looks */

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
}

h1, h2, h3 {
    color: #333;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #2980b9;
}`,
  },
]

interface SimpleFileExplorerProps {
  onFileSelect: (fileName: string, content: string) => void
}

export function SimpleFileExplorer({ onFileSelect }: SimpleFileExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().includes("style")) return Code
    if (fileName.toLowerCase().includes("image") || fileName.toLowerCase().includes("photo")) return ImageIcon
    return File
  }

  const getFileTypeColor = (fileName: string) => {
    if (fileName.toLowerCase().includes("style")) return "bg-purple-100 text-purple-700"
    if (fileName.toLowerCase().includes("home")) return "bg-blue-100 text-blue-700"
    return "bg-gray-100 text-gray-700"
  }

  const filteredFiles = sampleFiles.filter(
    (file) =>
      searchQuery === "" ||
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Your Files</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search your files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredFiles.map((file) => {
          const Icon = getFileIcon(file.name)
          const isSelected = selectedFile === file.name

          return (
            <div
              key={file.name}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "bg-blue-50 border-blue-200 shadow-sm" : "bg-white border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => {
                setSelectedFile(file.name)
                onFileSelect(file.name, file.content || "")
              }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${getFileTypeColor(file.name)}`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 mb-1">{file.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{file.description}</p>

                  <div className="mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {file.type === "file" ? "File" : "Folder"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filteredFiles.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <File className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No files found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
