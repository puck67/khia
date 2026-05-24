import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({ children, className = '', animation = 'animate-fade-in-up', delay = 0 }) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.05 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-300 ${isIntersecting ? animation : 'opacity-0'}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  )
}
