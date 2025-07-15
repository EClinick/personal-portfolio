//import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import { useEffect, useState, useRef } from "react"

const projects = [
  {
    id: 1,
    name: "Audacity",
    tech: "React.js",
    description:
      "A revolutionary platform that redefines how we share and experience aesthetics online. Whether you're exploring new creative horizons or building your digital presence, Audacity offers a seamless and intuitive experience.",
    color: "from-purple-900 via-blue-900 to-indigo-900",
    mockupContent: {
      title: "Audacity",
      subtitle: "A New way to share Aesthetics",
      interface: "social",
    },
  },
  {
    id: 2,
    name: "Fix My Code",
    tech: "Next.js",
    description:
      "An intelligent code review platform that helps developers identify bugs, optimize performance, and improve code quality through AI-powered analysis and collaborative peer reviews.",
    color: "from-green-900 via-emerald-900 to-teal-900",
    mockupContent: {
      title: "Fix My Code",
      subtitle: "AI-Powered Code Review",
      interface: "code",
    },
  },
  {
    id: 3,
    name: "AirBnb Clone",
    tech: "MERN Stack",
    description:
      "A full-featured vacation rental platform with advanced search filters, real-time booking, secure payments, and an intuitive host dashboard for property management.",
    color: "from-red-900 via-pink-900 to-rose-900",
    mockupContent: {
      title: "AirBnb Clone",
      subtitle: "Vacation Rental Platform",
      interface: "booking",
    },
  },
]

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [userInteracting, setUserInteracting] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleScroll = () => {
      if (userInteracting) return

      if (!sectionRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRect.height
      const sectionTop = sectionRect.top
      const windowHeight = window.innerHeight

      // Only trigger if section is in viewport
      if (sectionTop > windowHeight || sectionTop + sectionHeight < 0) return

      // Calculate scroll progress within the section
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight / 2 - sectionTop) / (sectionHeight - windowHeight / 2)),
      )

      // Determine which project should be active based on scroll progress
      const projectIndex = Math.floor(scrollProgress * projects.length)
      const clampedIndex = Math.max(0, Math.min(projects.length - 1, projectIndex))

      if (clampedIndex !== activeProject) {
        setActiveProject(clampedIndex)
      }
    }

    const handleUserInteraction = () => {
      setUserInteracting(true)
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setUserInteracting(false)
      }, 2000) // Resume auto-scroll after 2 seconds of no interaction
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("click", handleUserInteraction)
    window.addEventListener("touchstart", handleUserInteraction)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("click", handleUserInteraction)
      window.removeEventListener("touchstart", handleUserInteraction)
      clearTimeout(timeoutId)
    }
  }, [activeProject, userInteracting])

  const currentProject = projects[activeProject]

  return (
    <section ref={sectionRef} className="py-20 bg-black min-h-[200vh]">
      <div className="container mx-auto px-6">
        <div className="sticky top-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Device Mockups */}
            <ScrollSlideIn className="relative">
              <div className="relative">
                {/* Main Device Mockup */}
                <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-all duration-700">
                  <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl border border-gray-800">
                    <div className="bg-black rounded-2xl overflow-hidden">
                      {/* Device Screen Content */}
                      <div
                        className={`aspect-[4/3] bg-gradient-to-br ${currentProject.color} relative transition-all duration-1000`}
                      >
                        <div className="absolute inset-0 bg-black/20" />

                        {/* Simulated App Interface */}
                        <div className="absolute inset-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 bg-red-500 rounded-full" />
                              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                              <div className="w-3 h-3 bg-green-500 rounded-full" />
                            </div>
                          </div>

                          {/* Dynamic Interface Based on Project */}
                          {currentProject.mockupContent.interface === "social" && (
                            <div className="space-y-3">
                              <div className="grid grid-cols-3 gap-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="aspect-square bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center"
                                  >
                                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-lg" />
                                  </div>
                                ))}
                              </div>
                              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full" />
                                  <div className="flex-1">
                                    <div className="h-3 bg-white/30 rounded mb-2" />
                                    <div className="h-2 bg-white/20 rounded w-2/3" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {currentProject.mockupContent.interface === "code" && (
                            <div className="space-y-3">
                              <div className="bg-gray-900/50 rounded-lg p-3 font-mono text-xs space-y-1">
                                <div className="text-green-400">{"function fixCode() {"}</div>
                                <div className="text-white ml-4">{"  return optimized;"}</div>
                                <div className="text-green-400">{"}"}</div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-red-500/20 rounded p-2 text-xs text-red-300">3 Issues</div>
                                <div className="bg-green-500/20 rounded p-2 text-xs text-green-300">Fixed</div>
                              </div>
                            </div>
                          )}

                          {currentProject.mockupContent.interface === "booking" && (
                            <div className="space-y-3">
                              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                                <div className="h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg mb-2" />
                                <div className="h-2 bg-white/30 rounded mb-1" />
                                <div className="h-2 bg-white/20 rounded w-3/4" />
                              </div>
                              <div className="flex space-x-2">
                                <div className="flex-1 bg-white/10 rounded-lg p-2">
                                  <div className="h-2 bg-white/30 rounded" />
                                </div>
                                <div className="w-16 bg-orange-500/30 rounded-lg flex items-center justify-center">
                                  <div className="text-xs text-orange-300">Book</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Device Mockups */}
                <div className="absolute -top-8 -right-8 transform -rotate-12 z-0 transition-all duration-700">
                  <div className="bg-gray-900 rounded-2xl p-3 shadow-xl border border-gray-800 w-32 h-48">
                    <div
                      className={`bg-gradient-to-b ${currentProject.color} rounded-xl h-full flex items-center justify-center transition-all duration-1000`}
                    >
                      <div className="text-white text-xs font-bold">Mobile</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 transform rotate-6 z-0 transition-all duration-700">
                  <div className="bg-gray-900 rounded-xl p-2 shadow-xl border border-gray-800 w-24 h-32">
                    <div
                      className={`bg-gradient-to-b ${currentProject.color} rounded-lg h-full flex items-center justify-center transition-all duration-1000`}
                    >
                      <div className="text-white text-xs font-bold">App</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Branding */}
              <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-all duration-700">
                <h3 className="text-3xl font-bold text-white mb-2">{currentProject.mockupContent.title}</h3>
                <p className="text-gray-400 text-sm">{currentProject.mockupContent.subtitle}</p>
              </div>
            </ScrollSlideIn>

            {/* Right Side - Project Info */}
            <ScrollFadeIn delay={200} className="space-y-8">
              <div className="text-2xl">✱</div>

              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl font-light leading-tight">
                  SOME
                  <br />
                  <span className="font-semibold">FEATURED</span>
                  <br />
                  <span className="font-semibold">PROJECTS</span>
                </h2>

                <Link to="/projects">
                  <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-3 rounded-full text-lg">
                    ✱ Go to Projects Page
                  </button>
                </Link>
              </div>

              {/* Project List */}
              <div className="space-y-4 mt-12">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    ref={(el) => (projectRefs.current[index] = el)}
                    onClick={() => setActiveProject(index)}
                    className={`p-4 rounded-xl transition-all duration-500 cursor-pointer ${
                      index === activeProject
                        ? "bg-white/10 border border-white/20 scale-105"
                        : "hover:bg-white/5 opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{project.name}</span>
                      <span className="text-gray-400 text-sm">:: {project.tech}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="flex space-x-2 mt-8">
                {projects.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      index === activeProject ? "bg-orange-500 w-8" : "bg-white/20 w-4"
                    }`}
                  />
                ))}
              </div>
            </ScrollFadeIn>
          </div>

          {/* Bottom Description */}
          <ScrollFadeIn delay={600} className="mt-16 max-w-4xl">
            <p className="text-gray-400 text-lg leading-relaxed transition-all duration-700">
              {currentProject.description}{" "}
              <span className="text-orange-400 cursor-pointer hover:text-orange-300">
                click to See post on Dribbble...
              </span>
            </p>
          </ScrollFadeIn>
        </div>
      </div>
    </section>
  )
}
