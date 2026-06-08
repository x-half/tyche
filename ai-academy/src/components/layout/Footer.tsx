import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div>
            <div className="text-xs font-bold text-gray-900 mb-2">学AI</div>
            <p className="text-[11px] text-gray-400">系统化学习AI技术</p>
          </div>
          <div>
            <h4 className="text-[11px] font-medium text-gray-500 mb-2">课程</h4>
            <div className="space-y-1">
              <Link href="/courses" className="block text-[11px] text-gray-400 hover:text-gray-900">全部课程</Link>
              <Link href="/courses?free=true" className="block text-[11px] text-gray-400 hover:text-gray-900">免费课程</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-medium text-gray-500 mb-2">学习</h4>
            <div className="space-y-1">
              <Link href="/paths" className="block text-[11px] text-gray-400 hover:text-gray-900">学习路径</Link>
              <Link href="/exams" className="block text-[11px] text-gray-400 hover:text-gray-900">考试认证</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-medium text-gray-500 mb-2">关于</h4>
            <div className="space-y-1">
              <Link href="/about" className="block text-[11px] text-gray-400 hover:text-gray-900">关于我们</Link>
              <Link href="/blog" className="block text-[11px] text-gray-400 hover:text-gray-900">博客</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <p className="text-[10px] text-gray-400">© {new Date().getFullYear()} 学AI</p>
        </div>
      </div>
    </footer>
  );
}
