"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Card {
  id: number
  title: string
  description: string
  image: string
  tech: string[]
}

interface CardSwiperProps {
  cards: Card[]
}

export function CardSwiper({ cards }: CardSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % cards.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const prevCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
    setTimeout(() => setIsAnimating(false), 300)
  }

  useEffect(() => {
    const interval = setInterval(nextCard, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div key={card.id} className="w-full flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mx-2">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{card.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {card.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">View Project</Button>
                  </div>

                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                      <img
                        src={card.image || "/placeholder.svg"}
                        alt={card.title}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center mt-8 space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevCard}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex space-x-2 items-center">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-orange-500" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextCard}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
