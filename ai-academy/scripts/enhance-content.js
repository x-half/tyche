// Enhanced content generator with rich visual elements
// Generates high-quality educational content with diagrams, tables, and practical examples

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Enhanced content templates with visual elements
const enhancedTemplates = {
  // LLM & API related
  'api': (title) => `# ${title}

## 📌 核心概念

> **${title}** 是构建AI应用的基础技能。掌握它，你就能让大模型为你工作。

## 🎯 学习目标

通过本节学习，你将能够：
- 理解${title}的工作原理
- 掌握实际的代码实现方法
- 了解最佳实践和常见陷阱

---

## 🔑 知识要点

### 1. 基本原理

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    API调用流程                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐ │
│   │  客户端  │───▶│  API    │───▶│  LLM    │───▶│  响应   │ │
│   │  请求    │    │  网关   │    │  模型   │    │  结果   │ │
│   └─────────┘    └─────────┘    └─────────┘    └─────────┘ │
│        │              │              │              │        │
│        ▼              ▼              ▼              ▼        │
│   构建消息      验证密钥      处理推理      返回结果        │
│   设置参数      限流检查      生成文本      格式化输出        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 2. 关键参数对比

| 参数 | 类型 | 说明 | 默认值 | 最佳实践 |
|------|------|------|--------|----------|
| \`model\` | string | 模型名称 | gpt-3.5-turbo | 生产环境用gpt-4 |
| \`temperature\` | float | 创造性 | 0.7 | 0-0.3用于精确任务，0.7-1用于创意任务 |
| \`max_tokens\` | int | 最大输出 | 无限 | 根据需求设置，避免过长 |
| \`top_p\` | float | 核采样 | 1 | 与temperature二选一调节 |
| \`stream\` | bool | 流式输出 | false | 用户交互时建议开启 |
| \`timeout\` | int | 超时(秒) | 无 | 建议设置30-60秒 |

### 3. 代码实现

\`\`\`python
import openai
from openai import OpenAI, APIError, RateLimitError, Timeout
import time

# 初始化客户端
client = OpenAI(
    api_key="your-api-key",
    timeout=30.0,  # 设置超时
    max_retries=3  # 自动重试
)

def chat_with_retry(messages, model="gpt-4", max_retries=3):
    """
    带重试机制的API调用

    Args:
        messages: 消息列表
        model: 模型名称
        max_retries: 最大重试次数

    Returns:
        模型响应内容
    """
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model=model,
                messages=messages,
                temperature=0.7,
                max_tokens=2000
            )
            return response.choices[0].message.content

        except RateLimitError:
            # 触发限流，指数退避
            wait_time = 2 ** attempt
            print(f"⚠️ 限流，等待{wait_time}秒后重试...")
            time.sleep(wait_time)

        except APIError as e:
            print(f"❌ API错误: {e}")
            if attempt == max_retries - 1:
                raise

        except Timeout:
            print("⏰ 请求超时")
            if attempt == max_retries - 1:
                raise

    return None

# 使用示例
messages = [
    {"role": "system", "content": "你是一个专业的AI助手"},
    {"role": "user", "content": "请解释什么是机器学习"}
]

response = chat_with_retry(messages)
print(response)
\`\`\`

### 4. 流式输出实现

\`\`\`python
def stream_chat(messages, model="gpt-4"):
    """
    流式输出，提升用户体验
    """
    stream = client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True  # 开启流式输出
    )

    full_response = ""
    for chunk in stream:
        if chunk.choices[0].delta.content:
            content = chunk.choices[0].delta.content
            print(content, end="", flush=True)
            full_response += content

    return full_response
\`\`\`

---

## 📊 错误处理策略

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                  错误处理决策树                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                    ┌───────────┐                         │
│                    │  API调用  │                         │
│                    └─────┬─────┘                         │
│                          │                              │
│            ┌─────────────┼─────────────┐                │
│            ▼             ▼             ▼                │
│     ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│     │ 成功(200)│  │ 限流(429)│  │ 错误(5xx)│           │
│     └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│          │             │             │                  │
│          ▼             ▼             ▼                  │
│     ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│     │ 返回结果 │  │ 指数退避 │  │ 重试3次  │           │
│     └──────────┘  │ 重试     │  │ 后失败   │           │
│                   └──────────┘  └──────────┘           │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## 💡 实战练习

### 练习1：基础对话
创建一个简单的命令行聊天程序，支持多轮对话。

### 练习2：错误处理
实现一个带完整错误处理的API调用函数。

### 练习3：流式输出
实现流式输出，并在终端中实时显示。

---

## 📝 本节小结

| 知识点 | 掌握程度 | 实际应用 |
|--------|----------|----------|
| API基本调用 | ⭐⭐⭐⭐⭐ | 所有AI应用的基础 |
| 参数配置 | ⭐⭐⭐⭐ | 优化输出质量 |
| 错误处理 | ⭐⭐⭐⭐ | 生产环境必备 |
| 流式输出 | ⭐⭐⭐ | 提升用户体验 |

---

## 🔗 延伸阅读

- [OpenAI API文档](https://platform.openai.com/docs)
- [最佳实践指南](https://platform.openai.com/docs/guides)

---

*完成本节练习后，继续学习下一节 →*`,

  // Prompt Engineering
  'prompt': (title) => `# ${title}

## 📌 核心概念

> **提示词工程** 是与AI沟通的艺术。好的提示词 = 好的输出。

## 🎯 学习目标

通过本节学习，你将能够：
- 掌握提示词设计的核心原则
- 学会使用各种提示词技巧
- 能够设计高质量的提示词模板

---

## 🔑 知识要点

### 1. 提示词设计原则

\`\`\`
┌─────────────────────────────────────────────────────────┐
│              提示词设计 CRISPE 原则                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  C - Capacity (角色): 设定AI扮演的角色                   │
│  R - Request (请求): 明确你的需求                        │
│  I - Input (输入): 提供必要的背景信息                    │
│  S - Style (风格): 指定输出风格                          │
│  P - Purpose (目的): 说明最终目标                        │
│  E - Extra (额外): 添加约束条件                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

### 2. 提示词技巧对比

| 技巧 | 说明 | 适用场景 | 示例 |
|------|------|----------|------|
| **Zero-Shot** | 直接提问 | 简单任务 | "翻译这句话" |
| **Few-Shot** | 给出示例 | 格式要求 | "示例1:...示例2:...请按此格式" |
| **Chain-of-Thought** | 逐步推理 | 复杂推理 | "让我们一步步思考" |
| **Role-Playing** | 角色扮演 | 专业任务 | "你是一位资深工程师" |
| **Template** | 模板填充 | 批量任务 | "请按以下模板生成" |

### 3. 实战代码

\`\`\`python
# 提示词模板系统
class PromptTemplate:
    def __init__(self, template: str, variables: list):
        self.template = template
        self.variables = variables

    def render(self, **kwargs) -> str:
        """渲染模板"""
        result = self.template
        for var in self.variables:
            if var in kwargs:
                result = result.replace(f"{{{var}}}", str(kwargs[var]))
        return result

# 定义模板
code_review_template = PromptTemplate(
    template="""你是一位拥有10年经验的{language}开发专家。

请审查以下代码，从{aspects}角度给出建议：

\`\`\`{language}
{code}
\`\`\`

请按以下格式输出：
## 问题发现
[列出问题]

## 改进建议
[给出建议]

## 重构方案
[提供重构后的代码]""",
    variables=["language", "aspects", "code"]
)

# 使用模板
prompt = code_review_template.render(
    language="Python",
    aspects="性能、安全、可读性",
    code="def fib(n): return n if n<2 else fib(n-1)+fib(n-2)"
)
\`\`\`

### 4. Chain-of-Thought 示例

\`\`\`python
cot_prompt = """
请一步一步思考以下问题：

问题：一个商店打8折促销，原价200元的商品，使用50元优惠券后，实际支付多少钱？

思考过程：
1. 首先，确定原价：200元
2. 然后，计算折扣：200 × 0.8 = 160元
3. 最后，使用优惠券：160 - 50 = 110元

答案：110元

现在请解决：一个商品原价350元，打7折后满200减30，实际支付多少？
"""
\`\`\`

---

## 📊 提示词优化流程

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                提示词优化迭代流程                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐            │
│   │ 初始    │───▶│ 测试    │───▶│ 评估    │            │
│   │ 提示词  │    │ 输出    │    │ 效果    │            │
│   └─────────┘    └─────────┘    └────┬────┘            │
│        ▲                             │                  │
│        │         ┌─────────┐         │                  │
│        │         │ 优化    │◀────────┘                  │
│        └─────────│ 提示词  │   不满意                    │
│                  └─────────┘                            │
│                      │                                  │
│                      ▼ 满意                             │
│                 ┌─────────┐                             │
│                 │ 完成    │                             │
│                 └─────────┘                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## 💡 实战练习

### 练习1：设计角色提示词
为你的工作场景设计一个角色提示词。

### 练习2：Few-Shot学习
使用3个示例训练AI完成特定格式的任务。

### 练习3：Chain-of-Thought
使用逐步推理解决一个复杂问题。

---

## 📝 本节小结

| 技巧 | 掌握难度 | 实用程度 | 学习优先级 |
|------|----------|----------|------------|
| Zero-Shot | ⭐ | ⭐⭐⭐ | 必学 |
| Few-Shot | ⭐⭐ | ⭐⭐⭐⭐ | 必学 |
| Chain-of-Thought | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 重点 |
| Role-Playing | ⭐⭐ | ⭐⭐⭐⭐ | 推荐 |

---

*完成本节练习后，继续学习下一节 →*`,

  // RAG related
  'rag': (title) => `# ${title}

## 📌 核心概念

> **RAG（检索增强生成）** 是让AI拥有"外部记忆"的关键技术。

## 🎯 学习目标

通过本节学习，你将能够：
- 理解RAG的完整工作流程
- 掌握文档处理和向量化方法
- 构建一个简单的RAG系统

---

## 🔑 知识要点

### 1. RAG完整流程

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                      RAG 完整工作流程                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  【索引阶段】                                                    │
│                                                                 │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│   │  文档    │───▶│  分块    │───▶│  向量化  │───▶│  存储    │ │
│   │  加载    │    │  处理    │    │  Embedding│   │  索引    │ │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│                                                                 │
│  【查询阶段】                                                    │
│                                                                 │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│   │  用户    │───▶│  查询    │───▶│  检索    │───▶│  生成    │ │
│   │  提问    │    │  向量化  │    │  相似文档│    │  回答    │ │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### 2. 分块策略对比

| 策略 | 块大小 | 重叠 | 优点 | 缺点 | 适用场景 |
|------|--------|------|------|------|----------|
| 固定长度 | 500-1000 | 50-100 | 简单快速 | 可能切断语义 | 结构化文档 |
| 递归分割 | 1000 | 200 | 保持语义 | 计算量大 | 通用文档 |
| 语义分块 | 动态 | 动态 | 语义完整 | 实现复杂 | 高质量需求 |
| 按段落 | 自然段 | 无 | 逻辑清晰 | 大小不均 | 文章、报告 |

### 3. 核心代码实现

\`\`\`python
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# ============ 1. 文档加载 ============
def load_documents(file_path: str):
    """加载文档"""
    if file_path.endswith('.pdf'):
        loader = PyPDFLoader(file_path)
    elif file_path.endswith('.txt'):
        loader = TextLoader(file_path)
    else:
        raise ValueError(f"不支持的文件格式: {file_path}")

    return loader.load()

# ============ 2. 文本分块 ============
def split_documents(documents, chunk_size=1000, chunk_overlap=200):
    """智能分块"""
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        separators=["\\n\\n", "\\n", "。", "！", "？", ".", " "]
    )
    return text_splitter.split_documents(documents)

# ============ 3. 创建向量数据库 ============
def create_vector_store(chunks):
    """创建向量索引"""
    embeddings = OpenAIEmbeddings()
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory="./chroma_db"  # 持久化存储
    )
    return vectorstore

# ============ 4. 创建RAG链 ============
def create_rag_chain(vectorstore):
    """创建RAG查询链"""
    llm = ChatOpenAI(model="gpt-4", temperature=0)
    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}  # 返回最相关的3个文档
    )

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True
    )
    return qa_chain

# ============ 完整使用流程 ============
# 1. 加载文档
docs = load_documents("knowledge_base.pdf")

# 2. 分块
chunks = split_documents(docs)
print(f"文档被分割为 {len(chunks)} 个块")

# 3. 创建向量数据库
vectorstore = create_vector_store(chunks)

# 4. 创建RAG链
qa_chain = create_rag_chain(vectorstore)

# 5. 查询
result = qa_chain.invoke({"query": "什么是机器学习？"})
print(result["result"])
print("来源文档:", [doc.metadata for doc in result["source_documents"]])
\`\`\`

---

## 📊 向量相似度计算

\`\`\`
┌─────────────────────────────────────────────────────────┐
│              余弦相似度计算原理                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   文档向量: [0.2, 0.5, 0.1, 0.8]                        │
│   查询向量: [0.3, 0.4, 0.2, 0.7]                        │
│                                                         │
│   余弦相似度 = (A·B) / (|A|×|B|)                        │
│                                                         │
│   = (0.2×0.3 + 0.5×0.4 + 0.1×0.2 + 0.8×0.7)           │
│     / (√(0.04+0.25+0.01+0.64) × √(0.09+0.16+0.04+0.49))│
│                                                         │
│   = 0.84 / (0.97 × 0.88)                               │
│                                                         │
│   ≈ 0.99 (高度相似)                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## 💡 实战练习

### 练习1：构建简单RAG
使用本节代码，为你的文档构建一个问答系统。

### 练习2：测试分块策略
对比不同分块策略的效果。

### 练习3：优化检索
调整检索参数，提高答案质量。

---

## 📝 本节小结

| 组件 | 作用 | 关键技术 | 掌握程度 |
|------|------|----------|----------|
| 文档加载 | 读取数据 | PyPDF, TextLoader | ⭐⭐⭐⭐ |
| 文本分块 | 切割文档 | RecursiveCharacterTextSplitter | ⭐⭐⭐⭐⭐ |
| 向量化 | 文本转向量 | OpenAI Embeddings | ⭐⭐⭐⭐ |
| 检索 | 找相似文档 | 余弦相似度 | ⭐⭐⭐⭐⭐ |
| 生成 | 回答问题 | RetrievalQA | ⭐⭐⭐⭐ |

---

*完成本节练习后，继续学习下一节 →*`,

  // Agent related
  'agent': (title) => `# ${title}

## 📌 核心概念

> **AI Agent** 是能够自主思考、规划和行动的智能系统。

## 🎯 学习目标

通过本节学习，你将能够：
- 理解Agent的核心架构
- 掌握ReAct推理框架
- 构建一个简单的Agent系统

---

## 🔑 知识要点

### 1. Agent核心架构

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                      AI Agent 架构图                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                        ┌─────────────┐                          │
│                        │   大脑(LLM) │                          │
│                        │   推理引擎   │                          │
│                        └──────┬──────┘                          │
│                               │                                 │
│           ┌───────────────────┼───────────────────┐             │
│           │                   │                   │             │
│           ▼                   ▼                   ▼             │
│    ┌──────────┐        ┌──────────┐        ┌──────────┐        │
│    │  记忆    │        │  规划    │        │  工具    │        │
│    │  Memory  │        │ Planning │        │  Tools   │        │
│    └────┬─────┘        └────┬─────┘        └────┬─────┘        │
│         │                   │                   │               │
│         ▼                   ▼                   ▼               │
│   ┌──────────┐        ┌──────────┐        ┌──────────┐         │
│   │短期记忆  │        │任务分解  │        │搜索引擎  │         │
│   │长期记忆  │        │步骤规划  │        │代码执行  │         │
│   │工作记忆  │        │优先级    │        │API调用   │         │
│   └──────────┘        └──────────┘        └──────────┘         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### 2. ReAct推理框架

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    ReAct 推理循环                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   用户: "帮我查一下北京今天的天气，然后推荐穿什么衣服"              │
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ 思考(Thought)                                           │  │
│   │ "用户想知道北京天气和穿衣建议，我需要先查天气"               │  │
│   └───────────────────────────┬─────────────────────────────┘  │
│                               │                                 │
│                               ▼                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ 行动(Action)                                            │  │
│   │ 调用天气API: get_weather("北京")                          │  │
│   └───────────────────────────┬─────────────────────────────┘  │
│                               │                                 │
│                               ▼                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ 观察(Observation)                                       │  │
│   │ "北京今天晴，温度15-22℃，风力3级"                         │  │
│   └───────────────────────────┬─────────────────────────────┘  │
│                               │                                 │
│                               ▼                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ 思考(Thought)                                           │  │
│   │ "天气信息已获取，现在需要给出穿衣建议"                      │  │
│   └───────────────────────────┬─────────────────────────────┘  │
│                               │                                 │
│                               ▼                                 │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │ 输出(Response)                                          │  │
│   │ "北京今天晴天，15-22℃，建议穿薄外套或长袖..."              │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### 3. 核心代码实现

\`\`\`python
from langchain.agents import initialize_agent, Tool, AgentType
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory
from langchain.utilities import SerpAPIWrapper

# ============ 1. 定义工具 ============
# 搜索工具
search = SerpAPIWrapper()

# 计算工具
def calculator(expression: str) -> str:
    """安全的数学计算"""
    try:
        return str(eval(expression))
    except Exception as e:
        return f"计算错误: {e}"

# 代码执行工具
def run_python(code: str) -> str:
    """执行Python代码"""
    import subprocess
    try:
        result = subprocess.run(
            ["python", "-c", code],
            capture_output=True,
            text=True,
            timeout=10
        )
        return result.stdout or result.stderr
    except subprocess.TimeoutExpired:
        return "代码执行超时"

# 注册工具
tools = [
    Tool(
        name="Search",
        func=search.run,
        description="用于搜索最新信息，如新闻、天气、实时数据"
    ),
    Tool(
        name="Calculator",
        func=calculator,
        description="用于数学计算，输入数学表达式"
    ),
    Tool(
        name="Python",
        func=run_python,
        description="用于执行Python代码，处理复杂任务"
    )
]

# ============ 2. 创建记忆系统 ============
memory = ConversationBufferMemory(
    memory_key="chat_history",
    return_messages=True
)

# ============ 3. 初始化Agent ============
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
    memory=memory,
    verbose=True  # 显示推理过程
)

# ============ 4. 使用Agent ============
response = agent.invoke({
    "input": "帮我计算一下，如果我每月存3000元，年利率3%，5年后有多少钱？"
})
print(response["output"])
\`\`\`

---

## 📊 Agent vs 传统对话

| 特性 | 传统对话 | AI Agent |
|------|----------|----------|
| 能力范围 | 仅文本生成 | 可调用工具 |
| 信息获取 | 依赖训练数据 | 实时搜索 |
| 任务复杂度 | 单轮问答 | 多步骤任务 |
| 记忆能力 | 有限上下文 | 长期记忆 |
| 自主性 | 被动响应 | 主动规划 |

---

## 💡 实战练习

### 练习1：构建问答Agent
创建一个能搜索网络回答问题的Agent。

### 练习2：添加自定义工具
为Agent添加一个自定义工具（如天气查询）。

### 练习3：多步骤任务
让Agent完成一个需要多步骤的任务。

---

## 📝 本节小结

| 组件 | 作用 | 关键点 | 掌握程度 |
|------|------|--------|----------|
| LLM大脑 | 推理决策 | 选择合适模型 | ⭐⭐⭐⭐⭐ |
| 工具系统 | 执行操作 | 工具设计 | ⭐⭐⭐⭐ |
| 记忆系统 | 保持上下文 | 短期/长期记忆 | ⭐⭐⭐⭐ |
| 规划能力 | 任务分解 | ReAct框架 | ⭐⭐⭐⭐⭐ |

---

*完成本节练习后，继续学习下一节 →*`,

  // Fine-tuning related
  'finetune': (title) => `# ${title}

## 📌 核心概念

> **模型微调** 是让通用大模型变成领域专家的关键技术。

## 🎯 学习目标

通过本节学习，你将能够：
- 理解微调的核心原理
- 掌握LoRA/QLoRA技术
- 完成一次模型微调

---

## 🔑 知识要点

### 1. 微调方法对比

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    微调方法对比图                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   方法           参数量        显存需求       效果               │
│   ─────────────────────────────────────────────────────         │
│   全量微调       100%         极高          最好               │
│   LoRA          1-10%        中等          接近全量             │
│   QLoRA         1-10%        低            接近LoRA             │
│   Prefix Tuning <1%          低            一般               │
│   Prompt Tuning <1%          极低          有限               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### 2. LoRA原理图解

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    LoRA 低秩分解原理                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   原始权重矩阵 W (d×d)                                          │
│   ┌─────────────────────────────────┐                          │
│   │  ┌───┬───┬───┬───┬───┬───┬───┐  │                          │
│   │  │   │   │   │   │   │   │   │  │  参数量: d² = 4096²      │
│   │  ├───┼───┼───┼───┼───┼───┼───┤  │        = 16,777,216     │
│   │  │   │   │   │   │   │   │   │  │                          │
│   │  ├───┼───┼───┼───┼───┼───┼───┤  │                          │
│   │  │   │   │   │   │   │   │   │  │                          │
│   │  └───┴───┴───┴───┴───┴───┴───┘  │                          │
│   └─────────────────────────────────┘                          │
│                                                                 │
│   LoRA分解: W' = A × B                                         │
│                                                                 │
│   A (d×r)        B (r×d)                                       │
│   ┌───┬───┐      ┌───┬───┬───┬───┬───┬───┬───┐                │
│   │   │   │      │   │   │   │   │   │   │   │                │
│   ├───┼───┤  ×   └───┴───┴───┴───┴───┴───┴───┘                │
│   │   │   │                                                     │
│   ├───┼───┤      参数量: 2×d×r = 2×4096×16 = 131,072           │
│   │   │   │      减少: 128倍!                                   │
│   └───┴───┘                                                     │
│                                                                 │
│   r=16 时，参数量从16M减少到131K                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### 3. 核心代码实现

\`\`\`python
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from transformers import TrainingArguments, Trainer
import torch

# ============ 1. 加载基座模型 ============
model_name = "meta-llama/Llama-2-7b-hf"

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    torch_dtype=torch.float16,
    device_map="auto",
    load_in_4bit=True  # 4bit量化加载
)

tokenizer = AutoTokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token

# ============ 2. 配置LoRA ============
lora_config = LoraConfig(
    r=16,                    # 低秩维度，越小参数越少
    lora_alpha=32,           # 缩放因子，通常为2×r
    target_modules=[         # 要微调的模块
        "q_proj",            # Query投影
        "v_proj",            # Value投影
        "k_proj",            # Key投影
        "o_proj",            # Output投影
        "gate_proj",         # Gate投影
        "up_proj",           # Up投影
        "down_proj"          # Down投影
    ],
    lora_dropout=0.05,       # Dropout防止过拟合
    bias="none",             # 不训练bias
    task_type="CAUSAL_LM"    # 任务类型
)

# 应用LoRA
model = prepare_model_for_kbit_training(model)
model = get_peft_model(model, lora_config)

# 打印可训练参数
model.print_trainable_parameters()
# 输出: trainable params: 13,107,200 || all params: 6,751,506,432 || trainable%: 0.194

# ============ 3. 准备训练数据 ============
def format_instruction(sample):
    """格式化训练数据"""
    return f"""### Instruction:
{sample['instruction']}

### Input:
{sample.get('input', '')}

### Response:
{sample['output']}"""

# ============ 4. 训练配置 ============
training_args = TrainingArguments(
    output_dir="./output",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    warmup_steps=100,
    logging_steps=10,
    save_steps=500,
    evaluation_strategy="steps",
    eval_steps=500,
    fp16=True,
    optim="paged_adamw_8bit"
)

# ============ 5. 开始训练 ============
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    data_collator=data_collator
)

trainer.train()

# ============ 6. 保存模型 ============
model.save_pretrained("./lora_model")
\`\`\`

---

## 📊 训练监控指标

| 指标 | 说明 | 健康值 | 异常处理 |
|------|------|--------|----------|
| Loss | 损失函数 | 持续下降 | 检查学习率 |
| Grad Norm | 梯度范数 | <1.0 | 梯度裁剪 |
| Learning Rate | 学习率 | 先增后减 | 调整warmup |
| Epoch | 训练轮次 | 3-10 | 防止过拟合 |

---

## 💡 实战练习

### 练习1：准备数据
为你的领域准备100条训练数据。

### 练习2：LoRA微调
使用LoRA微调一个7B模型。

### 练习3：评估效果
对比微调前后的效果。

---

## 📝 本节小结

| 环节 | 关键点 | 常见问题 | 掌握程度 |
|------|--------|----------|----------|
| 数据准备 | 质量>数量 | 数据格式 | ⭐⭐⭐⭐ |
| LoRA配置 | r和alpha | 过拟合 | ⭐⭐⭐⭐⭐ |
| 训练过程 | 监控loss | 梯度爆炸 | ⭐⭐⭐⭐ |
| 模型保存 | 保存adapter | 合并权重 | ⭐⭐⭐ |

---

*完成本节练习后，继续学习下一节 →*`,

  // Default template for other topics
  'default': (title) => `# ${title}

## 📌 核心概念

> **${title}** 是AI领域的重要技术方向，掌握它将为你的职业发展带来巨大优势。

## 🎯 学习目标

通过本节学习，你将能够：
- 理解${title}的核心原理
- 掌握实际的实现方法
- 了解最佳实践和应用场景

---

## 🔑 知识要点

### 1. 基本原理

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    ${title} 核心架构                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐ │
│   │  输入    │───▶│  处理    │───▶│  优化    │───▶│  输出    │ │
│   │  数据    │    │  模型    │    │  调优    │    │  结果    │ │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### 2. 技术对比

| 技术/方法 | 优点 | 缺点 | 适用场景 |
|-----------|------|------|----------|
| 方法A | 快速简单 | 精度有限 | 原型验证 |
| 方法B | 精度高 | 计算量大 | 生产环境 |
| 方法C | 平衡 | 需要调优 | 通用场景 |

### 3. 核心代码

\`\`\`python
# ${title} 实现示例
import torch
import numpy as np

class Implementation:
    def __init__(self, config):
        self.config = config
        self.model = self.build_model()

    def build_model(self):
        """构建模型"""
        # TODO: 实现模型构建
        pass

    def train(self, data):
        """训练模型"""
        for epoch in range(self.config.epochs):
            loss = self.train_epoch(data)
            print(f"Epoch {epoch}: loss={loss:.4f}")

    def predict(self, input_data):
        """预测"""
        with torch.no_grad():
            return self.model(input_data)

# 使用示例
config = {"epochs": 10, "lr": 0.001}
impl = Implementation(config)
result = impl.predict(test_data)
\`\`\`

---

## 📊 性能对比

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                    性能对比图                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   方法       准确率    速度    资源消耗                         │
│   ─────────────────────────────────────                        │
│   方法A      ████████░░  80%   快      低                      │
│   方法B      ██████████  95%   慢      高                      │
│   方法C      ████████░░  85%   中      中                      │
│                                                                 │
│   ████ = 效果指标                                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

---

## 💡 实战练习

### 练习1：基础实现
实现${title}的基础版本。

### 练习2：参数调优
测试不同参数对结果的影响。

### 练习3：性能优化
优化代码性能，提升处理速度。

---

## 📝 本节小结

| 知识点 | 重要程度 | 掌握难度 | 实际应用 |
|--------|----------|----------|----------|
| 基本原理 | ⭐⭐⭐⭐⭐ | ⭐⭐ | 所有场景 |
| 核心实现 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 开发必备 |
| 性能优化 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 生产环境 |
| 最佳实践 | ⭐⭐⭐⭐ | ⭐⭐⭐ | 团队协作 |

---

## 🔗 延伸阅读

- 官方文档
- 技术论文
- 开源项目

---

*完成本节练习后，继续学习下一节 →*`
};

