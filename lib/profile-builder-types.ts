import type React from "react"
import { User, Code, Briefcase, GraduationCap, BarChart3, LinkIcon as LinkIconLucide, Mail, Type } from "lucide-react"

export type ComponentType =
  | "header"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "stats"
  | "socials"
  | "contact"
  | "custom-markdown"

export interface ProfileComponent {
  id: string
  type: ComponentType
  content: any // Markdown string or specific content object
  settings?: Record<string, any> // Component-specific settings
}

interface ExperienceItem {
  role: string
  company: string
  companyLink?: string
  logo?: string
  duration: string
  location?: string
  descriptionPoints: string[]
  technologies?: string[]
}

interface EducationItem {
  degree: string
  school: string
  schoolLink?: string
  logo?: string
  duration: string
  location?: string
  descriptionPoints?: string[]
  gpa?: string
}

export const componentRegistry: Record<
  ComponentType,
  { name: string; icon: React.ElementType; defaultContent: any; defaultSettings?: Record<string, any> }
> = {
  header: {
    name: "Header / Banner",
    icon: User,
    defaultContent: { title: "Hi there 👋", subtitle: "Welcome!" },
    defaultSettings: { bannerImage: "/placeholder.svg?width=1200&height=300" },
  },
  about: { name: "About Me", icon: User, defaultContent: "Tell us about yourself..." },
  skills: {
    name: "Skills Showcase",
    icon: Code,
    defaultContent: { languages: ["JavaScript"], frameworks: ["React"], tools: ["Git"] },
    defaultSettings: { displayStyle: "badges" },
  },
  projects: {
    name: "Projects",
    icon: Briefcase,
    defaultContent: [{ name: "My Project", description: "A cool project I built.", link: "#", tags: ["Demo"] }],
  },
  experience: {
    name: "Work Experience",
    icon: Briefcase,
    defaultContent: [
      {
        role: "Software Engineer",
        company: "Tech Solutions Inc.",
        companyLink: "https://example.com",
        logo: "/placeholder.svg?width=50&height=50",
        duration: "Jan 2022 - Present",
        location: "San Francisco, CA",
        descriptionPoints: [
          "Developed and maintained web applications using React and Node.js.",
          "Collaborated with cross-functional teams to deliver high-quality software.",
          "Implemented new features and optimized existing codebase for performance.",
        ],
        technologies: ["React", "Node.js", "TypeScript", "AWS"],
      },
    ] as ExperienceItem[],
  },
  education: {
    name: "Education",
    icon: GraduationCap,
    defaultContent: [
      {
        degree: "B.S. in Computer Science",
        school: "University of Technology",
        schoolLink: "https://example.edu",
        logo: "/placeholder.svg?width=50&height=50",
        duration: "Aug 2018 - May 2022",
        location: "Techville, USA",
        descriptionPoints: [
          "Relevant Coursework: Data Structures, Algorithms, Web Development, AI.",
          "Graduated with Honors (Summa Cum Laude).",
          "Senior Thesis: [Your Thesis Title].",
        ],
        gpa: "3.9/4.0",
      },
    ] as EducationItem[],
  },
  stats: {
    name: "GitHub Stats",
    icon: BarChart3,
    defaultContent: { username: "yourusername" },
    defaultSettings: { theme: "dark", showIcons: true },
  },
  socials: {
    name: "Social Links",
    icon: LinkIconLucide,
    defaultContent: { linkedin: "", twitter: "", github: "yourusername" },
  },
  contact: {
    name: "Contact Me",
    icon: Mail,
    defaultContent: { email: "your@email.com", message: "Feel free to reach out!" },
  },
  "custom-markdown": { name: "Custom Markdown", icon: Type, defaultContent: "### New Section\n\nYour markdown here." },
}
