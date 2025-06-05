import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export { auth as middleware } from "@/auth"

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
  // This will run on Edge Runtime by default, which is now compatible
}