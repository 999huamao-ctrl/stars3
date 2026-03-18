import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <div className="text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          StarS3
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
          高效流量承接与转化平台
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/admin"
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:bg-opacity-90 transition"
          >
            进入工作台
          </Link>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <div className="text-3xl font-bold mb-2">10万+</div>
          <div className="opacity-80">日点击承载</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <div className="text-3xl font-bold mb-2">实时</div>
          <div className="opacity-80">数据分析</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
          <div className="text-3xl font-bold mb-2">智能</div>
          <div className="opacity-80">转化优化</div>
        </div>
      </div>
    </main>
  )
}