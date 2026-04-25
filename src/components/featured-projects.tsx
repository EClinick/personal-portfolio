import { useEffect, useState, useRef } from "react"
import { ExternalLink } from "lucide-react"

// Import project images
import planGenieImage from "../assets/plangenie.jpg"
import tanaiImage from "../assets/tanai.jpeg"
import vcryptImage from "../assets/vcrypt.png"

const projects = [
  {
    id: 1,
    name: "TradeMind",
    tech: "React + TypeScript",
    description:
      "A smart trading journal and analytics platform helping traders boost profitability through automation and behavioral insights. Launched in 2025, already serving 1,000+ monthly active users.",
    image: "https://wxvmssqfidodxyoxjtju.supabase.co/storage/v1/object/public/non-protected-route-imgs/Landing-Page/image-dashboard.png",
    tags: ["AI Analytics", "Trading", "Full Stack"],
    liveUrl: "https://trademind.pro",
  },
  {
    id: 2,
    name: "PlanGenie",
    tech: "React + AI",
    description:
      "An AI-powered task management platform built specifically for neurodivergent minds. Adapts to your unique thought process, helping break down complex tasks and providing a natural organization flow.",
    image: planGenieImage,
    tags: ["AI Agent", "Accessibility", "Task Management"],
    liveUrl: "https://plangenie.net",
  },
  {
    id: 3,
    name: "Tan.ai",
    tech: "React Native + AI",
    description:
      "An AI-driven iOS app offering personalized tanning advice using custom-trained models. Currently in beta with planned public release in Summer 2024.",
    image: tanaiImage,
    tags: ["AI", "iOS", "Health & Wellness"],
    liveUrl: null,
  },
  {
    id: 4,
    name: "Vcrypt Software",
    tech: "Rust + React Native",
    description:
      "Cloud-based trading algorithms with a Rust backend and React Native frontend. Advanced financial technology solutions for modern algorithmic trading.",
    image: vcryptImage,
    tags: ["Fintech", "Rust", "Trading Algorithms"],
    liveUrl: "https://vcryptfinancial.com",
  },
]

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [userInteracting, setUserInteracting] = useState(false)
  const [programmaticScrolling, setProgrammaticScrolling] = useState(false)

  const scrollToProject = (projectIndex: number) => {
    if (!sectionRef.current) return
    const sectionHeight = sectionRef.current.offsetHeight
    const windowHeight = window.innerHeight
    const sectionTop = sectionRef.current.offsetTop
    const targetProgress = projectIndex / (projects.length - 1)
    const effectiveScrollHeight = sectionHeight - windowHeight / 2
    const targetScrollY = sectionTop + targetProgress * effectiveScrollHeight - windowHeight / 2
    window.scrollTo({ top: Math.max(0, targetScrollY), behavior: "smooth" })
  }

  const handleDotClick = (projectIndex: number) => {
    setUserInteracting(true)
    setProgrammaticScrolling(true)
    setActiveProject(projectIndex)
    scrollToProject(projectIndex)
    setTimeout(() => setProgrammaticScrolling(false), 1000)
    setTimeout(() => setUserInteracting(false), 3000)
  }

  useEffect(() => {
    let timeoutId: number

    const handleScroll = () => {
      if (window.innerWidth < 768) return
      if (userInteracting || programmaticScrolling) return
      if (!sectionRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const sectionTop = sectionRect.top
      const sectionHeight = sectionRect.height
      const windowHeight = window.innerHeight

      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) return

      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight / 2 - sectionTop) / (sectionHeight - windowHeight / 2)),
      )
      const clampedIndex = Math.max(0, Math.min(projects.length - 1, Math.floor(scrollProgress * projects.length)))
      if (clampedIndex !== activeProject) setActiveProject(clampedIndex)
    }

    const handleUserInteraction = () => {
      setUserInteracting(true)
      clearTimeout(timeoutId)
      timeoutId = window.setTimeout(() => setUserInteracting(false), 2000)
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleUserInteraction)
    window.addEventListener("touchstart", handleUserInteraction)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
      clearTimeout(timeoutId)
    }
  }, [activeProject, userInteracting, programmaticScrolling])

  const current = projects[activeProject]

  return (
    <>
      {/* ── Desktop: sticky scroll layout ── */}
      <section
        id="projects-sticky"
        ref={sectionRef}
        className="hidden md:block relative bg-black"
        style={{ height: `${100 + projects.length * 100}vh` }}
      >
        {/* Section heading — constrained to match page width */}
        <div className="max-w-3xl mx-auto px-6 pt-16 pb-4">
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
        </div>

        {/* Sticky content */}
        <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-6 py-8 min-h-0">

            {/* Preview card */}
            <div className="flex-1 min-h-0 relative">
              {projects.map((project, index) => {
                const isActive = index === activeProject
                const isNext = index > activeProject

                if (index < activeProject) return null

                const transform = isActive
                  ? "translateY(0px) scale(1)"
                  : `translateY(${(index - activeProject) * 18}px) scale(${1 - (index - activeProject) * 0.04})`

                return (
                  <div
                    key={project.id}
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{ transform, zIndex: projects.length - index }}
                  >
                    <div className="border border-zinc-800 rounded-xl h-full overflow-hidden relative">
                      {!project.liveUrl ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-white z-10">
                          <span className="text-4xl mb-3">🚧</span>
                          <span className="text-lg font-mono font-semibold mb-1">In Development</span>
                          <span className="text-sm text-gray-500 font-mono">Live preview coming soon</span>
                        </div>
                      ) : (
                        <iframe
                          src={project.liveUrl}
                          title={project.name}
                          className="absolute inset-0 w-full h-full border-0"
                          allow="fullscreen"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Project info bar */}
            <div className="shrink-0 pt-6 pb-2">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-2xl font-bold text-white">{current.name}</h3>
                {current.liveUrl && (
                  <a
                    href={current.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-white text-xs font-mono flex items-center gap-1 shrink-0 mt-1"
                  >
                    info <ExternalLink size={10} />
                  </a>
                )}
              </div>
              <p className="text-gray-400 text-sm font-mono leading-relaxed mb-4 max-w-3xl">
                {current.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-gray-400 font-mono"
                  >
                    @{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {projects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleDotClick(index)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        index === activeProject ? "bg-white w-6" : "bg-zinc-700 w-1.5 hover:bg-zinc-500"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-xs font-mono">
                  {String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Mobile: card list ── */}
      <section className="md:hidden bg-black py-16 px-6">
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-all">
              {/* Preview */}
              <div className="h-52 relative">
                {!project.liveUrl ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-white">
                    <span className="text-3xl mb-2">🚧</span>
                    <span className="text-sm font-mono text-gray-400">In Development</span>
                  </div>
                ) : (
                  <iframe
                    src={project.liveUrl}
                    title={project.name}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="fullscreen"
                    loading="lazy"
                  />
                )}
              </div>
              {/* Info */}
              <div className="p-4 border-t border-zinc-800">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">{project.name}</h3>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white text-xs font-mono flex items-center gap-1 shrink-0 mt-0.5"
                    >
                      info <ExternalLink size={10} />
                    </a>
                  )}
                </div>
                <p className="text-gray-400 text-xs font-mono leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-800 text-gray-500 font-mono"
                    >
                      @{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
