"use client"

// 简历预览组件 - 经典单栏布局
export function ClassicPreview() {
  return (
    <div className="bg-white h-full p-4 text-[6px] leading-tight">
      <div className="text-center border-b border-gray-300 pb-2 mb-2">
        <div className="text-sm font-bold">张三</div>
        <div className="text-gray-500">高级前端工程师</div>
        <div className="text-[5px] text-gray-400 mt-1">zhangsan@email.com | 138-0000-0000 | 北京市</div>
      </div>
      <div className="mb-2">
        <div className="text-[7px] font-bold border-b border-gray-200 mb-1">个人简介</div>
        <div className="text-gray-600">5年前端开发经验，精通React、Vue等现代前端技术...</div>
      </div>
      <div className="mb-2">
        <div className="text-[7px] font-bold border-b border-gray-200 mb-1">工作经历</div>
        <div className="mb-1">
          <div className="flex justify-between">
            <span className="font-bold">高级前端工程师</span>
            <span className="text-gray-400">2022-至今</span>
          </div>
          <div className="text-gray-500">科技有限公司</div>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="font-bold">前端工程师</span>
            <span className="text-gray-400">2020-2022</span>
          </div>
          <div className="text-gray-500">互联网公司</div>
        </div>
      </div>
      <div>
        <div className="text-[7px] font-bold border-b border-gray-200 mb-1">教育背景</div>
        <div className="flex justify-between">
          <span className="font-bold">北京大学 · 计算机科学</span>
          <span className="text-gray-400">2016-2020</span>
        </div>
      </div>
    </div>
  )
}

// 现代双栏布局
export function ModernPreview() {
  return (
    <div className="bg-white h-full flex text-[6px] leading-tight">
      <div className="w-1/3 bg-indigo-600 text-white p-3">
        <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center">
          <span className="text-[10px] font-bold">张</span>
        </div>
        <div className="text-center mb-3">
          <div className="text-[8px] font-bold">张三</div>
          <div className="text-white/70 text-[5px]">高级前端工程师</div>
        </div>
        <div className="text-[5px] space-y-1">
          <div className="text-white/60 font-bold text-[6px]">联系方式</div>
          <div>zhangsan@email.com</div>
          <div>138-0000-0000</div>
          <div>北京市</div>
        </div>
        <div className="mt-3 text-[5px] space-y-1">
          <div className="text-white/60 font-bold text-[6px]">专业技能</div>
          <div className="bg-white/20 rounded px-1">React</div>
          <div className="bg-white/20 rounded px-1">Vue</div>
          <div className="bg-white/20 rounded px-1">TypeScript</div>
        </div>
      </div>
      <div className="flex-1 p-3">
        <div className="mb-2">
          <div className="text-[7px] font-bold text-indigo-600 border-b border-indigo-200 mb-1">个人简介</div>
          <div className="text-gray-600">5年前端开发经验...</div>
        </div>
        <div className="mb-2">
          <div className="text-[7px] font-bold text-indigo-600 border-b border-indigo-200 mb-1">工作经历</div>
          <div className="mb-1">
            <div className="font-bold">高级前端工程师</div>
            <div className="text-gray-400">科技有限公司 · 2022-至今</div>
          </div>
        </div>
        <div>
          <div className="text-[7px] font-bold text-indigo-600 border-b border-indigo-200 mb-1">教育背景</div>
          <div className="font-bold">北京大学</div>
          <div className="text-gray-400">计算机科学 · 2016-2020</div>
        </div>
      </div>
    </div>
  )
}

