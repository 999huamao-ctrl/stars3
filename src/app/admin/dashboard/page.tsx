"use client"

import { useEffect, useState } from "react"
import { getStats } from "@/lib/data"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalConversions: 0,
    activeLinks: 0,
  })

  useEffect(() => {
    setStats(getStats())
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  const statCards = [
    { label: "总点击量", value: formatNumber(stats.totalClicks), change: "+12.5%" },
    { label: "总转化数", value: formatNumber(stats.totalConversions), change: "+8.3%" },
    { label: "转化率", value: stats.totalClicks > 0 ? ((stats.totalConversions / stats.totalClicks) * 100).toFixed(2) + "%" : "0%", change: "+0.5%" },
    { label: "活跃链接", value: stats.activeLinks.toString(), change: "+3" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">数据看板</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">{card.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-gray-900">{card.value}</span>
              <span className="text-sm text-green-600 font-medium">{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">流量趋势</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            图表区域（后续接入数据库后显示）
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">转化漏斗</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            漏斗图区域（后续接入数据库后显示）
          </div>
        </div>
      </div>
    </div>
  )
}