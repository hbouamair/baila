'use client'

import { useEffect, useRef } from 'react'

const SPARK_COUNT = 8

export function MouseGlow() {
  const spotRef = useRef<HTMLDivElement>(null)
  const sparksRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const spot = spotRef.current
    if (!spot) return

    const sparks = sparksRef.current.filter(Boolean)
    let sparkIndex = 0
    let lastSpark = 0
    let targetX = 0
    let targetY = 0
    let x = 0
    let y = 0
    let frame = 0
    let shown = false

    const tick = () => {
      x += (targetX - x) * 0.22
      y += (targetY - y) * 0.22
      spot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (Math.abs(targetX - x) > 0.5 || Math.abs(targetY - y) > 0.5) {
        frame = window.requestAnimationFrame(tick)
      } else {
        frame = 0
      }
    }

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      if (!shown) {
        x = targetX
        y = targetY
        shown = true
        spot.style.opacity = '1'
      }
      if (!frame) frame = window.requestAnimationFrame(tick)

      const now = performance.now()
      if (now - lastSpark < 80) return
      lastSpark = now
      const spark = sparks[sparkIndex % sparks.length]
      sparkIndex += 1
      if (!spark) return
      spark.style.setProperty('--spark-x', `${event.clientX}px`)
      spark.style.setProperty('--spark-y', `${event.clientY}px`)
      spark.classList.remove('is-on')
      window.requestAnimationFrame(() => spark.classList.add('is-on'))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="mouse-fx" aria-hidden>
      <div ref={spotRef} className="mouse-spotlight" />
      {Array.from({ length: SPARK_COUNT }, (_, index) => (
        <span
          key={index}
          className="mouse-spark"
          ref={(node) => {
            if (node) sparksRef.current[index] = node
          }}
        />
      ))}
    </div>
  )
}
