// 本地数据存储（替代数据库）

export interface Link {
  id: string
  slug: string
  name: string
  targetUrl: string
  clicks: number
  conversions: number
  status: "active" | "paused"
  createdAt: string
}

// 初始示例数据
const initialLinks: Link[] = [
  {
    id: "1",
    slug: "abc123",
    name: "测试链接1",
    targetUrl: "https://example.com/offer1",
    clicks: 15420,
    conversions: 423,
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    slug: "def456",
    name: "测试链接2",
    targetUrl: "https://example.com/offer2",
    clicks: 8932,
    conversions: 198,
    status: "active",
    createdAt: new Date().toISOString(),
  },
]

// 从 localStorage 获取数据
export function getLinks(): Link[] {
  if (typeof window === "undefined") return initialLinks
  const stored = localStorage.getItem("stars3_links")
  return stored ? JSON.parse(stored) : initialLinks
}

// 保存到 localStorage
export function saveLinks(links: Link[]) {
  if (typeof window === "undefined") return
  localStorage.setItem("stars3_links", JSON.stringify(links))
}

// 添加新链接
export function addLink(link: Omit<Link, "id" | "clicks" | "conversions" | "createdAt">) {
  const links = getLinks()
  const newLink: Link = {
    ...link,
    id: Math.random().toString(36).substr(2, 9),
    clicks: 0,
    conversions: 0,
    createdAt: new Date().toISOString(),
  }
  links.push(newLink)
  saveLinks(links)
  return newLink
}

// 根据 slug 获取链接
export function getLinkBySlug(slug: string): Link | undefined {
  return getLinks().find((l) => l.slug === slug)
}

// 增加点击数
export function incrementClicks(slug: string) {
  const links = getLinks()
  const link = links.find((l) => l.slug === slug)
  if (link) {
    link.clicks++
    saveLinks(links)
  }
}

// 获取统计数据
export function getStats() {
  const links = getLinks()
  return {
    totalClicks: links.reduce((sum, l) => sum + l.clicks, 0),
    totalConversions: links.reduce((sum, l) => sum + l.conversions, 0),
    activeLinks: links.filter((l) => l.status === "active").length,
  }
}