import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true'
  
  // Skip maintenance for admin routes (so you can disable it)
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isMaintenancePage = request.nextUrl.pathname === '/maintenance'
  
  if (maintenanceMode && !isAdminRoute && !isMaintenancePage) {
    // Redirect all traffic to maintenance page
    return NextResponse.redirect(new URL('/maintenance', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}