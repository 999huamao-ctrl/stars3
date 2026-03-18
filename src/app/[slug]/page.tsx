"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getLinkBySlug, incrementClicks } from "@/lib/data"

export default function LandingPage() {
  const params = useParams()
  const slug = params.slug as string
  const [countdown, setCountdown] = useState(3)
  const [targetUrl, setTargetUrl] = useState("")

  useEffect(() => {
    const link = getLinkBySlug(slug)
    if (link) {
      setTargetUrl(link.targetUrl)
      incrementClicks(slug)
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          if (targetUrl) {
            window.location.href = targetUrl
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [slug, targetUrl])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <div className="text-center text-white px-4">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">正在为您跳转...</h1>
          <p className="opacity-80">{countdown} 秒后自动跳转</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md">
          <p className="text-sm opacity-80 mb-2">目标地址</p>
          <p className="font-medium truncate">{targetUrl || "加载中..."}</p>
        </div>

        {targetUrl && (
          <button
            onClick={() => window.location.href = targetUrl}
            className="mt-6 px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-opacity-90 transition"
          >
            立即跳转
          </button>
        )}
      </div>
    </div>
  )
}