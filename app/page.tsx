export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          🌍 旅行サイト
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          ヨーロッパ旅行計画用ウェブアプリケーション
        </p>
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            🚀 正常にデプロイされました！
          </h2>
          <p className="text-lg text-gray-600">
            Next.js + Vercel で構築されたサイトが
            <br />
            動作しています ✨
          </p>
        </div>
      </div>
    </main>
  )
}
