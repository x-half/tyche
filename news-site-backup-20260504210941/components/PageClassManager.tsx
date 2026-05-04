'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function PageClassManager() {
  const pathname = usePathname()
  
  useEffect(() => {
    const html = document.documentElement
    if (pathname === '/') {
      html.classList.add('home-page')
    } else {
      html.classList.remove('home-page')
    }
    
    return () => {
      html.classList.remove('home-page')
    }
  }, [pathname])
  
  return null
}
