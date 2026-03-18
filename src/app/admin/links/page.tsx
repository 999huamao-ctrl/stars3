"use client"

import { useState, useEffect } from "react"
import { Plus, Copy, BarChart3, Trash2, Edit } from "lucide-react"
import { getLinks, addLink, Link } from "@/lib/data"

export default function LinksPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newLink, setNewLink] = useState({ name: "", targetUrl: "", slug: "" })

  useEffect(() => {
    setLinks(getLinks())
  }, [])

  const handleCreate = () => {
    const link = addLink({
      name: newLink.name,
      targetUrl: newLink.targetUrl,
      slug: newLink.slug || Math.random().toString(36).substr(2, 6),
      status: "active",
    })
    setLinks(getLinks())
    setShowModal(false)
    setNewLink({ name: "", targetUrl: "", slug: "" })
  }

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${slug}`)
    alert("链接已复制")
  }

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">链接管理</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          新建链接
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">名称</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">短链接</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">点击/转化</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">状态</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{link.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">/{link.slug}</span>
                    <button onClick={() => copyLink(link.slug)} className="p-1 text-gray-400 hover:text-purple-600">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {formatNumber(link.clicks)} / {formatNumber(link.conversions)}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    link.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}>
                    {link.status === "active" ? "活跃" : "暂停"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-purple-600"><BarChart3 className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                    <button className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="例如：夏季促销"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">目标地址</label>
                <input
                  type="url"
                  value={newLink.targetUrl}
                  onChange={(e) => setNewLink({ ...newLink, targetUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/landing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">自定义短链接（可选）</label>
                <input
                  type="text"
                  value={newLink.slug}
                  onChange={(e) => setNewLink({ ...newLink, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="自动生成"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}