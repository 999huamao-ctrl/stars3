import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  const { searchParams } = new URL(request.url)
  
  try {
    const link = await prisma.link.findUnique({
      where: { slug },
    })

    if (!link || link.status !== "active") {
      return NextResponse.redirect(new URL("/404", request.url))
    }

    // Track click event
    await prisma.event.create({
      data: {
        linkId: link.id,
        type: "click",
        ip: request.ip || "",
        userAgent: request.headers.get("user-agent") || "",
        referrer: request.headers.get("referer") || "",
        country: request.headers.get("x-vercel-ip-country") || "",
        city: request.headers.get("x-vercel-ip-city") || "",
      },
    })

    // Update click count
    await prisma.link.update({
      where: { id: link.id },
      data: { clicks: { increment: 1 } },
    })

    // Add tracking parameters to target URL
    const targetUrl = new URL(link.targetUrl)
    searchParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value)
    })

    return NextResponse.redirect(targetUrl)
  } catch (error) {
    console.error("Redirect error:", error)
    return NextResponse.redirect(new URL("/error", request.url))
  }
}