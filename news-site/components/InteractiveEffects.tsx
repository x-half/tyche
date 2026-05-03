'use client'

import { useEffect } from 'react'

export default function InteractiveEffects() {
  useEffect(() => {
    // Latest issue card mouse glow effect
    const latestIssue = document.querySelector('.latest-issue')
    if (latestIssue) {
      const handleMouseMove = (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = (latestIssue as HTMLElement).getBoundingClientRect()
        const x = ((mouseEvent.clientX - rect.left) / rect.width) * 100
        const y = ((mouseEvent.clientY - rect.top) / rect.height) * 100
        ;(latestIssue as HTMLElement).style.setProperty('--x', `${x}%`)
        ;(latestIssue as HTMLElement).style.setProperty('--y', `${y}%`)
      }
      latestIssue.addEventListener('mousemove', handleMouseMove)
      return () => latestIssue.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Stagger animation for archive items
    const items = document.querySelectorAll('.archive-item')
    items.forEach((item, index) => {
      ;(item as HTMLElement).style.animationDelay = `${0.3 + index * 0.05}s`
      item.classList.add('archive-item-enter')
    })
  }, [])

  return null
}
