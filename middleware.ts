import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export { auth as middleware } from "@/auth"

// Remove any runtime: 'edge' configuration if present
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}