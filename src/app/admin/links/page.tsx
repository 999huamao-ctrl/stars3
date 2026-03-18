"use client"

import { useState } from "react"
import { Plus, Copy, ExternalLink, BarChart3, MoreHorizontal, Trash2, Edit } from "lucide-react"
import { formatNumber, formatDate } from "@/lib/utils"

interface Link {
  id: string
  slug: string
  name: string
  targetUrl: string
  clicks: number
  conversions: number
  status: "active" | "paused"
  createdAt: Date
}

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([
    {
      id: "1",
      slug: "abc123",
      name: "测试链接1",
      targetUrl: "https://example.com/offer1",
      clicks: 15420,
      conversions: 423,
      status: "active",
      createdAt: new Date(),
    },
    {
      id: "2",
      slug: "def456",
      name: "测试链接2",
      targetUrl: "https://example.com/offer2",
      clicks: 8932,
      conversions: 198,
      status: "active",
      createdAt: new Date(),
    },
  ])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newLink, setNewLink] = useState({ name: "", targetUrl: "", slug: "" })

  const handleCreate = () => {
    const link: Link = {
      id: Math.random().toString(36).substr(2, 9),
      slug: newLink.slug || Math.random().toString(36).substr(2, 6),
      name: newLink.name,
      targetUrl: newLink.targetUrl,
      clicks: 0,
      conversions: 0,
      status: "active",
      createdAt: new Date(),
    }
    setLinks([...links, link])
    setShowCreateModal(false)
    setNewLink({ name: "", targetUrl: "", slug: "" })
  }

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${slug}`)
    alert("链接已复制")
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">链接管理</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <Plus className="w-4 h-4" />
          新建链接
        </button>
      </div>

      {/* Links Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">链接名称</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">短链接</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">目标地址</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">点击/转化</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{link.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">/{link.slug}</span>
                    <button
                      onClick={() => copyLink(link.slug)}
                      className="p-1 text-gray-400 hover:text-purple-600 transition"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={link.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600 transition"
                  >
                    {link.targetUrl.slice(0, 30)}...
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <span className="font-medium">{formatNumber(link.clicks)}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="font-medium text-green-600">{formatNumber(link.conversions)}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      link.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {link.status === "active" ? "活跃" : "暂停"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-purple-600 transition">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">新建链接</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">链接名称</label>
                <input
                  type="text"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="例如：夏季促销"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">目标地址</label>
                <input
                  type="url"
                  value={newLink.targetUrl}
                  onChange={(e) => setNewLink({ ...newLink, targetUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="https://example.com/landing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  自定义短链接（可选）
                </label>
                <input
                  type="text"
                  value={newLink.slug}
                  onChange={(e) => setNewLink({ ...newLink, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="自动生成