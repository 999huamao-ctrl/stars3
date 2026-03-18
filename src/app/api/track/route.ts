import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, type } = body

    if (!slug || !type) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
    }

    // TODO: Save to database
    console.log(`Track: ${type} for ${slug}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Track error:", error)
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 })
  }
}