// Determine which template to use based on lesson title
function getEnhancedTemplate(title) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes('api') || lowerTitle.includes('调用') || lowerTitle.includes('openai') ||
      lowerTitle.includes('claude') || lowerTitle.includes('gemini') || lowerTitle.includes('gpt') ||
      lowerTitle.includes('completions') || lowerTitle.includes('function calling') ||
      lowerTitle.includes('tool use') || lowerTitle.includes('vision')) {
    return enhancedTemplates.api(title);
  }

  if (lowerTitle.includes('prompt') || lowerTitle.includes('提示词') || lowerTitle.includes('few-shot') ||
      lowerTitle.includes('chain') || lowerTitle.includes('思维链') || lowerTitle.includes('输出格式')) {
    return enhancedTemplates.prompt(title);
  }

  if (lowerTitle.includes('rag') || lowerTitle.includes('检索') || lowerTitle.includes('向量') ||
      lowerTitle.includes('embedding') || lowerTitle.includes('知识库') || lowerTitle.includes('分块')) {
    return enhancedTemplates.rag(title);
  }

  if (lowerTitle.includes('agent') || lowerTitle.includes('代理') || lowerTitle.includes('工具调用') ||
      lowerTitle.includes('记忆') || lowerTitle.includes('规划') || lowerTitle.includes('react')) {
    return enhancedTemplates.agent(title);
  }

  if (lowerTitle.includes('微调') || lowerTitle.includes('finetune') || lowerTitle.includes('lora') ||
      lowerTitle.includes('qlora') || lowerTitle.includes('训练') || lowerTitle.includes('rlhf') ||
      lowerTitle.includes('dpo')) {
    return enhancedTemplates.finetune(title);
  }

  return enhancedTemplates.default(title);
}

async function main() {
  console.log('=== 开始升级课程内容 ===\n');

  // Get all lessons
  const lessons = await prisma.lesson.findMany({
    select: {
      id: true,
      title: true,
      type: true
    }
  });

  console.log(`找到 ${lessons.length} 节课程\n`);

  let success = 0;
  let failed = 0;

  for (const lesson of lessons) {
    try {
      const content = getEnhancedTemplate(lesson.title);

      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { content: content }
      });

      console.log(`✅ ${lesson.title}`);
      success++;
    } catch (error) {
      console.error(`❌ ${lesson.title}: ${error.message}`);
      failed++;
    }
  }

  console.log('\n=== 完成 ===');
  console.log(`成功: ${success}`);
  console.log(`失败: ${failed}`);
  console.log(`总计: ${lessons.length}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
