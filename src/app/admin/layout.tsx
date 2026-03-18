import Link from "next/link"
import { LayoutDashboard, Link2, BarChart3, Settings } from "lucide-react"

const navItems = [
  { href: "/admin/dashboard", label: "数据看板", icon: LayoutDashboard },
  { href: "/admin/links", label: "链接管理", icon: Link2 },
  { href: "/admin/analytics", label: "流量分析", icon: BarChart3 },
  { href: "/admin/settings", label: "系统设置", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            StarS3
          </Link>
          <p className="text-sm text-gray-500 mt-1">流量转化平台</p>
        </div>
        
        <nav className="px-4 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-purple-50 hover:text-purple-600 transition"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}