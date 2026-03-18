import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, type, referrer, source, medium } = body

    // Find link by slug
    const link = await prisma.link.findUnique({
      where: { slug },
    })

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 })
    }

    // Create event
    await prisma.event.create({
      data: {
        linkId: link.id,
        type,
        ip: request.ip || "",
        userAgent: request.headers.get("user-agent") || "",
        referrer: referrer || request.headers.get("referer") || "",
        country: request.headers.get("x-vercel-ip-country") || "",
        city: request.headers.get("x-vercel-ip-city") || "",
      },
    })

    // Update counts if click
    if (type === "click") {
      await prisma.link.update({
        where: { id: link.id },
        data: { clicks: { increment: 1 } },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Track error:", error)
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 })
  }
}