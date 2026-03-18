"use client"

import { useEffect, useState } from "react"
import { formatNumber } from "@/lib/utils"

interface Stats {
  totalClicks: number
  totalConversions: number
  conversionRate: string
  activeLinks: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalClicks: 0,
    totalConversions: 0,
    conversionRate: "0",
    activeLinks: 0,
  })

  useEffect(() => {
    // TODO: Fetch real data from API
    setStats({
      totalClicks: 125847,
      totalConversions: 3421,
      conversionRate: "2.72",
      activeLinks: 23,
    })
  }, [])

  const statCards = [
    { label: "总点击量", value: formatNumber(stats.totalClicks), change: "+12.5%" },
    { label: "总转化数", value: formatNumber(stats.totalConversions), change: "+8.3%" },
    { label: "转化率", value: stats.conversionRate + "%", change: "+0.5%" },
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
            图表区域（待接入真实数据）
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">转化漏斗</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            漏斗图区域（待接入真实数据）
          </div>
        </div>
      </div>
    </div>
  )
}