// 创意布局
export function CreativePreview() {
  return (
    <div className="bg-gradient-to-br from-pink-50 to-white h-full p-4 text-[6px] leading-tight">
      <div className="flex items-center gap-3 mb-3 pb-2 border-b-2 border-pink-300">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
          <span className="text-white text-[12px] font-bold">张</span>
        </div>
        <div>
          <div className="text-[10px] font-bold">张三</div>
          <div className="text-pink-500 text-[7px]">高级前端工程师</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[7px] font-bold text-pink-500 mb-1">工作经历</div>
          <div className="text-gray-600 mb-1">
            <div className="font-bold">高级前端工程师</div>
            <div className="text-[5px] text-gray-400">科技有限公司</div>
          </div>
        </div>
        <div>
          <div className="text-[7px] font-bold text-pink-500 mb-1">教育背景</div>
          <div className="text-gray-600">
            <div className="font-bold">北京大学</div>
            <div className="text-[5px] text-gray-400">计算机科学</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 简约布局
export function MinimalPreview() {
  return (
    <div className="bg-white h-full p-5 text-[6px] leading-relaxed">
      <div className="mb-4">
        <div className="text-[12px] font-light tracking-wider">张三</div>
        <div className="text-gray-400 text-[7px]">高级前端工程师</div>
        <div className="text-[5px] text-gray-400 mt-1">zhangsan@email.com · 138-0000-0000</div>
      </div>
      <div className="mb-3">
        <div className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">经历</div>
        <div className="border-l-2 border-gray-200 pl-2">
          <div className="font-bold">高级前端工程师</div>
          <div className="text-gray-400">科技有限公司 · 2022-至今</div>
        </div>
      </div>
      <div>
        <div className="text-[7px] uppercase tracking-widest text-gray-400 mb-1">教育</div>
        <div className="border-l-2 border-gray-200 pl-2">
          <div className="font-bold">北京大学</div>
          <div className="text-gray-400">计算机科学 · 2016-2020</div>
        </div>
      </div>
    </div>
  )
}

// 专业布局
export function ProfessionalPreview() {
  return (
    <div className="bg-white h-full text-[6px] leading-tight">
      <div className="bg-slate-800 text-white p-3">
        <div className="text-[10px] font-bold">张三</div>
        <div className="text-slate-300 text-[7px]">高级前端工程师</div>
        <div className="text-[5px] text-slate-400 mt-1">zhangsan@email.com · 138-0000-0000</div>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[7px] font-bold text-slate-700 border-b border-slate-200 mb-1">工作经历</div>
            <div className="mb-1">
              <div className="font-bold">高级前端工程师</div>
              <div className="text-gray-400">科技有限公司</div>
            </div>
          </div>
          <div>
            <div className="text-[7px] font-bold text-slate-700 border-b border-slate-200 mb-1">教育背景</div>
            <div>
              <div className="font-bold">北京大学</div>
              <div className="text-gray-400">计算机科学</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 技术布局
export function TechPreview() {
  return (
    <div className="bg-gray-900 text-green-400 h-full p-3 font-mono text-[6px] leading-tight">
      <div className="mb-2">
        <div className="text-green-300">$ whoami</div>
        <div className="text-white text-[10px] font-bold">张三</div>
        <div className="text-green-500 text-[7px]">Full-Stack Developer</div>
      </div>
      <div className="mb-2">
        <div className="text-green-300">$ cat skills.txt</div>
        <div className="flex flex-wrap gap-1 mt-1">
          <span className="bg-green-900 px-1 rounded">React</span>
          <span className="bg-green-900 px-1 rounded">Node.js</span>
          <span className="bg-green-900 px-1 rounded">TypeScript</span>
        </div>
      </div>
      <div>
        <div className="text-green-300">$ cat experience.txt</div>
        <div className="mt-1">
          <div className="text-white">Senior Developer @ Tech Co</div>
          <div className="text-green-600">2022-present</div>
        </div>
      </div>
    </div>
  )
}

export const templates = [
  {
    id: "classic",
    name: "经典",
    category: "传统行业",
    description: "简洁大方的单栏布局，适合金融、法律等传统行业",
    Preview: ClassicPreview,
  },
  {
    id: "modern",
    name: "现代",
    category: "互联网/科技",
    description: "双栏布局设计，左侧深色侧边栏，右侧内容区",
    Preview: ModernPreview,
  },
  {
    id: "creative",
    name: "创意",
    category: "设计/艺术",
    description: "独特的头像+网格布局，适合设计师、艺术家",
    Preview: CreativePreview,
  },
  {
    id: "minimal",
    name: "简约",
    category: "通用",
    description: "极简主义设计，大量留白，突出内容本身",
    Preview: MinimalPreview,
  },
  {
    id: "professional",
    name: "专业",
    category: "商务",
    description: "深色头部+双栏内容区，适合管理层和高级职位",
    Preview: ProfessionalPreview,
  },
  {
    id: "tech",
    name: "技术",
    category: "技术",
    description: "终端风格设计，深色背景+绿色文字，专为技术人员",
    Preview: TechPreview,
  },
]