import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")
  
  if (!slug) {
    return NextResponse.redirect(new URL("/404", request.url))
  }
  
  // TODO: Fetch target URL from database
  const targetUrl = "https://example.com"
  
  return NextResponse.redirect(targetUrl)
}