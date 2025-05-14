"use client"

import { useEffect } from 'react'

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // On page load or when changing themes, apply the theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark'
    
    // Apply the theme
    document.documentElement.setAttribute('data-theme', savedTheme)
    
    // Set proper color scheme for system UI
    document.documentElement.style.colorScheme = 
      ['dark', 'cyberpunk', 'night', 'dracula', 'black', 'luxury', 'forest', 'coffee', 'sunset', 'dim', 'halloween', 'aqua', 'abyss'].includes(savedTheme) 
      ? 'dark' 
      : 'light'
      
  }, [])

  return <>{children}</>
}