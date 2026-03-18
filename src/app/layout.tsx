import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "StarS3 - 流量转化平台",
  description: "高效流量承接与转化系统",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}