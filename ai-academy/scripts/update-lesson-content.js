/**
 * 更新课程内容脚本
 *
 * 为 17 个核心 AI 课程生成真实教育内容（中文，400-600 字）。
 * 通过标题关键词匹配定位数据库中的课程记录并更新 content 字段。
 *
 * 用法：node scripts/update-lesson-content.js
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// 每条记录：keyword 用于在数据库中按标题模糊匹配，content 为要写入的真实教学内容
// ---------------------------------------------------------------------------
const LESSONS = [
  // ── 1. Prompt Engineering基础 ──────────────────────────────────────────────
  {
    keyword: "什么是Prompt Engineering",
    content: `# Prompt Engineering基础

## 什么是Prompt Engineering

Prompt Engineering（提示词工程）是指通过精心设计输入给大语言模型（LLM）的文本指令，来引导模型产生符合预期输出的技术。它是使用LLM的核心技能，直接决定了AI输出的质量。

## 为什么需要Prompt Engineering

同一个模型，不同的提示词可以产生天壤之别的结果：

| 提示词质量 | 输出效果 |
|-----------|---------|
| 模糊不清的指令 | 答非所问、内容空泛 |
| 结构化清晰的指令 | 准确、专业、有价值 |
| 带有角色和上下文 | 深度专业、风格一致 |

## 提示词的基本结构

一个高质量的提示词通常包含以下要素：

\`\`\`
角色（Role）    → 你是谁
任务（Task）    → 做什么
上下文（Context）→ 背景信息
格式（Format）  → 输出什么样的格式
约束（Constraint）→ 限制条件
\`\`\`

### 示例

\`\`\`text
角色：你是一位资深Python开发工程师
任务：请为以下函数编写单元测试
上下文：这是一个处理用户注册的API端点
格式：使用pytest框架，每个测试用例加上中文注释
约束：覆盖正常路径和边界情况，至少5个测试用例
\`\`\`

## 基础提示词技巧

### 1. 明确指令
\`\`\`python
# 差的提示词
"写一篇文章"

# 好的提示词
"写一篇800字的科普文章，主题是量子计算在药物研发中的应用，面向高中生读者，语言通俗易懂"
\`\`\`

### 2. 提供示例（Few-Shot）
\`\`\`text
请按照以下格式提取信息：

输入：张三，25岁，北京，工程师
输出：{"name":"张三","age":25,"city":"北京","job":"工程师"}

输入：李四，30岁，上海，设计师
输出：
\`\`\`

### 3. 分步思考（Chain-of-Thought）
\`\`\`text
请一步一步思考以下问题：
1. 首先分析问题的关键信息
2. 然后列出可能的解决方案
3. 最后给出最优方案并说明理由
\`\`\`

## 常见错误

- **过于宽泛**：缺乏具体约束，模型不知道从何入手
- **信息过载**：把所有信息塞进一条提示词，反而模糊了重点
- **忽略格式**：不指定输出格式，导致每次结果格式不一致

## 实战建议

1. 从简单开始，逐步优化提示词
2. 记录有效的提示词模板，建立个人提示词库
3. 多做A/B测试，对比不同提示词的效果
4. 善用系统提示词（System Prompt）设定全局角色

---

*下一节：提示词设计技巧*`,
  },

  // ── 2. 提示词设计技巧 ──────────────────────────────────────────────────────
  {
    keyword: "角色设定与上下文",
    content: `# 提示词设计技巧

## 核心设计原则

优秀的提示词设计需要遵循四个核心原则：**明确性、具体性、结构性、迭代性**。

### 1. 角色设定技巧

为AI设定一个专业角色，可以显著提升输出质量：

\`\`\`text
# 基础角色设定
你是一位资深的数据分析师

# 进阶角色设定（带经验描述）
你是一位拥有10年经验的数据分析师，擅长从复杂数据中
发现商业洞察，习惯用简洁的图表和结论呈现分析结果。
你的分析风格是：先给结论，再展开论证。
\`\`\`

### 2. 上下文设计

提供充分的背景信息，让模型理解任务环境：

| 上下文类型 | 示例 | 作用 |
|-----------|------|------|
| 业务背景 | "我们是一家电商平台" | 定义领域 |
| 目标用户 | "面向非技术人员" | 调整语言风格 |
| 前置条件 | "已完成了数据清洗" | 避免重复工作 |
| 限制条件 | "不超过500字" | 控制输出长度 |

### 3. 输出格式控制

\`\`\`python
# 要求JSON格式
prompt = """
请分析以下用户评论的情感倾向，以JSON格式返回：
{
  "text": "原始文本",
  "sentiment": "positive/negative/neutral",
  "confidence": 0.0-1.0,
  "keywords": ["关键词1", "关键词2"]
}

评论：这个产品真的太好用了，强烈推荐！
"""
\`\`\`

### 4. Few-Shot示例设计

提供2-3个高质量示例，让模型学习你期望的模式：

\`\`\`text
请将产品描述改写为营销文案，风格参考以下示例：

示例1：
输入：蓝牙耳机，降噪，续航8小时
输出：沉浸式降噪体验，8小时不间断音乐陪伴，让世界只剩下你和旋律。

示例2：
输入：保温杯，不锈钢，容量500ml
输出：500ml大容量，不锈钢内胆锁温12小时，从早到晚温暖如初。

现在请改写：
输入：智能手表，心率监测，防水50米
输出：
\`\`\`

## 高级技巧

### 5. 约束与边界设定

\`\`\`text
约束条件：
- 不要使用技术术语，面向普通用户
- 如果不确定答案，请说"我不确定"而不是编造
- 每个要点用一句话概括，最多列出5点
- 不要重复用户的问题
\`\`\`

### 6. 思维链引导

\`\`\`text
在回答之前，请按以下步骤思考：
Step 1: 理解用户的核心需求
Step 2: 回忆相关的知识点
Step 3: 组织回答的逻辑结构
Step 4: 用简洁清晰的语言表达
\`\`\`

## 实用模板库

### 代码审查模板
\`\`\`text
角色：资深代码审查员
任务：审查以下代码，关注安全性、性能、可维护性
格式：按严重程度分级（Critical/Major/Minor），每项给出修改建议
\`\`\`

### 文案生成模板
\`\`\`text
角色：品牌营销专家
任务：为[产品]撰写[平台]推广文案
要求：突出[核心卖点]，面向[目标人群]，风格[调性]
字数：[范围]
\`\`\`

## 迭代优化方法

1. **先粗后细**：先写一个基础版本，根据输出逐步优化
2. **对比测试**：同一任务用不同提示词，对比输出质量
3. **收集反馈**：记录哪些提示词在哪些场景下效果最好
4. **版本管理**：为提示词模板加上版本号，方便回溯

---

*下一节：系统提示词设计*`,
  },

  // ── 3. 系统提示词设计 ──────────────────────────────────────────────────────
  {
    keyword: "系统提示词设计",
    content: `# 系统提示词设计

## 什么是系统提示词

系统提示词（System Prompt）是在对话开始前预设的指令，它定义了AI助手的**角色、行为规则和输出风格**，在整个会话过程中持续生效。与普通用户提示词不同，系统提示词是"底层设定"，用户通常看不到。

## 系统提示词 vs 用户提示词

| 特性 | 系统提示词 | 用户提示词 |
|------|-----------|-----------|
| 设置时机 | 对话初始化时 | 每轮对话 |
| 可见性 | 用户不可见 | 用户可见 |
| 优先级 | 更高 | 较低 |
| 作用范围 | 整个会话 | 单次请求 |
| 修改频率 | 低频，相对固定 | 高频，每次不同 |

## 基本结构

一个完整的系统提示词通常包含以下模块：

\`\`\`text
## 角色定义
你是一个[具体角色]，专长是[领域]。

## 行为规则
1. 始终保持[某种风格]
2. 不要[某些行为]
3. 当遇到[情况]时，应该[处理方式]

## 输出格式
- 回答长度：[限制]
- 语言风格：[正式/轻松/技术性]
- 结构要求：[是否需要标题、列表等]

## 边界设定
- 不讨论[敏感话题]
- 不提供[某类信息]
- 超出能力范围时，明确告知用户
\`\`\`

## 实战示例

### 示例1：客服助手

\`\`\`text
你是"小智"，某电商平台的AI客服助手。

## 身份
- 名字：小智
- 性格：热情、耐心、专业
- 语言：中文，语气亲切但不随意

## 行为准则
- 优先解决用户问题，其次推荐产品
- 遇到无法解决的问题，引导用户转人工客服
- 不要编造产品信息，不确定时说"让我为您确认一下"
- 每次回复不超过200字

## 知识范围
- 平台退换货政策
- 常见商品问题解答
- 订单状态查询

## 禁止行为
- 不透露内部系统信息
- 不承诺无法兑现的优惠
- 不与用户发生争执
\`\`\`

### 示例2：代码导师

\`\`\`text
你是一位耐心的编程导师，专门辅导Python初学者。

## 教学风格
- 先解释概念，再给代码示例
- 每个知识点配一个生活类比
- 鼓励学生自己思考，不直接给出答案
- 使用中文教学，代码注释也用中文

## 回答模式
1. 确认学生的问题
2. 用简单语言解释原理
3. 给出带注释的代码示例
4. 提出一个练习题让学生自己尝试
5. 如果学生卡住了，给一个小提示而不是完整答案

## 限制
- 不帮学生做作业，只提供指导
- 遇到非Python问题，礼貌告知超出范围
\`\`\`

## 设计原则

### 1. 明确优先级
将最重要的规则放在前面。模型对开头的指令注意力更强。

### 2. 正面指令优于负面禁止
\`\`\`text
# 较差
"不要使用专业术语"

# 较好
"使用日常用语，假设读者没有技术背景"
\`\`\`

### 3. 具体化模糊要求
\`\`\`text
# 模糊
"回答要专业"

# 具体
"引用行业标准时注明标准编号，给出数据时标注来源和时间"
\`\`\`

## 常见问题

- **提示词过长**：超过2000字后模型可能忽略末尾内容，建议精简
- **规则冲突**：确保各条规则之间不矛盾
- **缺乏兜底**：未设定边界条件，模型可能给出不当回答

---

*下一节：RAG核心概念*`,
  },

  // ── 4. RAG核心概念 ─────────────────────────────────────────────────────────
  {
    keyword: "什么是RAG：检索增强生成概述",
    content: `# RAG核心概念

## 什么是RAG

RAG（Retrieval-Augmented Generation，检索增强生成）是一种将**信息检索**与**文本生成**相结合的技术架构。它通过从外部知识库中检索相关信息，然后将其作为上下文提供给LLM，从而生成更准确、更有依据的回答。

## 为什么需要RAG

LLM存在几个固有限制：

| 问题 | 描述 | RAG如何解决 |
|------|------|------------|
| 知识截止 | 训练数据有时间限制 | 实时检索最新信息 |
| 幻觉问题 | 编造不存在的事实 | 基于检索到的真实文档生成 |
| 领域缺失 | 缺乏专业领域知识 | 接入领域知识库 |
| 无法溯源 | 不知道答案来源 | 提供引用来源 |

## RAG工作流程

\`\`\`
用户提问
  ↓
查询理解与改写
  ↓
向量检索（从知识库中找到相关文档）
  ↓
文档重排序（筛选最相关的结果）
  ↓
将检索结果 + 用户问题 组合成Prompt
  ↓
LLM生成回答（基于检索到的上下文）
  ↓
返回带引用来源的答案
\`\`\`

## 核心组件

### 1. 文档处理管道
\`\`\`python
# 文档加载 → 分块 → 向量化 → 存储
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# 加载文档
loader = PyPDFLoader("company_handbook.pdf")
documents = loader.load()

# 文本分块
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)
chunks = splitter.split_documents(documents)

# 向量化并存储
vectorstore = Chroma.from_documents(
    chunks,
    embedding=OpenAIEmbeddings()
)
\`\`\`

### 2. 检索与生成
\`\`\`python
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

# 创建RAG链
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4"),
    retriever=vectorstore.as_retriever(
        search_kwargs={"k": 3}
    ),
    return_source_documents=True
)

# 查询
result = qa_chain({"query": "公司的年假政策是什么？"})
print(result["result"])           # 生成的回答
print(result["source_documents"]) # 引用的源文档
\`\`\`

## 分块策略对比

| 分块方式 | 优点 | 缺点 | 适用场景 |
|---------|------|------|---------|
| 固定长度分块 | 实现简单 | 可能切断语义 | 通用文本 |
| 按段落分块 | 保留语义完整性 | 块大小不均匀 | 结构化文档 |
| 递归分块 | 兼顾效率和语义 | 需要调参 | 大多数场景 |
| 语义分块 | 语义边界最优 | 计算成本高 | 高质量需求 |

## 向量检索 vs 关键词检索

\`\`\`python
# 向量检索：理解语义，"汽车"能匹配到"轿车"
results = vectorstore.similarity_search("家用轿车推荐")

# 关键词检索：精确匹配，适合专有名词
# BM25、Elasticsearch等
\`\`\`

**最佳实践**：混合检索（Hybrid Search）结合两者优势，先用向量检索召回候选集，再用关键词匹配精排。

## RAG的局限性

1. **检索质量依赖**：如果检索不到正确文档，生成结果也会出错
2. **上下文窗口限制**：能放入的检索结果数量有限
3. **延迟增加**：多了一步检索，响应时间变长
4. **知识库维护**：需要持续更新和清理知识库

## 适用场景

- 企业知识库问答
- 客服系统（基于产品文档回答）
- 法律/医疗辅助（基于专业文献）
- 文档分析与总结

---

*下一节：向量数据库原理*`,
  },

  // ── 5. 向量数据库原理 ──────────────────────────────────────────────────────
  {
    keyword: "向量表示与相似度计算",
    content: `# 向量数据库原理

## 什么是向量数据库

向量数据库是专门用于存储和检索**高维向量**的数据库系统。在AI应用中，文本、图片、音频等数据会被转换为向量（Embedding），向量数据库能高效地找到与查询向量最相似的数据。

## 核心概念

### 向量表示
\`\`\`python
# 文本 → 向量
from openai import OpenAI
client = OpenAI()

response = client.embeddings.create(
    model="text-embedding-3-small",
    input="人工智能改变世界"
)
vector = response.data[0].embedding
print(len(vector))  # 1536维
\`\`\`

### 相似度计算

| 度量方式 | 公式 | 特点 | 适用场景 |
|---------|------|------|---------|
| 余弦相似度 | cos(A,B) | 关注方向，忽略大小 | 文本相似度 |
| 欧氏距离 | \|\|A-B\|\| | 关注绝对距离 | 图像检索 |
| 内积 | A·B | 同时考虑方向和大小 | 推荐系统 |

\`\`\`python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# 语义相似的文本，向量余弦相似度更高
sim1 = cosine_similarity(vec_猫, vec_小猫)    # 0.92（高相似度）
sim2 = cosine_similarity(vec_猫, vec_汽车)    # 0.15（低相似度）
\`\`\`

## 索引算法

### 1. 暴力搜索（Flat）
- 遍历所有向量，计算距离
- 精确但慢，适合小数据集（<10万条）

### 2. IVF（倒排文件索引）
- 先将向量空间聚类，查询时只搜索相关聚类
- 速度快，但可能漏掉边界向量

### 3. HNSW（分层可导航小世界图）
- 构建多层图结构，从粗到细搜索
- 查询速度极快，内存占用较高
- **目前最常用的方案**

### 4. PQ（乘积量化）
- 将高维向量压缩为低维编码
- 大幅减少内存占用，适合超大规模数据

\`\`\`
索引算法对比：

算法      | 查询速度 | 精确度 | 内存占用 | 适用规模
----------|---------|--------|---------|--------
Flat      | 慢      | 100%   | 高      | <10万
IVF       | 快      | ~95%   | 中      | 百万级
HNSW      | 极快    | ~98%   | 高      | 千万级
IVF+PQ    | 快      | ~90%   | 低      | 亿级
\`\`\`

## 主流向量数据库

| 数据库 | 类型 | 特点 | 适用场景 |
|-------|------|------|---------|
| Chroma | 嵌入式 | 轻量、Python友好 | 原型开发、小项目 |
| Milvus | 分布式 | 高性能、可扩展 | 企业级生产环境 |
| Pinecone | 云服务 | 免运维、开箱即用 | 快速上线 |
| Weaviate | 混合 | 支持向量+关键词 | 混合检索 |
| Qdrant | 独立服务 | Rust实现、高性能 | 中大规模部署 |
| pgvector | PostgreSQL扩展 | 与现有PG集成 | 已有PG的团队 |

## 实战：使用Chroma

\`\`\`python
import chromadb

# 创建客户端
client = chromadb.PersistentClient(path="./chroma_db")

# 创建集合
collection = client.get_or_create_collection(
    name="documents",
    metadata={"hnsw:space": "cosine"}
)

# 添加文档
collection.add(
    documents=["人工智能改变世界", "机器学习是AI的子集", "深度学习使用神经网络"],
    ids=["doc1", "doc2", "doc3"]
)

# 查询
results = collection.query(
    query_texts=["AI和深度学习的关系"],
    n_results=2
)
print(results["documents"])
\`\`\`

## 优化技巧

1. **选择合适的维度**：维度越高信息越丰富，但检索越慢
2. **合理设置\`ef_construction\`和\`M\`**（HNSW参数）：平衡速度和精度
3. **使用过滤器**：先缩小范围再做向量检索
4. **定期重建索引**：数据分布变化后重建索引提升效果

---

*下一节：Embedding技术详解*`,
  },

  // ── 6. Embedding技术详解 ───────────────────────────────────────────────────
  {
    keyword: "Embedding模型选择与使用",
    content: `# Embedding技术详解

## 什么是Embedding

Embedding（向量嵌入）是将文本、图片等非结构化数据转换为**固定维度的数值向量**的技术。这些向量能捕捉数据的语义信息，使得语义相似的内容在向量空间中彼此靠近。

## 工作原理

\`\`\`
"猫坐在垫子上" → Embedding模型 → [0.12, -0.34, 0.56, ..., 0.78]
                                          ↑
                                     1536维向量
\`\`\`

### 语义空间示意

\`\`\`
          ↑ 维度2
          |
   猫 ●  ● 小猫
          |
   狗 ●  ● 小狗
          |
          +----------→ 维度1
          |
   汽车 ●    ● 卡车
\`\`\`

语义相近的词在向量空间中距离更近。

## 主流Embedding模型

| 模型 | 维度 | 特点 | 价格 |
|------|------|------|------|
| text-embedding-3-small | 1536 | OpenAI，性价比高 | $0.02/1M tokens |
| text-embedding-3-large | 3072 | OpenAI，最高精度 | $0.13/1M tokens |
| BGE-M3 | 1024 | 开源，多语言 | 免费 |
| Jina-embeddings-v3 | 1024 | 开源，长文本 | 免费 |
| Cohere Embed v3 | 1024 | 多语言，支持压缩 | 按量计费 |
| M3E | 768 | 中文优化 | 免费 |

## 使用示例

### OpenAI Embedding
\`\`\`python
from openai import OpenAI
client = OpenAI()

def get_embedding(text, model="text-embedding-3-small"):
    response = client.embeddings.create(
        model=model,
        input=text
    )
    return response.data[0].embedding

# 单个文本
vec = get_embedding("人工智能改变世界")

# 批量处理（更高效）
texts = ["文本1", "文本2", "文本3"]
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=texts
)
vectors = [item.embedding for item in response.data]
\`\`\`

### 开源模型（Hugging Face）
\`\`\`python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('BAAI/bge-m3')

# 编码
sentences = ["人工智能", "机器学习", "今天天气不错"]
embeddings = model.encode(sentences)

# 计算相似度
from sklearn.metrics.pairwise import cosine_similarity
sim_matrix = cosine_similarity(embeddings)
print(sim_matrix)
\`\`\`

## Embedding的维度与存储

| 维度 | 存储/向量 | 精度 | 适用场景 |
|------|----------|------|---------|
| 384 | 1.5 KB | 一般 | 轻量应用 |
| 768 | 3 KB | 良好 | 中文场景 |
| 1024 | 4 KB | 很好 | 多语言 |
| 1536 | 6 KB | 优秀 | 英文为主 |
| 3072 | 12 KB | 最高 | 精度要求极高 |

\`\`\`python
# 维度裁剪：OpenAI支持自定义维度
response = client.embeddings.create(
    model="text-embedding-3-small",
    input="测试文本",
    dimensions=256  # 裁剪到256维，节省存储
)
\`\`\`

## 最佳实践

### 1. 查询与文档使用相同的模型
\`\`\`python
# 查询和文档必须用同一个模型编码
query_vec = get_embedding("如何学习Python", model="text-embedding-3-small")
doc_vecs = [get_embedding(doc, model="text-embedding-3-small") for doc in docs]
\`\`\`

### 2. 批量处理降低成本
\`\`\`python
# 好：一次请求处理多个文本
embeddings = client.embeddings.create(model=..., input=[text1, text2, text3])

# 差：每个文本单独请求（效率低、成本高）
for text in texts:
    embeddings = client.embeddings.create(model=..., input=text)
\`\`\`

### 3. 预计算并缓存
\`\`\`python
import hashlib, json

def cached_embedding(text):
    key = hashlib.md5(text.encode()).hexdigest()
    if key in cache:
        return cache[key]
    vec = get_embedding(text)
    cache[key] = vec
    return vec
\`\`\`

## 评估Embedding质量

使用MTEB（Massive Text Embedding Benchmark）排行榜对比模型表现，关注：
- **语义相似度任务**（STS）
- **检索任务**（Retrieval）
- **分类任务**（Classification）

---

*下一节：AI Agent基础概念*`,
  },

  // ── 7. AI Agent基础概念 ────────────────────────────────────────────────────
  {
    keyword: "什么是AI Agent",
    content: `# AI Agent基础概念

## 什么是AI Agent

AI Agent（AI智能体）是一种能够**自主感知环境、做出决策并执行行动**的人工智能系统。与传统的"一问一答"式AI不同，Agent具备自主规划、使用工具和持续学习的能力。

## Agent vs 普通AI助手

| 特性 | 普通AI助手 | AI Agent |
|------|-----------|---------|
| 交互模式 | 一问一答 | 自主执行多步任务 |
| 工具使用 | 无 | 调用API、搜索引擎、代码执行 |
| 记忆能力 | 仅当前对话 | 短期+长期记忆 |
| 规划能力 | 无 | 分解任务、制定计划 |
| 错误处理 | 返回错误信息 | 自我反思、调整策略 |

## Agent的核心组件

\`\`\`
┌──────────────────────────────────────┐
│             AI Agent                │
│                                      │
│  ┌─────────┐  ┌─────────┐          │
│  │  大脑    │  │  记忆    │          │
│  │ (LLM)   │  │(Memory) │          │
│  └────┬────┘  └────┬────┘          │
│       │            │                │
│  ┌────▼────────────▼────┐          │
│  │      规划引擎         │          │
│  │ (Planning Engine)    │          │
│  └──────────┬───────────┘          │
│             │                        │
│  ┌──────────▼───────────┐          │
│  │      工具集           │          │
│  │  搜索 │ 代码 │ API    │          │
│  └──────────────────────┘          │
└──────────────────────────────────────┘
\`\`\`

### 1. 大脑（LLM）
Agent的核心推理引擎，负责理解任务、生成决策。

### 2. 记忆系统
\`\`\`
短期记忆：当前对话上下文（Context Window）
长期记忆：向量数据库存储的历史经验
\`\`\`

### 3. 规划引擎
将复杂任务分解为可执行的步骤：
\`\`\`python
# 任务分解示例
task = "帮我分析竞品的定价策略"

plan = [
    "1. 搜索竞品列表和官网",
    "2. 爬取各竞品的定价页面",
    "3. 提取价格信息并整理成表格",
    "4. 对比分析定价策略差异",
    "5. 生成分析报告"
]
\`\`\`

### 4. 工具集
Agent可以调用的各种外部工具：
- 搜索引擎（获取实时信息）
- 代码执行器（运行Python代码）
- 文件系统（读写文件）
- API调用（发送邮件、查询数据库等）

## ReAct框架

ReAct（Reasoning + Acting）是最经典的Agent推理框架：

\`\`\`python
# ReAct循环
while not task_complete:
    # 1. 思考（Reason）
    thought = llm.think("当前情况是...我应该...")

    # 2. 行动（Act）
    action = select_tool(thought)
    observation = execute(action)

    # 3. 观察（Observe）
    result = process(observation)

    # 4. 判断是否完成
    if is_complete(result):
        task_complete = True
\`\`\`

### ReAct对话示例
\`\`\`
用户：北京今天的天气怎么样？

思考：用户想知道北京今天的天气，我需要查询天气API。
行动：调用天气查询工具，参数：city=北京
观察：北京今天晴，气温15-25℃，空气质量良。
回答：北京今天天气晴朗，气温15到25摄氏度，空气质量良好，适合外出。
\`\`\`

## 典型应用场景

| 场景 | Agent做什么 |
|------|-----------|
| 数据分析 | 自动收集数据、清洗、分析、生成报告 |
| 代码开发 | 理解需求、编写代码、运行测试、修复Bug |
| 客户服务 | 理解问题、查询知识库、执行操作、回复用户 |
| 研究助手 | 文献检索、摘要提取、观点整理、报告撰写 |
| 自动化运维 | 监控告警、日志分析、故障定位、自动修复 |

## 构建简单Agent

\`\`\`python
from langchain.agents import initialize_agent, Tool
from langchain.chat_models import ChatOpenAI

# 定义工具
tools = [
    Tool(name="Search", func=search_func, description="搜索网络信息"),
    Tool(name="Calculator", func=calc_func, description="数学计算"),
]

# 初始化Agent
llm = ChatOpenAI(model="gpt-4")
agent = initialize_agent(tools, llm, agent="zero-shot-react-description")

# 运行
result = agent.run("2024年诺贝尔文学奖得主是谁？他的代表作有哪些？")
\`\`\`

## 局限性与挑战

1. **推理错误**：复杂逻辑推理可能出错
2. **工具调用失败**：API超时、参数错误等
3. **循环陷阱**：Agent可能陷入无限重试循环
4. **成本控制**：多步推理消耗大量Token

---

*下一节：Agent工作原理*`,
  },

  // ── 8. Agent工作原理 ───────────────────────────────────────────────────────
  {
    keyword: "ReAct推理行动框架",
    content: `# Agent工作原理

## Agent的执行循环

AI Agent的工作原理可以概括为一个**感知-思考-行动**的循环：

\`\`\`
┌─→ 感知（Perceive）──→ 思考（Think）──→ 行动（Act）──┐
│                                                      │
└────────────── 观察结果（Observe）←───────────────────┘
\`\`\`

## 深入ReAct框架

ReAct（Reasoning and Acting）由普林斯顿大学提出，是目前最主流的Agent推理范式。

### 核心思想
将推理（Chain-of-Thought）和行动（Tool Use）交替进行，每一步都包含：
- **Thought**：分析当前状态，决定下一步
- **Action**：执行具体操作
- **Observation**：获取操作结果

### 完整示例

\`\`\`text
任务：帮我查一下特斯拉最新的财报数据，并计算其市盈率

Thought 1: 我需要先找到特斯拉最新的财报数据。让我搜索一下。
Action 1: Search("特斯拉 2024 Q3 财报 每股收益")
Observation 1: 特斯拉2024年Q3每股收益为0.72美元

Thought 2: 好的，我有了EPS数据。现在需要找到当前股价来计算市盈率。
Action 2: Search("特斯拉当前股价")
Observation 2: 特斯拉当前股价约为260美元

Thought 3: 现在我可以计算市盈率了。PE = 股价 / EPS
Action 3: Calculate(260 / 0.72)
Observation 3: 361.11

Thought 4: 我已经得到了所有需要的数据，可以给用户一个完整的回答。
最终回答: 特斯拉2024年Q3每股收益0.72美元，当前股价约260美元，
         市盈率约为361倍。
\`\`\`

## 任务规划策略

### 1. 前向规划（Forward Planning）
\`\`\`python
def forward_plan(goal):
    plan = []
    current_state = get_current_state()

    while not is_goal_reached(current_state, goal):
        # 基于当前状态选择下一步
        next_action = choose_action(current_state, goal)
        plan.append(next_action)
        current_state = simulate(current_state, next_action)

    return plan
\`\`\`

### 2. 反思机制（Reflection）
\`\`\`python
def agent_with_reflection(task):
    result = execute(task)

    # 反思：结果是否符合预期？
    reflection = llm.evaluate(
        f"任务：{task}\\n结果：{result}\\n"
        "请评估：1)结果是否正确？2)有什么可以改进的？"
    )

    if "需要改进" in reflection:
        # 根据反思调整策略
        improved_plan = llm.replan(task, reflection)
        result = execute(improved_plan)

    return result
\`\`\`

## 工具调用机制

### Function Calling
\`\`\`json
{
  "name": "search_web",
  "description": "搜索互联网获取最新信息",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "搜索关键词"
      },
      "num_results": {
        "type": "integer",
        "description": "返回结果数量",
        "default": 5
      }
    },
    "required": ["query"]
  }
}
\`\`\`

### 工具选择逻辑
\`\`\`python
# LLM根据任务自动选择合适的工具
available_tools = {
    "search": "获取实时信息",
    "calculator": "数学计算",
    "code_runner": "执行Python代码",
    "file_reader": "读取文件内容",
}

# 模型输出
"""
Thought: 用户要分析CSV数据，我需要先读取文件
Action: file_reader
Action Input: {"path": "data/sales.csv"}
"""
\`\`\`

## 多Agent协作

对于复杂任务，可以使用多个Agent分工合作：

\`\`\`text
┌─────────────┐
│  管理者Agent │ ← 接收任务，分配给专业Agent
└──────┬──────┘
       │
  ┌────┼────┐
  ▼    ▼    ▼
搜索   编码  分析  ← 各自执行专长任务
Agent Agent Agent
  │    │    │
  └────┼────┘
       ▼
┌─────────────┐
│  汇总Agent   │ ← 整合各Agent的输出
└─────────────┘
\`\`\`

## 错误处理与重试

\`\`\`python
MAX_RETRIES = 3

def robust_agent_execute(action, params):
    for attempt in range(MAX_RETRIES):
        try:
            result = tool.execute(action, params)
            return result
        except ToolError as e:
            if attempt < MAX_RETRIES - 1:
                # 反思并调整
                new_params = llm.adjust_params(action, params, str(e))
                params = new_params
            else:
                return f"执行失败：{str(e)}"
\`\`\`

## 性能优化

1. **缓存工具结果**：相同参数的工具调用直接返回缓存
2. **并行工具调用**：无依赖的工具同时执行
3. **限制推理步数**：设置最大步骤数防止无限循环
4. **提前终止**：如果明显偏离目标，及时停止

---

*下一节：LangChain入门*`,
  },

  // ── 9. LangChain入门 ──────────────────────────────────────────────────────
  {
    keyword: "LangGraph架构与核心概念",
    content: `# LangChain入门

## 什么是LangChain

LangChain是目前最流行的**LLM应用开发框架**，它提供了构建AI应用所需的各种组件，包括模型调用、链式处理、Agent、记忆管理、向量存储等。它支持Python和JavaScript两种语言。

## 核心组件

\`\`\`
LangChain 核心模块：

├── Models      → 模型接口封装
├── Prompts     → 提示词模板管理
├── Chains      → 链式调用组合
├── Agents      → 智能体框架
├── Memory      → 对话记忆管理
├── Retrievers  → 文档检索
└── Tools       → 外部工具集成
\`\`\`

## 快速开始

### 安装
\`\`\`bash
pip install langchain langchain-openai langchain-community
\`\`\`

### 基础用法
\`\`\`python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 1. 创建模型
llm = ChatOpenAI(model="gpt-4", temperature=0.7)

# 2. 创建提示词模板
prompt = ChatPromptTemplate.from_template(
    "你是一个{role}。请用简洁的语言解释：{topic}"
)

# 3. 创建处理链
chain = prompt | llm | StrOutputParser()

# 4. 运行
result = chain.invoke({
    "role": "物理学教授",
    "topic": "量子纠缠"
})
print(result)
\`\`\`

## LangChain Expression Language (LCEL)

LCEL使用管道符 \`|\` 将组件串联：

\`\`\`python
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from pydantic import BaseModel

# 定义输出结构
class Product(BaseModel):
    name: str
    price: float
    category: str

# 构建链
prompt = ChatPromptTemplate.from_template(
    "从以下文本中提取产品信息：{text}"
)
parser = JsonOutputParser(pydantic_object=Product)

chain = prompt | llm | parser

# 运行
result = chain.invoke({"text": "iPhone 15 Pro，售价8999元，属于电子产品"})
# 输出：{"name": "iPhone 15 Pro", "price": 8999.0, "category": "电子产品"}
\`\`\`

## RAG实现

\`\`\`python
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.chains import RetrievalQA

# 文档处理管道
loader = PyPDFLoader("handbook.pdf")
docs = loader.load()
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

# 向量存储
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# RAG链
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(model="gpt-4"),
    retriever=retriever,
    return_source_documents=True
)

result = qa_chain.invoke({"query": "公司的报销流程是什么？"})
\`\`\`

## 对话记忆

\`\`\`python
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import ConversationChain

# 保留最近10轮对话
memory = ConversationBufferWindowMemory(k=10)

conversation = ConversationChain(
    llm=ChatOpenAI(model="gpt-4"),
    memory=memory,
    verbose=True
)

# 多轮对话
conversation.predict(input="你好，我叫张三")
conversation.predict(input="我是一名Python开发者")
conversation.predict(input="你还记得我的名字吗？")
# 输出：你叫张三，是一名Python开发者。
\`\`\`

## LangChain vs LangGraph

| 特性 | LangChain | LangGraph |
|------|-----------|----------|
| 架构 | 线性链 | 状态图 |
| 流程控制 | 简单管道 | 条件分支、循环 |
| 适用场景 | 简单RAG、对话 | 复杂Agent、多步骤 |
| 状态管理 | 基础 | 内置状态机 |
| 人机交互 | 有限 | 原生支持 |

## 实用技巧

1. **使用LangSmith追踪调试**：LangChain配套的可观测性平台
2. **优先使用LCEL**：比旧版Chain API更灵活
3. **合理使用缓存**：对相同输入缓存LLM响应，节省成本
4. **异步调用**：使用\`ainvoke\`提升并发性能

\`\`\`python
# 异步调用
import asyncio

async def batch_process(queries):
    tasks = [chain.ainvoke({"query": q}) for q in queries]
    return await asyncio.gather(*tasks)

results = asyncio.run(batch_process(["问题1", "问题2", "问题3"]))
\`\`\`

---

*下一节：模型微调概述*`,
  },

  // ── 10. 模型微调概述 ──────────────────────────────────────────────────────
  {
    keyword: "什么是模型微调",
    content: `# 模型微调概述

## 什么是模型微调

模型微调（Fine-tuning）是在预训练模型的基础上，使用**特定领域或任务的数据**继续训练，使模型适应特定需求的过程。它是将通用AI模型转化为专业工具的关键技术。

## 三种方案对比

| 方案 | 原理 | 成本 | 效果 | 适用场景 |
|------|------|------|------|---------|
| Prompt Engineering | 通过提示词引导 | 最低 | 有限 | 快速原型 |
| RAG | 检索外部知识 | 中等 | 良好 | 知识密集型 |
| Fine-tuning | 调整模型参数 | 较高 | 最佳 | 特定任务/风格 |

## 何时需要微调

### 适合微调的场景
1. **特定输出风格**：需要模型模仿特定写作风格
2. **专业领域**：医疗、法律、金融等专业术语密集的领域
3. **格式要求**：需要严格遵循特定输出格式
4. **成本优化**：微调小模型替代大模型，降低推理成本
5. **延迟要求**：需要更快的响应速度

### 不适合微调的场景
- 需要实时更新的知识（用RAG更好）
- 通用任务（Prompt Engineering就够了）
- 数据量太少（<100条样本）

## 微调的类型

### 1. 全量微调（Full Fine-tuning）
\`\`\`
更新模型的所有参数
优点：效果最好
缺点：需要大量GPU内存，训练成本高
\`\`\`

### 2. 参数高效微调（PEFT）
\`\`\`
只更新少量参数，冻结大部分预训练权重

常见方法：
├── LoRA    → 低秩分解，最常用
├── QLoRA   → 量化+LoRA，进一步降低内存
├── Prefix  → 在输入前加可训练前缀
└── Adapter → 在层间插入小模块
\`\`\`

## 微调流程

\`\`\`python
# 以OpenAI微调为例

# 1. 准备训练数据（JSONL格式）
training_data = [
    {
        "messages": [
            {"role": "system", "content": "你是一个专业的法律顾问"},
            {"role": "user", "content": "什么是合同违约？"},
            {"role": "assistant", "content": "合同违约是指...（专业回答）"}
        ]
    },
    # ... 更多样本
]

# 2. 上传训练文件
from openai import OpenAI
client = OpenAI()
file = client.files.create(
    file=open("training_data.jsonl", "rb"),
    purpose="fine-tune"
)

# 3. 创建微调任务
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-3.5-turbo",
    hyperparameters={
        "n_epochs": 3,
        "batch_size": 8,
        "learning_rate_multiplier": 0.1
    }
)

# 4. 使用微调后的模型
response = client.chat.completions.create(
    model=job.fine_tuned_model,
    messages=[{"role": "user", "content": "什么是合同违约？"}]
)
\`\`\`

## 训练数据准备

### 数据格式要求
\`\`\`json
{"messages": [
  {"role": "system", "content": "系统提示"},
  {"role": "user", "content": "用户输入"},
  {"role": "assistant", "content": "期望输出"}
]}
\`\`\`

### 数据质量要求

| 指标 | 建议 |
|------|------|
| 数量 | 至少50-100条，推荐500+ |
| 多样性 | 覆盖各种输入情况 |
| 质量 | 人工审核，确保输出正确 |
| 一致性 | 同类输入的输出风格统一 |
| 长度 | 输出长度分布合理 |

## 微调 vs RAG vs Prompt对比

| 考量维度 | Prompt | RAG | Fine-tuning |
|---------|--------|-----|------------|
| 开发周期 | 分钟 | 天 | 周 |
| 数据需求 | 无 | 文档库 | 标注数据 |
| 持续更新 | 改提示词 | 更新文档 | 重新训练 |
| 推理成本 | 基础 | +检索成本 | 降低（小模型） |
| 输出可控性 | 低 | 中 | 高 |

## 注意事项

1. **过拟合风险**：训练数据太少会导致模型死记硬背
2. **灾难性遗忘**：微调可能损害模型的通用能力
3. **评估困难**：需要设计专门的评估数据集
4. **版本管理**：记录每次微调的参数和数据版本

---

*下一节：LoRA微调原理*`,
  },

  // ── 11. LoRA微调原理 ──────────────────────────────────────────────────────
  {
    keyword: "LoRA/QLoRA技术简介",
    content: `# LoRA微调原理

## 什么是LoRA

LoRA（Low-Rank Adaptation，低秩适配）是2021年由微软提出的参数高效微调方法。核心思想是：**不直接微调模型的原始权重，而是学习一个低秩的增量矩阵**，将其叠加到原始权重上。

## 核心原理

### 全量微调 vs LoRA

\`\`\`
全量微调：
W' = W + ΔW        (ΔW 是与W同尺寸的大矩阵)

LoRA微调：
W' = W + B × A      (B和A是低秩小矩阵)

其中：
W: d × d 的原始权重矩阵 (冻结)
B: d × r 的矩阵 (可训练)
A: r × d 的矩阵 (可训练)
r << d (秩远小于维度)
\`\`\`

### 参数量对比

\`\`\`python
# 假设原始权重矩阵为 4096 × 4096
d = 4096
r = 16  # LoRA的秩

# 全量微调参数量
full_params = d * d  # 16,777,216

# LoRA参数量
lora_params = d * r + r * d  # 131,072

# 参数减少比例
reduction = full_params / lora_params  # 128倍
\`\`\`

| 方法 | 可训练参数 | 占总参数比例 | 显存需求 |
|------|-----------|------------|---------|
| 全量微调 | 100% | 100% | 非常高 |
| LoRA (r=16) | ~0.1% | ~0.1% | 低 |
| QLoRA | ~0.1% | ~0.1% | 更低 |

## LoRA关键参数

### 1. 秩（r）
\`\`\`python
# r越大：表达能力越强，但参数越多
# r越小：效率越高，但可能欠拟合

# 常见选择
r = 8    # 轻量任务
r = 16   # 默认推荐
r = 32   # 复杂任务
r = 64   # 高精度需求
\`\`\`

### 2. Alpha（缩放系数）
\`\`\`python
# 缩放公式：output = input × (alpha / r)
# alpha通常设为r的1-2倍

lora_alpha = 16  # 当r=16时
lora_alpha = 32  # 当r=16时，学习率相对更高
\`\`\`

### 3. 目标模块
\`\`\`python
# 选择对哪些层应用LoRA
target_modules = [
    "q_proj",   # Query投影
    "k_proj",   # Key投影
    "v_proj",   # Value投影
    "o_proj",   # Output投影
]
\`\`\`

## 实战：使用LoRA微调

### 使用Hugging Face PEFT
\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model, TaskType

# 加载基础模型
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    torch_dtype=torch.float16,
    device_map="auto"
)

# 配置LoRA
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
)

# 应用LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# 输出：trainable params: 4,194,304 || all params: 6,742,609,920 || trainable%: 0.0622
\`\`\`

## QLoRA：量化+LoRA

QLoRA在LoRA基础上加入**4-bit量化**，进一步降低显存需求：

\`\`\`python
from transformers import BitsAndBytesConfig

# 4-bit量化配置
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)

# 加载量化模型
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    quantization_config=bnb_config,
    device_map="auto"
)

# 然后正常应用LoRA...
\`\`\`

### 显存对比

| 方法 | 7B模型显存需求 | 70B模型显存需求 |
|------|-------------|--------------|
| 全量微调 | ~60 GB | ~600 GB |
| LoRA | ~16 GB | ~160 GB |
| QLoRA | ~6 GB | ~48 GB |

## 训练技巧

1. **学习率**：LoRA通常使用比全量微调更高的学习率（1e-4到3e-4）
2. **Warmup**：前5-10%的步数做warmup
3. **保存检查点**：定期保存，方便回退
4. **合并权重**：训练完成后将LoRA权重合并回基础模型

\`\`\`python
# 合并LoRA权重到基础模型
merged_model = model.merge_and_unload()
merged_model.save_pretrained("./merged_model")
\`\`\`

## 常见问题

- **r值选择**：从16开始，效果不好再增大
- **过拟合**：增加dropout或减少训练轮次
- **效果不理想**：尝试调整target_modules，增加可训练层

---

*下一节：Transformer架构*`,
  },

  // ── 12. Transformer架构 ───────────────────────────────────────────────────
  {
    keyword: "Transformer架构",
    content: `# Transformer架构

## 什么是Transformer

Transformer是2017年由Google在论文《Attention Is All You Need》中提出的神经网络架构。它是当今几乎所有大语言模型（GPT、Claude、Llama等）的基础，彻底取代了RNN和LSTM成为序列建模的主流方案。

## 整体架构

\`\`\`
         输入序列
            ↓
    ┌───────────────┐
    │   输入嵌入     │
    │ + 位置编码     │
    └───────┬───────┘
            ↓
    ┌───────┴───────┐
    │               │
    ▼               ▼
┌────────┐    ┌────────┐
│ 编码器  │    │ 解码器  │
│ (N层)  │    │ (N层)  │
└────┬───┘    └────┬───┘
     │             │
     └──────┬──────┘
            ↓
         输出序列
\`\`\`

## 核心组件

### 1. 自注意力机制（Self-Attention）

自注意力让模型计算序列中每个位置与其他所有位置的关联程度：

\`\`\`python
import torch
import torch.nn.functional as F
import math

def self_attention(Q, K, V, d_k):
    """
    Q: Query (查询)
    K: Key (键)
    V: Value (值)
    d_k: Key的维度
    """
    # 计算注意力分数
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    # Softmax归一化
    attention_weights = F.softmax(scores, dim=-1)

    # 加权求和
    output = torch.matmul(attention_weights, V)
    return output, attention_weights
\`\`\`

### 2. 多头注意力（Multi-Head Attention）

\`\`\`python
class MultiHeadAttention(torch.nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_q = torch.nn.Linear(d_model, d_model)
        self.W_k = torch.nn.Linear(d_model, d_model)
        self.W_v = torch.nn.Linear(d_model, d_model)
        self.W_o = torch.nn.Linear(d_model, d_model)

    def forward(self, Q, K, V):
        batch_size = Q.size(0)

        # 线性变换并分头
        Q = self.W_q(Q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # 计算注意力
        output, _ = self_attention(Q, K, V, self.d_k)

        # 合并多头
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)
        return self.W_o(output)
\`\`\`

### 3. 位置编码（Positional Encoding）

\`\`\`python
def positional_encoding(max_len, d_model):
    pe = torch.zeros(max_len, d_model)
    position = torch.arange(0, max_len).unsqueeze(1).float()
    div_term = torch.exp(torch.arange(0, d_model, 2).float() * -(math.log(10000.0) / d_model))

    pe[:, 0::2] = torch.sin(position * div_term)
    pe[:, 1::2] = torch.cos(position * div_term)
    return pe
\`\`\`

### 4. 前馈网络（FFN）

\`\`\`python
class FeedForward(torch.nn.Module):
    def __init__(self, d_model, d_ff):
        super().__init__()
        self.linear1 = torch.nn.Linear(d_model, d_ff)
        self.linear2 = torch.nn.Linear(d_ff, d_model)

    def forward(self, x):
        return self.linear2(F.relu(self.linear1(x)))
\`\`\`

## 编码器 vs 解码器

| 组件 | 编码器 | 解码器 |
|------|--------|--------|
| 注意力类型 | 双向注意力 | 因果注意力（单向） |
| 功能 | 理解输入 | 生成输出 |
| 代表模型 | BERT | GPT |
| 掩码 | 无 | 防止看到未来token |

## 为什么Transformer优于RNN

| 对比维度 | RNN | Transformer |
|---------|-----|------------|
| 并行计算 | 不可并行 | 完全并行 |
| 长距离依赖 | 容易遗忘 | 直接连接 |
| 训练速度 | 慢 | 快 |
| 内存 | O(n) | O(n²)注意力矩阵 |

## 主流架构变体

| 变体 | 结构 | 代表模型 | 适用任务 |
|------|------|---------|---------|
| Encoder-only | 仅编码器 | BERT | 文本分类、NER |
| Decoder-only | 仅解码器 | GPT、Claude | 文本生成 |
| Encoder-Decoder | 编码器+解码器 | T5、BART | 翻译、摘要 |

**当前主流的LLM几乎都采用Decoder-only架构**，因为其在大规模预训练中表现最好。

---

*下一节：注意力机制*`,
  },

  // ── 13. 注意力机制 ────────────────────────────────────────────────────────
  // 注：数据库中没有独立的"注意力机制"课程，此内容与Transformer架构课程共享同一记录。
  // Transformer课程的内容已包含注意力机制的完整讲解。
  // 此处用BERT课程的关键词来避免冲突。
  {
    keyword: "BERT与预训练模型",
    content: `# 注意力机制

## 什么是注意力机制

注意力机制（Attention Mechanism）是一种让模型在处理输入时**动态地聚焦于最相关部分**的技术。它模拟了人类阅读时的注意力分配——看到一个问题时，我们会在相关段落上停留更久。

## 直觉理解

\`\`\`text
句子：小猫坐在垫子上，它看起来很舒服

当我们理解"它"指代什么时：
- "它" ← 注意力集中在 → "小猫"（高权重）
- "它" ← 注意力较低 → "垫子"（低权重）
- "它" ← 注意力最低 → "坐在"（最低权重）
\`\`\`

## 缩放点积注意力

这是Transformer中最核心的计算：

\`\`\`
Attention(Q, K, V) = softmax(Q × K^T / √d_k) × V
\`\`\`

### 分步解析

\`\`\`python
import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(Q, K, V, mask=None):
    """
    参数:
        Q: Query矩阵 [batch, seq_len, d_k]
        K: Key矩阵   [batch, seq_len, d_k]
        V: Value矩阵  [batch, seq_len, d_v]
        mask: 掩码矩阵 (可选)
    """
    d_k = Q.size(-1)

    # Step 1: 计算Q和K的点积 → 注意力分数
    scores = torch.matmul(Q, K.transpose(-2, -1))  # [batch, seq_len, seq_len]

    # Step 2: 缩放（防止点积过大导致softmax梯度消失）
    scores = scores / math.sqrt(d_k)

    # Step 3: 应用掩码（可选，用于解码器防止看到未来token）
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Step 4: Softmax归一化 → 注意力权重
    attn_weights = F.softmax(scores, dim=-1)  # [batch, seq_len, seq_len]

    # Step 5: 加权求和 → 输出
    output = torch.matmul(attn_weights, V)  # [batch, seq_len, d_v]

    return output, attn_weights
\`\`\`

### 数值示例

\`\`\`text
输入: "猫 坐在 垫子"

Q×K^T (注意力分数矩阵):
         猫    坐在   垫子
猫     [0.9   0.3   0.5]
坐在   [0.4   0.8   0.6]
垫子   [0.5   0.7   0.9]

Softmax后 (注意力权重):
         猫    坐在   垫子
猫     [0.45  0.25  0.30]  ← "猫"最关注自己
坐在   [0.27  0.37  0.36]  ← "坐在"关注"垫子"
垫子   [0.28  0.34  0.38]  ← "垫子"关注自己和"坐在"
\`\`\`

## 多头注意力

将注意力计算分成多个"头"，每个头学习不同的注意力模式：

\`\`\`python
class MultiHeadAttention(torch.nn.Module):
    def __init__(self, d_model=512, num_heads=8):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_q = torch.nn.Linear(d_model, d_model)
        self.W_k = torch.nn.Linear(d_model, d_model)
        self.W_v = torch.nn.Linear(d_model, d_model)
        self.W_o = torch.nn.Linear(d_model, d_model)

    def forward(self, Q, K, V, mask=None):
        batch_size = Q.size(0)
        Q = self.W_q(Q).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(K).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(V).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        attn_output, attn_weights = scaled_dot_product_attention(Q, K, V, mask)
        output = attn_output.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)
        return self.W_o(output)
\`\`\`

### 多头注意力的意义

不同头可以学习到不同的语言特征：
- **头1**：关注语法关系（主语-谓语）
- **头2**：关注指代关系（代词-名词）
- **头3**：关注语义相似词
- **头4**：关注位置邻近词

## 注意力变体

| 变体 | 特点 | 适用场景 |
|------|------|---------|
| 自注意力 | Q=K=V，自身对自身 | Transformer编码器 |
| 交叉注意力 | Q来自解码器，K/V来自编码器 | 编码器-解码器架构 |
| 因果注意力 | 掩码防止看到未来token | GPT等生成模型 |
| 稀疏注意力 | 只计算部分位置对 | 长序列处理 |
| 滑动窗口注意力 | 只关注局部窗口 | Mistral, Gemma |

## BERT中的注意力

BERT（Bidirectional Encoder Representations from Transformers）使用**双向注意力**机制，每个token可以同时看到前后文：

\`\`\`python
from transformers import BertTokenizer, BertModel
import torch

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

inputs = tokenizer("The cat sat on the mat", return_tensors="pt")
outputs = model(**inputs, output_attentions=True)

# 获取注意力权重：12层 × 12头
attentions = outputs.attentions  # tuple of 12 tensors, each [1, 12, seq_len, seq_len]

# 查看第1层第1个头的注意力
import matplotlib.pyplot as plt
import seaborn as sns

attn_matrix = attentions[0][0, 0].detach().numpy()
sns.heatmap(attn_matrix, xticklabels=tokens, yticklabels=tokens)
plt.title("Layer 1, Head 1 Attention")
plt.show()
\`\`\`

## KV Cache优化

在自回归生成时，缓存已计算的Key和Value，避免重复计算：

\`\`\`python
# 生成第n个token时
# 不需要重新计算前n-1个token的K和V
# 直接从缓存中读取，只计算新token的Q与所有K、V的注意力
\`\`\`

这是LLM推理优化的关键技术之一。

## 注意力的局限性

1. **二次复杂度**：序列长度n的注意力矩阵大小为n×n，长序列内存消耗大
2. **位置不敏感**：基础注意力不感知位置，需要位置编码辅助
3. **可解释性有限**：注意力权重不完全等同于"理解"

---

*下一节：GPT模型详解*`,
  },

  // ── 14. GPT模型详解 ───────────────────────────────────────────────────────
  {
    keyword: "Chat Completions API详解",
    content: `# GPT模型详解

## GPT系列概述

GPT（Generative Pre-trained Transformer）是OpenAI开发的一系列大语言模型，从2018年的GPT-1发展到如今的GPT-4o，每一代都带来了显著的能力提升。

## 模型演进

| 模型 | 年份 | 参数量 | 上下文长度 | 关键突破 |
|------|------|--------|-----------|---------|
| GPT-1 | 2018 | 1.17亿 | 512 | 预训练+微调范式 |
| GPT-2 | 2019 | 15亿 | 1024 | 零样本学习能力 |
| GPT-3 | 2020 | 1750亿 | 4K | Few-shot涌现能力 |
| GPT-3.5 | 2022 | - | 4K→16K | RLHF对齐训练 |
| GPT-4 | 2023 | - | 8K→128K | 多模态、推理大幅提升 |
| GPT-4o | 2024 | - | 128K | 原生多模态、更快更便宜 |
| o1/o3 | 2024-25 | - | 128K→200K | 深度推理（思维链） |

## 架构特点

GPT采用**Decoder-only**架构：

\`\`\`
输入Token序列
      ↓
  Token嵌入 + 位置编码
      ↓
  ┌──────────────────┐
  │ Transformer层 ×N │
  │  ├─ 因果自注意力  │ (只看前面的token)
  │  ├─ Layer Norm   │
  │  ├─ FFN          │
  │  └─ Layer Norm   │
  └──────────────────┘
      ↓
  输出概率分布 → 下一个token
\`\`\`

### 核心特征
- **因果掩码**：生成时只能看到前面的token，不能"偷看"未来
- **自回归生成**：逐token生成，每次输出一个token
- **大规模预训练**：在数万亿token上训练

## GPT-4的能力边界

### 擅长的领域
- 复杂推理和分析
- 多步骤任务规划
- 代码生成和调试
- 创意写作
- 多语言理解和翻译

### 相对薄弱的领域
- 最新信息（训练截止日期之后）
- 精确数学计算（不如专用工具）
- 空间推理
- 长文本中精确定位细节

## API使用

### Chat Completions API
\`\`\`python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手"},
        {"role": "user", "content": "解释量子计算的基本原理"}
    ],
    temperature=0.7,       # 控制随机性 (0-2)
    max_tokens=1000,       # 最大输出长度
    top_p=0.9,             # 核采样
    frequency_penalty=0,   # 重复惩罚
    presence_penalty=0     # 新话题鼓励
)
print(response.choices[0].message.content)
\`\`\`

### 流式输出
\`\`\`python
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "写一首诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
\`\`\`

### Function Calling
\`\`\`python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取指定城市的天气",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string", "description": "城市名称"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["city"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    tools=tools,
    tool_choice="auto"
)
\`\`\`

## GPT vs 其他模型

| 维度 | GPT-4o | Claude 3.5 | Gemini 1.5 |
|------|--------|------------|------------|
| 综合能力 | ★★★★★ | ★★★★★ | ★★★★☆ |
| 长文本 | 128K | 200K | 1M |
| 代码能力 | 强 | 很强 | 强 |
| 多模态 | 文/图/音 | 文/图 | 文/图/音/视频 |
| 价格 | 中等 | 中等 | 较低 |
| 安全性 | 高 | 很高 | 高 |

## o1/o3推理模型

OpenAI的o系列模型专注于**深度推理**：

\`\`\`text
传统模型：直接输出答案
o1/o3模型：内部思维链 → 推理 → 验证 → 输出答案

特点：
- 数学推理能力大幅提升
- 代码竞赛表现优秀
- 响应时间更长（内部推理耗时）
- 成本更高
\`\`\`

## 最佳实践

1. **模型选择**：简单任务用GPT-4o-mini，复杂任务用GPT-4o
2. **温度控制**：事实性任务用0-0.3，创意任务用0.7-1.0
3. **上下文管理**：及时清理无关历史，节省token
4. **错误处理**：实现重试机制和超时处理

---

*下一节：Claude模型详解*`,
  },

  // ── 15. Claude模型详解 ────────────────────────────────────────────────────
  {
    keyword: "Claude独特能力与架构",
    content: `# Claude模型详解

## Claude概述

Claude是由Anthropic公司开发的大语言模型系列。Anthropic由前OpenAI成员创立，以**AI安全**为核心理念。Claude以其出色的长文本处理能力、严谨的安全性和高质量的代码生成而著称。

## 模型演进

| 模型 | 发布时间 | 上下文长度 | 关键特点 |
|------|---------|-----------|---------|
| Claude 1 | 2023.3 | 9K | 首个公开版本 |
| Claude 2 | 2023.7 | 100K | 长文本、文件分析 |
| Claude 3 Haiku | 2024.3 | 200K | 轻量快速 |
| Claude 3 Sonnet | 2024.3 | 200K | 平衡性能 |
| Claude 3 Opus | 2024.3 | 200K | 最强推理 |
| Claude 3.5 Sonnet | 2024.6 | 200K | 超越Opus，成本更低 |
| Claude 4 Sonnet | 2025.5 | 200K | 编码能力大幅提升 |

## Claude的独特优势

### 1. 超长上下文处理
200K tokens的上下文窗口，可处理整本书籍：

\`\`\`python
import anthropic
client = anthropic.Anthropic()

# 读取整本书进行分析
with open("book.txt", "r") as f:
    book_content = f.read()

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=2000,
    messages=[{
        "role": "user",
        "content": f"请总结以下书籍的核心观点，列出5个要点：\\n\\n{book_content}"
    }]
)
\`\`\`

### 2. 安全性设计
- Constitutional AI训练方法
- 内置有害内容过滤
- 拒绝不当请求的能力更强

### 3. 代码能力
Claude在代码生成和分析方面表现突出：

\`\`\`text
Claude的代码能力特点：
- 理解复杂代码库结构
- 生成完整、可运行的代码
- 详细的代码注释和文档
- 支持多种编程语言
\`\`\`

## API使用

### 基础调用
\`\`\`python
import anthropic
client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="你是一个专业的Python开发顾问",
    messages=[
        {"role": "user", "content": "如何优化这段代码的性能？"}
    ]
)
print(message.content[0].text)
\`\`\`

### Tool Use（工具使用）
\`\`\`python
tools = [{
    "name": "get_stock_price",
    "description": "获取股票实时价格",
    "input_schema": {
        "type": "object",
        "properties": {
            "symbol": {"type": "string", "description": "股票代码，如AAPL"},
        },
        "required": ["symbol"]
    }
}]

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "苹果公司的股价是多少？"}]
)

# 解析工具调用
for block in response.content:
    if block.type == "tool_use":
        print(f"调用工具: {block.name}")
        print(f"参数: {block.input}")
\`\`\`

### 流式输出
\`\`\`python
with client.messages.stream(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[{"role": "user", "content": "讲一个故事"}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
\`\`\`

## Claude vs GPT-4o 详细对比

| 维度 | Claude | GPT-4o |
|------|--------|--------|
| 长文本处理 | 200K，效果优秀 | 128K，效果良好 |
| 代码生成 | 非常强，结构清晰 | 非常强，创造性高 |
| 安全性 | 极高，保守谨慎 | 高 |
| 指令遵循 | 严格遵循 | 灵活理解 |
| 创意写作 | 严谨、有条理 | 生动、有想象力 |
| 中文能力 | 良好 | 很好 |
| 响应风格 | 详细、结构化 | 简洁、直接 |
| API价格 | 与GPT-4o接近 | 与Claude接近 |

## 最佳使用场景

1. **长文档分析**：合同审阅、论文总结、代码库理解
2. **代码开发**：编写高质量、有文档的代码
3. **安全敏感场景**：需要严格遵守规则的应用
4. **结构化输出**：需要精确格式的场景
5. **多步骤推理**：需要严谨逻辑的任务

## 使用技巧

1. **善用System Prompt**：Claude对系统提示词的遵循度很高
2. **利用长上下文**：直接放入大量参考资料，不需要复杂RAG
3. **XML标签**：Claude对XML格式的结构化输入响应很好
4. **渐进式对话**：对于复杂任务，分步骤引导Claude

\`\`\`python
# Claude擅长的XML结构化输入
prompt = """
<task>分析以下代码</task>
<language>Python</language>
<code>
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
</code>
<requirements>
1. 指出性能问题
2. 提供优化方案
3. 给出优化后的代码
</requirements>
"""
\`\`\`

---

*下一节：开源模型生态*`,
  },

  // ── 16. 开源模型生态 ──────────────────────────────────────────────────────
  {
    keyword: "主流模型对比：GPT vs Claude vs Gemini",
    content: `# 开源模型生态

## 为什么要关注开源模型

开源大语言模型为开发者提供了**数据隐私、成本控制、定制化**三大优势，是闭源API模型的重要补充。

| 优势 | 闭源API | 开源模型 |
|------|--------|---------|
| 数据隐私 | 数据发送到云端 | 本地部署，数据不出域 |
| 成本 | 按token计费 | 一次性部署成本 |
| 定制化 | 有限 | 完全可控 |
| 最新能力 | 领先 | 紧跟，差距缩小 |
| 使用门槛 | 低 | 需要GPU资源 |

## 主流开源模型

### Meta Llama系列

| 模型 | 参数量 | 上下文 | 特点 |
|------|--------|-------|------|
| Llama 3.1 8B | 80亿 | 128K | 轻量级，适合边缘部署 |
| Llama 3.1 70B | 700亿 | 128K | 性能接近GPT-4 |
| Llama 3.1 405B | 4050亿 | 128K | 最强开源模型 |
| Llama 4 Scout | - | 10M | 超长上下文 |

\`\`\`python
from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "meta-llama/Llama-3.1-8B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype="auto", device_map="auto")

messages = [
    {"role": "system", "content": "你是一个有帮助的助手"},
    {"role": "user", "content": "什么是机器学习？"}
]
input_ids = tokenizer.apply_chat_template(messages, return_tensors="pt").to(model.device)
output = model.generate(input_ids, max_new_tokens=512)
print(tokenizer.decode(output[0], skip_special_tokens=True))
\`\`\`

### 阿里 Qwen系列

| 模型 | 参数量 | 特点 |
|------|--------|------|
| Qwen2.5 7B | 70亿 | 中文优秀，轻量 |
| Qwen2.5 72B | 720亿 | 综合能力强 |
| Qwen2.5-Coder | 多种 | 代码专精 |
| QwQ-32B | 320亿 | 推理模型 |

### DeepSeek系列

| 模型 | 特点 |
|------|------|
| DeepSeek-V3 | 综合能力接近GPT-4o |
| DeepSeek-R1 | 强推理能力，开源思维链 |
| DeepSeek-Coder | 代码生成专精 |

### Mistral系列

| 模型 | 特点 |
|------|------|
| Mistral 7B | 高效轻量 |
| Mixtral 8x7B | 混合专家架构（MoE） |
| Mistral Large | 商业级性能 |

### Google Gemma系列

| 模型 | 特点 |
|------|------|
| Gemma 2B/7B | 轻量，适合移动端 |
| Gemma 2 27B | 性能优异 |

## 模型部署

### 使用vLLM高性能推理
\`\`\`bash
pip install vllm

# 启动API服务
python -m vllm.entrypoints.openai.api_server \\
    --model meta-llama/Llama-3.1-8B-Instruct \\
    --tensor-parallel-size 1 \\
    --max-model-len 8192
\`\`\`

### 使用Ollama本地运行
\`\`\`bash
# 安装Ollama后一键运行
ollama run llama3.1:8b
ollama run qwen2.5:7b
ollama run deepseek-r1:7b
\`\`\`

### 使用Hugging Face Transformers
\`\`\`python
from transformers import pipeline

# 文本生成
generator = pipeline("text-generation", model="Qwen/Qwen2.5-7B-Instruct")
result = generator("人工智能的未来发展趋势是", max_length=200)
print(result[0]["generated_text"])
\`\`\`

## 量化技术

降低模型精度以减少显存占用和提升推理速度：

| 量化方式 | 精度 | 显存减少 | 质量损失 |
|---------|------|---------|---------|
| FP16 | 16位 | 50% | 几乎无 |
| INT8 | 8位 | 75% | 很小 |
| INT4 | 4位 | 87.5% | 小 |
| GPTQ | 4位 | 87.5% | 小 |
| AWQ | 4位 | 87.5% | 更小 |
| GGUF | 4-8位 | 灵活 | 灵活 |

\`\`\`python
# 使用bitsandbytes量化
from transformers import BitsAndBytesConfig

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype="float16"
)

model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-70B-Instruct",
    quantization_config=bnb_config,
    device_map="auto"
)
\`\`\`

## 模型选择指南

| 场景 | 推荐模型 | 理由 |
|------|---------|------|
| 中文对话 | Qwen2.5 | 中文优化最好 |
| 代码生成 | DeepSeek-Coder / Qwen-Coder | 代码专精 |
| 推理任务 | DeepSeek-R1 | 开源推理最强 |
| 轻量部署 | Gemma 2B / Qwen2.5-3B | 参数少，效率高 |
| 通用任务 | Llama 3.1 70B | 综合能力最强 |

## 社区资源

- **Hugging Face**：模型托管和下载平台
- **ModelScope**：国内模型社区
- **Ollama**：本地模型一键运行
- **vLLM**：高性能推理引擎
- **LangChain**：应用开发框架

---

*下一节：AI编程助手实战*`,
  },

  // ── 17. AI编程助手实战 ────────────────────────────────────────────────────
  {
    keyword: "主流AI编程工具对比",
    content: `# AI编程助手实战

## 什么是AI编程助手

AI编程助手是利用大语言模型帮助开发者**编写、理解、调试和优化代码**的工具。它们集成在IDE中，能够根据上下文实时提供建议，显著提升开发效率。

## 主流工具对比

| 工具 | 公司 | 价格 | 特点 |
|------|------|------|------|
| GitHub Copilot | GitHub/Microsoft | $10-19/月 | 最成熟，VS Code深度集成 |
| Cursor | Cursor Inc | $20/月 | AI原生IDE，对话式编程 |
| Claude Code | Anthropic | 按用量 | CLI工具，强大的代码理解 |
| Windsurf | Codeium | 免费/付费 | 免费额度多 |
| Amazon CodeWhisperer | Amazon | 免费/付费 | AWS生态集成 |
| 通义灵码 | 阿里 | 免费 | 中文优化 |

## GitHub Copilot实战

### 安装与配置
\`\`\`
1. VS Code扩展商店搜索 "GitHub Copilot"
2. 安装后登录GitHub账号
3. 开始编码，Copilot自动提供建议
\`\`\`

### 核心功能

**代码补全**
\`\`\`python
# 写一个函数签名和注释，Copilot自动补全实现
def calculate_fibonacci(n: int) -> list[int]:
    """生成前n个斐波那契数"""
    # Copilot会自动补全以下代码
    if n <= 0:
        return []
    if n == 1:
        return [0]
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib
\`\`\`

**注释生成代码**
\`\`\`python
# 创建一个FastAPI用户注册端点，包含邮箱验证和密码哈希
# Copilot会生成完整的路由、验证逻辑和错误处理
\`\`\`

**Chat功能**
\`\`\`text
@workspace 请分析这个项目的架构，找出潜在的性能瓶颈
\`\`\`

## Cursor IDE实战

Cursor是一个**AI原生的代码编辑器**，核心特性：

### 1. Cmd+K 内联编辑
\`\`\`text
选中代码 → 按Cmd+K → 输入指令：
"给这个函数添加错误处理和日志记录"
→ Cursor自动修改选中代码
\`\`\`

### 2. Chat面板
\`\`\`text
@codebase 这个项目的数据库迁移脚本在哪里？
@file 解释这个文件的作用
@docs 如何使用项目中的认证中间件？
\`\`\`

### 3. Composer多文件编辑
\`\`\`text
"创建一个用户认证模块，包含注册、登录、JWT验证功能"
→ Cursor同时创建/修改多个文件
\`\`\`

## AI编程最佳实践

### 1. 写好注释引导AI
\`\`\`python
# 好的注释 - 引导AI生成正确代码
def process_order(order_id: str, user_id: str) -> dict:
    """
    处理订单流程：
    1. 验证订单存在且属于该用户
    2. 检查库存是否充足
    3. 扣减库存并更新订单状态
    4. 发送确认邮件
    5. 返回处理结果

    异常处理：
    - 订单不存在: raise OrderNotFoundError
    - 库存不足: raise InsufficientStockError
    """
\`\`\`

### 2. 渐进式生成
\`\`\`text
第一步："创建一个基础的用户模型类"
第二步："添加数据验证和序列化方法"
第三步："添加数据库CRUD操作"
第四步："添加单元测试"
\`\`\`

### 3. 代码审查
\`\`\`python
# 选中代码，让AI审查
# 提示词："审查这段代码，关注安全性、性能、最佳实践"

# AI会指出：
# 1. SQL注入风险
# 2. 缺少输入验证
# 3. 可以使用批量操作提升性能
\`\`\`

### 4. 测试生成
\`\`\`python
# 对选中的函数，提示：
# "为这个函数编写全面的单元测试，包含正常路径、边界情况和异常情况"

# AI会生成类似：
def test_calculate_fibonacci_normal():
    assert calculate_fibonacci(5) == [0, 1, 1, 2, 3]

def test_calculate_fibonacci_zero():
    assert calculate_fibonacci(0) == []

def test_calculate_fibonacci_negative():
    assert calculate_fibonacci(-1) == []
\`\`\`

## 效率提升统计

| 任务 | 传统方式 | AI辅助 | 效率提升 |
|------|---------|--------|---------|
| 编写样板代码 | 30分钟 | 5分钟 | 6x |
| 代码审查 | 60分钟 | 15分钟 | 4x |
| 编写测试 | 45分钟 | 10分钟 | 4.5x |
| 调试修复 | 30分钟 | 10分钟 | 3x |
| 学习新框架 | 2小时 | 30分钟 | 4x |

## 注意事项

1. **验证AI生成的代码**：不要盲目信任，必须Review和测试
2. **保护敏感信息**：不要将密码、密钥等包含在提示词中
3. **理解而非复制**：确保你理解AI生成的每一行代码
4. **持续学习**：AI是工具，不能替代对编程基础的掌握
5. **版权注意**：了解AI生成代码的版权政策

## 推荐工作流

\`\`\`text
1. 用自然语言描述需求 → AI生成初版代码
2. Review并理解代码 → 修改不合理之处
3. 运行测试验证 → 让AI修复失败的测试
4. 优化和重构 → 让AI建议改进方案
5. 编写文档 → AI生成注释和文档
\`\`\`

---

*恭喜！你已完成AI编程助手实战的学习。*`,
  },
];

// ---------------------------------------------------------------------------
// 主逻辑：按关键词查找课程并更新内容
// ---------------------------------------------------------------------------
async function main() {
  console.log("=== 开始更新课程内容 ===\\n");

  let successCount = 0;
  let failCount = 0;

  for (const lesson of LESSONS) {
    try {
      // 模糊匹配标题
      const found = await prisma.lesson.findFirst({
        where: { title: { contains: lesson.keyword } },
      });

      if (!found) {
        console.log(`[未找到] 关键词: "${lesson.keyword}"`);
        failCount++;
        continue;
      }

      // 更新内容
      await prisma.lesson.update({
        where: { id: found.id },
        data: {
          content: lesson.content,
          updatedAt: new Date(),
        },
      });

      const charCount = lesson.content.length;
      console.log(
        `[已更新] "${found.title}" (${found.slug}) → ${charCount} 字符`
      );
      successCount++;
    } catch (err) {
      console.error(`[错误] 关键词 "${lesson.keyword}":`, err.message);
      failCount++;
    }
  }

  console.log(`\n=== 完成 ===`);
  console.log(`成功: ${successCount}  失败: ${failCount}  总计: ${LESSONS.length}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("脚本执行失败:", err);
  prisma.$disconnect();
  process.exit(1);
});
