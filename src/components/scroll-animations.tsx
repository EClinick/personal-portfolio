import React, { useEffect, useRef } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const isInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

const applyAnimation = (
  target: Element,
  animationClass: string,
  hiddenClasses: string[],
  delay: number,
) => {
  setTimeout(() => {
    target.classList.add(animationClass)
    hiddenClasses.forEach((hiddenClass) => target.classList.remove(hiddenClass))
  }, delay)
}

export function ScrollFadeIn({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      return
    }

    if (isInViewport(element)) {
      applyAnimation(element, "animate-fade-in-up", ["opacity-0", "translate-y-8"], delay)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyAnimation(entry.target, "animate-fade-in-up", ["opacity-0", "translate-y-8"], delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={elementRef} className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}>
      {children}
    </div>
  )
}

export function ScrollSlideIn({ children, className = "", delay = 0 }: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) {
      return
    }

    if (isInViewport(element)) {
      applyAnimation(element, "animate-slide-in-left", ["opacity-0", "-translate-x-8"], delay)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyAnimation(entry.target, "animate-slide-in-left", ["opacity-0", "-translate-x-8"], delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={elementRef} className={`opacity-0 -translate-x-8 transition-all duration-700 ease-out ${className}`}>
      {children}
    </div>
  )
}
