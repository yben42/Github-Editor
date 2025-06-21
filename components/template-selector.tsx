"\"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Code, GraduationCap, Palette } from "lucide-react"

interface Template {
  id: string
  name: string
  description: string
  icon: any
  color: string
  category: string
  preview: string
  content: string
}

const templates: Template[] = [
  {
    id: "developer",
    name: "Full-Stack Developer",
    description: "Perfect for showcasing your coding skills and technical projects",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    category: "Developer",
    preview: "👋 Full-stack developer passionate about creating amazing web experiences...",
    content: `# 👋 Hi! I'm [Your Name]

## 🚀 Full-Stack Developer
I'm passionate about creating amazing web experiences and solving complex problems through code.

- 🔭 **Currently working on:** [Your current project]
- 🌱 **Learning:** [What you're currently learning]
- 👯 **Looking to collaborate on:** Open source projects
- 💬 **Ask me about:** JavaScript, React, Node.js, and web development
- 📫 **How to reach me:** [Your email]
- ⚡ **Fun fact:** [Something interesting about you]

## 🛠️ Tech Stack

### Frontend
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)

## 📊 GitHub Stats

![Your GitHub stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=dark)

## 🚀 Featured Projects

### 🌟 [Project Name](link-to-project)
Brief description of your amazing project and the technologies used.

### 🎯 [Another Project](link-to-project)
Another cool project that showcases your skills.

## 📫 Let's Connect!

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](your-linkedin-url)
[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](your-twitter-url)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:your.email@example.com)

---
💻 Happy coding! | [YourUsername](https://github.com/yourusername)`,
  },
  {
    id: "student",
    name: "Computer Science Student",
    description: "Great for students showcasing their learning journey and projects",
    icon: GraduationCap,
    color: "from-green-500 to-teal-500",
    category: "Student",
    preview: "🎓 CS Student passionate about learning and building cool projects...",
    content: `# 🎓 Hey there! I'm [Your Name]

## 📚 Computer Science Student
I'm a passionate CS student who loves learning new technologies and building cool projects!

- 🏫 **Studying:** [Your Degree] at [Your University]
- 📅 **Expected Graduation:** [Year]
- 🔭 **Currently learning:** [Technologies you're learning]
- 🌱 **Working on:** [Current projects or assignments]
- 👯 **Looking for:** Internship opportunities and study groups
- 💬 **Ask me about:** [Your favorite subjects or technologies]
- ⚡ **Fun fact:** [Something interesting about you]

## 📖 What I'm Learning

### Programming Languages
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Java](https://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![C++](https://img.shields.io/badge/-C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white)

### Subjects I Love
- 🧮 **Data Structures & Algorithms**
- 🤖 **Machine Learning**
- 🌐 **Web Development**
- 💾 **Database Systems**
- 🔒 **Cybersecurity**

## 🚀 My Projects

### 🎯 [School Project Name](link)
Description of a cool project you built for class or on your own.
**Tech used:** Python, Flask, SQLite

### 🌟 [Personal Project](link)
A fun side project that shows your creativity and skills.
**Tech used:** React, Node.js, MongoDB

### 📱 [Mobile App](link)
Maybe a mobile app you're working on or planning to build.
**Tech used:** React Native, Firebase

## 📊 My GitHub Journey

![Your GitHub stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=radical)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=yourusername&layout=compact&theme=radical)

## 🏆 Achievements & Goals

### ✅ Completed
- [x] Built my first web application
- [x] Learned Python and Java
- [x] Completed Data Structures course
- [x] Created my first mobile app

### 🎯 Current Goals
- [ ] Land a summer internship
- [ ] Contribute to open source projects
- [ ] Learn cloud technologies (AWS/Azure)
- [ ] Build a full-stack application

## 📫 Let's Connect!

I'm always excited to meet fellow students and developers!

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](your-linkedin-url)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:your.email@example.com)
[![Discord](https://img.shields.io/badge/-Discord-5865F2?style=flat-square&logo=discord&logoColor=white)](your-discord-url)

---
🚀 Learning, building, and growing every day! | [YourUsername](https://github.com/yourusername)`,
  },
  {
    id: "designer",
    name: "UI/UX Designer",
    description: "Showcase your design work and creative process",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    category: "Designer",
    preview: "🎨 UI/UX Designer crafting beautiful and intuitive user experiences...",
    content: `# 🎨 Hello! I'm [Your Name]

## ✨ UI/UX Designer & Creative Problem Solver
I'm passionate about creating beautiful, intuitive, and user-centered digital experiences that make people's lives easier and more delightful.

- 🎯 **Currently designing:** [Current project or role]
- 🌱 **Learning:** [New design tools or methodologies]
- 🤝 **Collaborating on:** [Design projects or teams]
- 💭 **Ask me about:** User experience, design systems, and creative processes
- 📧 **Reach me at:** [Your email]
- 🎪 **Fun fact:** [Something creative about you]

## 🛠️ Design Toolkit

### Design Tools
![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
![Adobe XD](https://img.shields.io/badge/-Adobe%20XD-FF61F6?style=flat-square&logo=adobe-xd&logoColor=white)
![Sketch](https://img.shields.io/badge/-Sketch-F7B500?style=flat-square&logo=sketch&logoColor=white)
![Adobe Illustrator](https://img.shields.io/badge/-Illustrator-FF9A00?style=flat-square&logo=adobe-illustrator&logoColor=white)
![Adobe Photoshop](https://img.shields.io/badge/-Photoshop-31A8FF?style=flat-square&logo=adobe-photoshop&logoColor=white)

### Frontend Skills
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black)

## 🎨 Design Philosophy

> "Good design is obvious. Great design is transparent." - Joe Sparano

I believe in:
- 👥 **User-centered design** - Always putting users first
- 🎯 **Simplicity** - Making complex things feel simple
- ♿ **Accessibility** - Design that works for everyone
- 🔄 **Iteration** - Continuous improvement through feedback
- 🤝 **Collaboration** - Great design happens in teams

## 🚀 Featured Work

### 🌟 [Project Name](link-to-case-study)
**Role:** Lead UI/UX Designer  
**Challenge:** [Brief description of the problem]  
**Solution:** [How you solved it]  
**Impact:** [Results and metrics]

### 🎯 [Mobile App Design](link-to-case-study)
**Role:** Product Designer  
**Challenge:** [Brief description]  
**Solution:** [Your approach]  
**Impact:** [Results achieved]

### 💼 [Website Redesign](link-to-case-study)
**Role:** UX Designer  
**Challenge:** [Problem statement]  
**Solution:** [Design solution]  
**Impact:** [Measurable outcomes]

## 🎪 Design Process

I follow a structured process to ensure that my designs are not only beautiful but also functional and user-friendly. Here are the key steps:

1. **Research & Discovery:** Understanding the user needs, business goals, and technical constraints.
2. **Concept Development:** Brainstorming and sketching initial ideas.
3. **Wireframing:** Creating low-fidelity wireframes to outline the structure.
4. **Prototyping:** Developing interactive prototypes to test user flows.
5. **User Testing:** Gathering feedback from real users to refine the design.
6. **Design Iteration:** Making adjustments based on user feedback and further research.
7. **Handoff & Implementation:** Preparing design assets for developers to implement.

This process helps me deliver high-quality designs that meet the needs of both users and stakeholders.

## 📫 Let's Connect!

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](your-linkedin-url)
[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](your-twitter-url)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:your.email@example.com)

---
🎨 Crafting digital experiences that delight users! | [YourUsername](https://github.com/yourusername)`,
  },
]

interface TemplateSelectorProps {
  onSelectTemplate: (template: string, content: string) => void
  onBack: () => void
}

export function TemplateSelector({ onSelectTemplate, onBack }: TemplateSelectorProps) {
  return (
    <div className="p-4">
      <Button variant="outline" onClick={onBack} className="mb-4 gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className={`bg-gradient-to-r ${template.color}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <template.icon className="h-6 w-6" />
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                </div>
                <Badge variant="outline">{template.category}</Badge>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{template.description}</p>
              <div className="mt-6">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => onSelectTemplate(template.name, template.content)}
                >
                  Select Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
