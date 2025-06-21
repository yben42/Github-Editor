import type { ProfileComponent } from "./profile-builder-types"

export function componentToMarkdown(component: ProfileComponent, userData: any): string {
  const username = component.content?.username || userData?.username || "yourusername"

  switch (component.type) {
    case "header":
      let headerMd = ""
      if (component.settings?.bannerImage) {
        headerMd += `![Banner](${component.settings.bannerImage})\n\n`
      }
      headerMd += `# ${component.content.title || "Hi there 👋"}\n`
      if (component.content.subtitle) {
        headerMd += `### ${component.content.subtitle}\n`
      }
      return headerMd
    case "about":
      return `## 💬 About Me\n\n${component.content || "Tell us about yourself..."}`
    case "skills":
      let skillsMd = "## 🛠️ Skills & Technologies\n\n"
      const { languages = [], frameworks = [], tools = [] } = component.content
      const createBadge = (skill: string, color: string, logo?: string) =>
        `![${skill}](https://img.shields.io/badge/${encodeURIComponent(skill)}-${color}?style=flat-square&logo=${logo || encodeURIComponent(skill.toLowerCase().replace(/\s/g, ""))}&logoColor=white)`

      if (languages.length > 0)
        skillsMd += `**Languages:** ${languages.map((s: string) => createBadge(s, "F7DF1E", "javascript")).join(" ")}\n` // Example: JS yellow
      if (frameworks.length > 0)
        skillsMd += `**Frameworks/Libraries:** ${frameworks.map((s: string) => createBadge(s, "61DAFB", "react")).join(" ")}\n` // Example: React blue
      if (tools.length > 0)
        skillsMd += `**Tools & Platforms:** ${tools.map((s: string) => createBadge(s, "007ACC", "visualstudiocode")).join(" ")}\n` // Example: VSCode blue
      return skillsMd
    case "projects":
      let projectsMd = "## 🚀 Featured Projects\n\n"
      ;(component.content || []).forEach((proj: any) => {
        projectsMd += `### [${proj.name || "Project Title"}](${proj.link || "#"})\n`
        projectsMd += `${proj.description || "Project description."}\n`
        if (proj.tags && proj.tags.length > 0) {
          projectsMd += `*Technologies: ${proj.tags.join(", ")}*\n\n`
        } else {
          projectsMd += "\n"
        }
      })
      return projectsMd
    case "experience":
      let expMd = "## 💼 Work Experience\n\n"
      ;(component.content || []).forEach((exp: any) => {
        expMd += `### ${exp.role || "Role"} at ${exp.companyLink ? `[${exp.company || "Company"}](${exp.companyLink})` : exp.company || "Company"}\n`
        if (exp.logo) {
          expMd += `<img src="${exp.logo}" alt="${exp.company} logo" width="20" height="20" align="left" style="margin-right: 5px;"/> `
        }
        expMd += `*${exp.duration || "Dates"}*\n`
        if (exp.location) {
          expMd += `*${exp.location}*\n`
        }
        if (exp.descriptionPoints && exp.descriptionPoints.length > 0) {
          exp.descriptionPoints.forEach((point: string) => {
            expMd += `- ${point}\n`
          })
        }
        if (exp.technologies && exp.technologies.length > 0) {
          expMd += `**Technologies:** ${exp.technologies.join(", ")}\n`
        }
        expMd += "\n"
      })
      return expMd
    case "education":
      let eduMd = "## 🎓 Education\n\n"
      ;(component.content || []).forEach((edu: any) => {
        eduMd += `### ${edu.degree || "Degree"} - ${edu.schoolLink ? `[${edu.school || "Institution"}](${edu.schoolLink})` : edu.school || "Institution"}\n`
        if (edu.logo) {
          eduMd += `<img src="${edu.logo}" alt="${edu.school} logo" width="20" height="20" align="left" style="margin-right: 5px;"/> `
        }
        eduMd += `*${edu.duration || "Graduation Year"}*\n`
        if (edu.location) {
          eduMd += `*${edu.location}*\n`
        }
        if (edu.descriptionPoints && edu.descriptionPoints.length > 0) {
          edu.descriptionPoints.forEach((point: string) => {
            eduMd += `- ${point}\n`
          })
        }
        if (edu.gpa) {
          eduMd += `**GPA:** ${edu.gpa}\n`
        }
        eduMd += "\n"
      })
      return eduMd
    case "stats":
      const theme = component.settings?.theme || "dark"
      const showIcons = component.settings?.showIcons !== false
      return `## 📊 GitHub Stats\n\n<p align="center">\n  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=${showIcons}&theme=${theme}&count_private=true&hide_border=true&bg_color=00000000&rank_icon=github" alt="${username}'s GitHub stats"/>\n  <br/>\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&hide_border=true&bg_color=00000000&langs_count=8" alt="Top Languages"/>\n</p>`
    case "socials":
      let socialsMd = "## 📫 Let's Connect!\n\n<p align='left'>\n"
      const { linkedin, twitter, portfolio, github, email, website } = component.content
      const createSocialBadge = (
        platform: string,
        user_or_url: string,
        color: string,
        logo: string,
        altText?: string,
      ) => {
        const href =
          platform === "email"
            ? `mailto:${user_or_url}`
            : user_or_url.startsWith("http")
              ? user_or_url
              : `https://${platform}.com/${user_or_url}`
        return `<a href="${href}" target="_blank" rel="noopener noreferrer">\n  <img src="https://img.shields.io/badge/${encodeURIComponent(altText || platform.charAt(0).toUpperCase() + platform.slice(1))}-${color}?style=flat-square&logo=${logo}&logoColor=white" alt="${altText || platform}"/>\n</a>`
      }
      if (linkedin) socialsMd += createSocialBadge("linkedin", linkedin, "0077B5", "linkedin") + "\n"
      if (twitter) socialsMd += createSocialBadge("twitter", twitter, "1DA1F2", "twitter") + "\n"
      if (github || username) socialsMd += createSocialBadge("github", github || username, "181717", "github") + "\n"
      if (portfolio) socialsMd += createSocialBadge("linktree", portfolio, "39E09B", "linktree", "Portfolio") + "\n"
      if (website) socialsMd += createSocialBadge("globe", website, "FF69B4", "firefoxbrowser", "Website") + "\n"
      if (email) socialsMd += createSocialBadge("email", email, "D14836", "gmail", "Email Me") + "\n"
      socialsMd += "</p>"
      return socialsMd
    case "contact":
      return `## 📧 Contact Me\n\n${component.content.message || "Feel free to reach out!"}\n\n[Email Me](mailto:${component.content.email || "your@email.com"})`
    case "custom-markdown":
      return component.content || ""
    default:
      const exhaustiveCheck: never = component.type
      return `<!-- Unknown component type: ${exhaustiveCheck} -->`
  }
}
