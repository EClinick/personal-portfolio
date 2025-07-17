//import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { ScrollFadeIn, ScrollSlideIn } from "../components/scroll-animations"
import { useEffect, useState, useRef } from "react"

// Import project images
import planGenieImage from "../assets/plangenie.jpg"
import tanaiImage from "../assets/tanai.jpeg"
import vcryptImage from "../assets/vcrypt.png"

const projects = [
  {
    id: 1,
    name: "TradeMind",
    tech: "React + TypeScript",
    description: "TradeMind is a smart trading journal and analytics platform helping traders boost profitability through automation and behavioral insights. Launched in 2025, it's already serving 1,000+ monthly active users.",
    color: "from-green-600 via-emerald-700 to-teal-800",
    image: "https://wxvmssqfidodxyoxjtju.supabase.co/storage/v1/object/public/non-protected-route-imgs/Landing-Page/image-dashboard.png",
    tags: ["AI Analytics", "Trading", "Full Stack"],
    liveUrl: "https://trademind.pro",
    mockupContent: {
      title: "TradeMind",
      subtitle: "Smart Trading Journal & Analytics Platform",
      interface: "trading",
    },
  },
  {
    id: 2,
    name: "PlanGenie",
    tech: "React + AI",
    description: "An AI-powered task management platform built specifically for neurodivergent minds. PlanGenie adapts to your unique thought process, helping break down complex tasks and providing a natural organization flow.",
    color: "from-purple-600 via-purple-700 to-indigo-800",
    image: planGenieImage,
    tags: ["AI Agent", "Accessibility", "Task Management"],
    liveUrl: "https://plangenie.net",
    mockupContent: {
      title: "PlanGenie",
      subtitle: "AI-Powered Task Management for Neurodivergent Minds",
      interface: "productivity",
    },
  },
  {
    id: 3,
    name: "Tan.ai",
    tech: "React Native + AI",
    description: "An AI-driven iOS app offering personalized tanning advice using custom-trained models. Currently in beta testing phase with planned release in Summer 2024.",
    color: "from-orange-600 via-amber-700 to-yellow-800",
    image: tanaiImage,
    tags: ["AI", "iOS", "Health & Wellness"],
    liveUrl: "https://tanai.app/",
    mockupContent: {
      title: "Tan.ai",
      subtitle: "AI-Powered Personalized Tanning Advice",
      interface: "mobile",
    },
  },
  {
    id: 4,
    name: "Vcrypt Software",
    tech: "Rust + React Native",
    description: "Cloud-based trading algorithms with Rust backend and React Native frontend. Advanced financial technology solutions for modern trading.",
    color: "from-blue-600 via-indigo-700 to-purple-800",
    image: vcryptImage,
    tags: ["Fintech", "Rust", "Trading Algorithms"],
    liveUrl: "https://vcryptfinancial.com",
    mockupContent: {
      title: "Vcrypt Software",
      subtitle: "Cloud-Based Trading Algorithms",
      interface: "trading",
    },
  },
]

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [userInteracting, setUserInteracting] = useState(false)
  const [programmaticScrolling, setProgrammaticScrolling] = useState(false)

  // Function to scroll to a specific project position
  const scrollToProject = (projectIndex: number) => {
    if (!sectionRef.current) return

    const sectionHeight = sectionRef.current.offsetHeight
    const windowHeight = window.innerHeight
    const sectionTop = sectionRef.current.offsetTop
    
    // Calculate the scroll position that corresponds to this project
    // We want the scroll progress to match the project index
    const targetProgress = projectIndex / (projects.length - 1) // Use (length - 1) for better distribution
    
    // Calculate the scroll position needed to achieve this progress
    // The effective scrollable height within the section
    const effectiveScrollHeight = sectionHeight - windowHeight / 2
    const targetScrollOffset = targetProgress * effectiveScrollHeight
    const targetScrollY = sectionTop + targetScrollOffset - windowHeight / 2
    
    // Smooth scroll to the calculated position
    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: 'smooth'
    })
  }

  // Enhanced dot click handler
  const handleDotClick = (projectIndex: number) => {
    setUserInteracting(true)
    setProgrammaticScrolling(true)
    setActiveProject(projectIndex)
    scrollToProject(projectIndex)
    
    // Reset flags after scroll animation completes
    setTimeout(() => {
      setProgrammaticScrolling(false)
    }, 1000) // Match smooth scroll duration
    
    setTimeout(() => {
      setUserInteracting(false)
    }, 3000) // Give more time after manual navigation
  }

  useEffect(() => {
    let timeoutId: number

    const handleScroll = () => {
      // Disable sticky scroll behavior on mobile (screens smaller than 768px)
      if (window.innerWidth < 768) return
      if (userInteracting || programmaticScrolling) return

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
      timeoutId = window.setTimeout(() => {
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
  }, [activeProject, userInteracting, programmaticScrolling])

  const currentProject = projects[activeProject]

  return (
    <>
      {/* Desktop Layout - Sticky Cards */}
      <section 
        id="projects" 
        ref={sectionRef} 
        className="hidden md:block relative bg-black" 
        style={{ height: `${100 + projects.length * 100}vh` }}
      >
        {/* Header Section OUTSIDE sticky */}
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-6 flex-shrink-0">
            <div className="flex items-center space-x-8">
              <div className="text-2xl">✱</div>
              <div>
                <h2 className="text-4xl lg:text-5xl font-light leading-tight">
                  SOME
                  <br />
                  <span className="font-semibold">FEATURED</span>
                  <br />
                  <span className="font-semibold">PROJECTS</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {/* Sticky Card & Info Section */}
        <div className="sticky top-0 flex flex-col overflow-hidden">
          <div className="container mx-auto px-6 h-full flex flex-col py-12">
            {/* Main Card Display */}
            <div className="flex-1 flex items-center justify-center min-h-0">
              <div className="relative w-full max-w-6xl h-[60vh]">
                {projects.map((project, index) => {
                  const isActive = index === activeProject
                  const isPrevious = index < activeProject
                  const isNext = index > activeProject
                  
                  let transform = ""
                  let opacity = 1
                  let zIndex = projects.length - index
                  let display = "block"
                  
                  if (isPrevious) {
                    transform = `translateY(-${(activeProject - index) * 20}px) scale(${1 - (activeProject - index) * 0.05})`
                    opacity = 1
                    zIndex = index
                    display = "none" // Hide previous cards completely
                  } else if (isActive) {
                    transform = "translateY(0px) scale(1)"
                    opacity = 1
                    zIndex = projects.length
                  } else if (isNext) {
                    transform = `translateY(${(index - activeProject) * 20}px) scale(${1 - (index - activeProject) * 0.05})`
                    opacity = 1
                    zIndex = projects.length - index
                  }

                  return (
                    <div
                      key={project.id}
                      className="absolute inset-0 transition-all duration-700 ease-out"
                      style={{
                        transform,
                        opacity,
                        zIndex,
                        display,
                      }}
                    >
                      <div className="rounded-2xl p-6 shadow-2xl border border-gray-800 h-full relative backdrop-blur-sm">
                        <div className="h-full flex flex-col">
                          {/* Project Header */}
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm">{project.tech}</span>
                          </div>

                          {/* Project Content */}
                          <div className="flex-1">
                            <div
                              className={`h-full bg-gradient-to-br ${project.color} rounded-xl relative overflow-hidden`}
                            >
                              {project.name === "Tan.ai" ? (
                                <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/60 text-white z-10">
                                  <span className="text-5xl mb-4">🚧</span>
                                  <span className="text-2xl font-semibold mb-2">In Development</span>
                                  <span className="text-lg text-gray-300">Live preview coming soon</span>
                                </div>
                              ) : project.liveUrl ? (
                                <iframe
                                  src={project.liveUrl}
                                  title={project.name}
                                  className="absolute inset-0 w-full h-full rounded-xl border-0"
                                  allow="fullscreen"
                                  loading="lazy"
                                />
                              ) : (
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  className="absolute inset-0 w-full h-full object-cover"
                                />
                              )}
                              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Project Info Section */}
            <div className="py-8 flex justify-center">
              <div className="w-full max-w-6xl">
                <ScrollFadeIn delay={200} className="space-y-6">
                  {/* Current Project Details */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-3xl font-bold text-white">{currentProject.name}</h3>
                      <span className="text-gray-400">:: {currentProject.tech}</span>
                    </div>
                    <p className="text-gray-400 text-lg leading-relaxed max-w-4xl">
                      {currentProject.description}
                    </p>
                  </div>

                  {/* Navigation Dots */}
                  <div className="flex space-x-3 mt-8">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          index === activeProject ? "bg-orange-500 w-8" : "bg-white/20 w-2 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Project Counter */}
                  <div className="text-gray-500 text-sm">
                    {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </div>
                </ScrollFadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Layout - Normal Scrollable Cards */}
      <section id="projects" className="md:hidden bg-black py-12">
        {/* Header Section */}
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-4 mb-12">
            <div className="text-xl">✱</div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-light leading-tight">
                SOME
                <br />
                <span className="font-semibold">FEATURED</span>
                <br />
                <span className="font-semibold">PROJECTS</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-4 space-y-8">
          {projects.map((project, index) => (
            <ScrollFadeIn key={project.id} delay={index * 100}>
              <div className="rounded-2xl p-4 shadow-2xl border border-gray-800 relative backdrop-blur-sm">
                <div className="space-y-4">
                  {/* Project Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{project.tech}</span>
                  </div>

                  {/* Project Content */}
                  <div className="h-[300px] relative">
                    <div
                      className={`h-full bg-gradient-to-br ${project.color} rounded-xl relative overflow-hidden`}
                    >
                      {project.name === "Tan.ai" ? (
                        <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/60 text-white z-10">
                          <span className="text-4xl mb-3">🚧</span>
                          <span className="text-xl font-semibold mb-2">In Development</span>
                          <span className="text-sm text-gray-300">Live preview coming soon</span>
                        </div>
                      ) : project.liveUrl ? (
                        <iframe
                          src={project.liveUrl}
                          title={project.name}
                          className="absolute inset-0 w-full h-full rounded-xl border-0"
                          allow="fullscreen"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-xl font-bold text-white">{project.name}</h3>
                      <span className="text-gray-400 text-sm">:: {project.tech}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
