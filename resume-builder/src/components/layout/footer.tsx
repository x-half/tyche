import Link from "next/link"
import { FileText } from "lucide-react"

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link href="/" className="flex items-center space-x-2 mb-3 justify-center md:justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg">ResumeBuilder</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              专业简历制作工具，助你轻松打造完美简历
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <button 
              onClick={() => scrollToSection("features")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              功能
            </button>
            <button 
              onClick={() => scrollToSection("templates")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              模板
            </button>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              我的简历
            </Link>
            <span className="text-muted-foreground">
              © {new Date().getFullYear()} ResumeBuilder
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}