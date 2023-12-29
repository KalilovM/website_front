import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies
  // TODO: resolve black listed tokens (on expire refresh token)
  if (!cookie.get("access")?.value && !cookie.get("refresh")?.value) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard'
}