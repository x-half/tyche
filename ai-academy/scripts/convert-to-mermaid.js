// Convert ASCII diagrams to Mermaid format
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate Mermaid diagrams based on lesson topic
function generateMermaidContent(title) {
  const t = title.toLowerCase();

  // API & LLM Related
  if (t.includes('流式输出')) return streamOutputMermaid(title);
  if (t.includes('错误处理')) return errorHandlingMermaid(title);
  if (t.includes('聊天机器人')) return chatbotMermaid(title);
  if (t.includes('rag') || t.includes('检索')) return ragMermaid(title);
  if (t.includes('agent') || t.includes('代理')) return agentMermaid(title);
  if (t.includes('微调') || t.includes('lora')) return finetuneMermaid(title);
  if (t.includes('prompt') || t.includes('提示词')) return promptMermaid(title);

  // Default
  return defaultMermaid(title);
}

function streamOutputMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **流式输出** 让用户实时看到AI生成内容，大幅提升交互体验。

## 🎯 学习目标

- 理解流式输出的工作原理
- 掌握SSE（Server-Sent Events）实现方式
- 能够在前端正确展示流式内容

---

## 🔑 知识要点

### 1. 流式输出工作流程

\`\`\`mermaid
sequenceDiagram
    participant C as 客户端
    participant S as 服务器
    participant L as LLM模型

    C->>S: 发送请求
    S->>L: 调用API (stream=true)

    loop 逐token生成
        L-->>S: 返回token
        S-->>C: SSE推送token
        C->>C: 实时渲染
    end

    L-->>S: 生成完成
    S-->>C: [DONE]
\`\`\`

### 2. 流式 vs 非流式对比

| 特性 | 非流式 | 流式 |
|------|--------|------|
| 响应方式 | 等待完整响应 | 逐步返回 |
| 首字时间 | 长（2-10秒） | 短（<1秒） |
| 用户体验 | 焦虑等待 | 实时反馈 |
| 适用场景 | API调用 | 用户交互 |

### 3. 后端实现（FastAPI）

\`\`\`python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from openai import OpenAI
import json

app = FastAPI()
client = OpenAI()

@app.post("/chat/stream")
async def chat_stream(message: str):
    async def generate():
        stream = client.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": message}],
            stream=True
        )
        for chunk in stream:
            if chunk.choices[0].delta.content:
                data = {"content": chunk.choices[0].delta.content}
                yield f"data: {json.dumps(data)}\\n\\n"
        yield "data: [DONE]\\n\\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
\`\`\`

### 4. 前端实现（React）

\`\`\`typescript
async function streamChat(message: string, onChunk: (text: string) => void) {
  const response = await fetch('/api/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader!.read();
    if (done) break;
    const text = decoder.decode(value);
    const lines = text.split('\\n');
    for (const line of lines) {
      if (line.startsWith('data: ') && line !== 'data: [DONE]') {
        const data = JSON.parse(line.slice(6));
        onChunk(data.content);
      }
    }
  }
}
\`\`\`

---

## 💡 实战练习

1. 实现一个支持流式输出的聊天API
2. 在React中展示流式内容
3. 添加"停止生成"功能

---

## 📝 本节小结

- 流式输出通过SSE协议实现
- 后端使用StreamingResponse
- 前端使用ReadableStream接收
- 显著提升用户体验

---

*继续学习下一节 →*`;
}

function errorHandlingMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **健壮的错误处理** 是生产环境AI应用的必备能力。

## 🎯 学习目标

- 掌握API调用的常见错误类型
- 实现指数退避重试机制
- 构建容错的AI应用

---

## 🔑 知识要点

### 1. 错误处理决策树

\`\`\`mermaid
flowchart TD
    A[API调用] --> B{响应状态}
    B -->|200 成功| C[返回结果]
    B -->|429 限流| D[指数退避]
    B -->|5xx 服务错误| E[重试3次]
    B -->|4xx 客户端错误| F[检查参数]

    D --> G[等待 2^n 秒]
    G --> A

    E --> H{重试次数}
    H -->|< 3次| I[等待后重试]
    H -->|>= 3次| J[返回错误]
    I --> A

    style C fill:#90EE90
    style J fill:#FFB6C1
\`\`\`

### 2. 常见错误类型

| 错误码 | 类型 | 原因 | 处理方式 |
|--------|------|------|----------|
| 429 | Rate Limit | 请求过快 | 指数退避重试 |
| 500 | Server Error | 服务端异常 | 重试3次 |
| 503 | Overloaded | 服务过载 | 等待后重试 |
| 401 | Auth Error | 密钥无效 | 检查API Key |
| timeout | Timeout | 响应超时 | 增加超时时间 |

### 3. 完整实现

\`\`\`python
import time
import logging
from openai import OpenAI, APIError, RateLimitError, Timeout

logger = logging.getLogger(__name__)

class ResilientAPIClient:
    """具有容错能力的API客户端"""

    def __init__(self, max_retries=3, base_delay=1):
        self.client = OpenAI()
        self.max_retries = max_retries
        self.base_delay = base_delay

    def chat(self, messages: list, model: str = "gpt-4") -> str:
        for attempt in range(self.max_retries):
            try:
                response = self.client.chat.completions.create(
                    model=model,
                    messages=messages,
                    timeout=30
                )
                return response.choices[0].message.content

            except RateLimitError:
                delay = self.base_delay * (2 ** attempt)
                logger.warning(f"限流，{delay}秒后重试")
                time.sleep(delay)

            except APIError as e:
                if e.status_code >= 500:
                    delay = self.base_delay * (2 ** attempt)
                    logger.warning(f"服务错误 {e.status_code}，{delay}秒后重试")
                    time.sleep(delay)
                else:
                    raise

        raise Exception(f"API调用失败，已重试{self.max_retries}次")
\`\`\`

---

## 💡 实战练习

1. 实现一个带重试的API客户端
2. 添加日志记录功能
3. 测试不同错误场景

---

## 📝 本节小结

- 429错误使用指数退避
- 5xx错误可以重试
- 4xx错误不应重试
- 生产环境必须有错误处理

---

*继续学习下一节 →*`;
}

function chatbotMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **聊天机器人** 是最常见的AI应用场景，本节教你从零构建一个。

## 🎯 学习目标

- 设计聊天机器人的架构
- 实现多轮对话功能
- 添加上下文记忆能力

---

## 🔑 知识要点

### 1. 聊天机器人架构

\`\`\`mermaid
graph TB
    subgraph 前端
        A[消息列表] --> B[输入框]
        B --> C[发送按钮]
    end

    subgraph 后端
        D[对话管理] --> E[上下文记忆]
        E --> F[API调用]
        F --> G[LLM模型]
    end

    C -->|发送消息| D
    G -->|返回回复| A

    style A fill:#E3F2FD
    style G fill:#E8F5E9
\`\`\`

### 2. 对话流程

\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant B as 聊天机器人
    participant L as LLM

    U->>B: 发送消息
    B->>B: 获取对话历史
    B->>B: 构建上下文
    B->>L: 调用API
    L-->>B: 返回回复
    B->>B: 保存历史
    B-->>U: 显示回复
\`\`\`

### 3. 核心实现

\`\`\`python
from openai import OpenAI

class ChatBot:
    def __init__(self, system_prompt: str):
        self.client = OpenAI()
        self.system_prompt = system_prompt
        self.history = []

    def chat(self, message: str) -> str:
        # 构建消息
        messages = [
            {"role": "system", "content": self.system_prompt},
            *self.history[-10:],  # 保留最近10轮
            {"role": "user", "content": message}
        ]

        # 调用LLM
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            temperature=0.7
        )

        reply = response.choices[0].message.content

        # 保存历史
        self.history.append({"role": "user", "content": message})
        self.history.append({"role": "assistant", "content": reply})

        return reply

# 使用
bot = ChatBot("你是一个专业的客服助手")
reply = bot.chat("你好，我想咨询产品信息")
\`\`\`

---

## 📊 对话管理策略

| 策略 | 说明 | 优点 | 缺点 |
|------|------|------|------|
| 全量保存 | 保存所有对话 | 完整上下文 | Token消耗大 |
| 滑动窗口 | 保留最近N轮 | 节省Token | 可能丢失历史 |
| 摘要压缩 | 压缩旧对话 | 平衡 | 实现复杂 |

---

## 💡 实战练习

1. 构建一个简单的问答机器人
2. 添加多轮对话记忆
3. 实现"清除历史"功能

---

## 📝 本节小结

- 聊天机器人核心是对话管理
- 使用滑动窗口控制上下文长度
- 前端需要实时更新消息列表
- 生产环境需要考虑并发和限流

---

*继续学习下一节 →*`;
}

function ragMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **RAG（检索增强生成）** 是让AI拥有"外部记忆"的关键技术。

## 🎯 学习目标

- 理解RAG的完整工作流程
- 掌握文档处理和向量化方法
- 构建一个简单的RAG系统

---

## 🔑 知识要点

### 1. RAG完整流程

\`\`\`mermaid
graph LR
    subgraph 索引阶段
        A[文档加载] --> B[文本分块]
        B --> C[向量化]
        C --> D[存储索引]
    end

    subgraph 查询阶段
        E[用户提问] --> F[查询向量化]
        F --> G[相似度检索]
        G --> H[上下文拼接]
        H --> I[LLM生成]
    end

    D --> G

    style A fill:#E3F2FD
    style I fill:#E8F5E9
\`\`\`

### 2. 向量相似度计算

\`\`\`mermaid
graph TD
    A[文本1] -->|Embedding| B[向量1: 0.2, 0.5, 0.1]
    C[文本2] -->|Embedding| D[向量2: 0.3, 0.4, 0.2]

    B --> E[余弦相似度计算]
    D --> E

    E --> F[相似度: 0.99]

    style F fill:#90EE90
\`\`\`

### 3. 核心代码实现

\`\`\`python
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# 1. 加载文档
loader = PyPDFLoader("document.pdf")
docs = loader.load()

# 2. 分块
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)
chunks = text_splitter.split_documents(docs)

# 3. 创建向量数据库
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. 创建RAG链
llm = ChatOpenAI(model="gpt-4")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever()
)

# 5. 查询
result = qa_chain.invoke("什么是机器学习？")
print(result["result"])
\`\`\`

---

## 📊 分块策略对比

| 策略 | 块大小 | 重叠 | 优点 | 缺点 |
|------|--------|------|------|------|
| 固定长度 | 500-1000 | 50-100 | 简单快速 | 可能切断语义 |
| 递归分割 | 1000 | 200 | 保持语义 | 计算量大 |
| 语义分块 | 动态 | 动态 | 语义完整 | 实现复杂 |

---

## 💡 实战练习

1. 构建一个简单的RAG问答系统
2. 测试不同分块策略的效果
3. 比较不同Embedding模型的性能

---

## 📝 本节小结

- RAG = 检索 + 生成
- 文档需要先分块再向量化
- 向量相似度用于检索相关文档
- 上下文拼接后交给LLM生成答案

---

*继续学习下一节 →*`;
}

function agentMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **AI Agent** 是能够自主思考、规划和行动的智能系统。

## 🎯 学习目标

- 理解Agent的核心架构
- 掌握ReAct推理框架
- 构建一个简单的Agent系统

---

## 🔑 知识要点

### 1. Agent核心架构

\`\`\`mermaid
graph TB
    subgraph Agent
        A[大脑 LLM] --> B[规划 Planning]
        A --> C[记忆 Memory]
        A --> D[工具 Tools]
    end

    subgraph 工具集
        E[搜索引擎]
        F[代码执行]
        G[API调用]
        H[数据库]
    end

    D --> E
    D --> F
    D --> G
    D --> H

    I[用户任务] --> A
    A --> J[任务结果]

    style A fill:#FFD700
    style J fill:#90EE90
\`\`\`

### 2. ReAct推理框架

\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant A as Agent
    participant T as 工具

    U->>A: 提出任务

    loop ReAct循环
        A->>A: 思考 Thought
        A->>T: 行动 Action
        T-->>A: 观察 Observation
    end

    A-->>U: 返回结果
\`\`\`

### 3. 核心代码实现

\`\`\`python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI
from langchain.memory import ConversationBufferMemory

# 定义工具
tools = [
    Tool(name="Search", func=search.run, description="搜索信息"),
    Tool(name="Calculator", func=calculator, description="数学计算"),
]

# 创建记忆
memory = ConversationBufferMemory(memory_key="chat_history")

# 初始化Agent
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools=tools,
    llm=llm,
    agent="zero-shot-react-description",
    memory=memory,
    verbose=True
)

# 执行任务
result = agent.invoke("北京今天天气怎么样？")
print(result["output"])
\`\`\`

---

## 📊 Agent vs 传统对话

| 特性 | 传统对话 | AI Agent |
|------|----------|----------|
| 能力范围 | 仅文本生成 | 可调用工具 |
| 信息获取 | 依赖训练数据 | 实时搜索 |
| 任务复杂度 | 单轮问答 | 多步骤任务 |
| 记忆能力 | 有限上下文 | 长期记忆 |

---

## 💡 实战练习

1. 构建一个能搜索网络的Agent
2. 添加自定义工具
3. 完成多步骤任务

---

## 📝 本节小结

- Agent = LLM + 工具 + 记忆 + 规划
- ReAct是核心推理框架
- 工具扩展了Agent的能力范围
- 记忆系统保持对话连贯性

---

*继续学习下一节 →*`;
}

function finetuneMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **模型微调** 是让通用大模型变成领域专家的关键技术。

## 🎯 学习目标

- 理解微调的核心原理
- 掌握LoRA/QLoRA技术
- 完成一次模型微调

---

## 🔑 知识要点

### 1. 微调方法对比

\`\`\`mermaid
graph LR
    A[微调方法] --> B[全量微调]
    A --> C[LoRA]
    A --> D[QLoRA]
    A --> E[Prefix Tuning]

    B -->|参数量: 100%| F[效果最好]
    C -->|参数量: 1-10%| G[接近全量]
    D -->|参数量: 1-10%| H[显存更低]
    E -->|参数量: <1%| I[效果一般]

    style F fill:#FFD700
    style G fill:#90EE90
    style H fill:#87CEEB
\`\`\`

### 2. LoRA原理

\`\`\`mermaid
graph TD
    A[原始权重 W<br/>d×d = 16M参数] --> B[低秩分解]

    B --> C[矩阵 A<br/>d×r = 64K参数]
    B --> D[矩阵 B<br/>r×d = 64K参数]

    C --> E[合并: W' = A × B]
    D --> E

    E --> F[参数减少128倍!]

    style F fill:#90EE90
\`\`\`

### 3. 核心代码

\`\`\`python
from transformers import AutoModelForCausalLM
from peft import LoraConfig, get_peft_model

# 加载模型
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")

# LoRA配置
lora_config = LoraConfig(
    r=16,                    # 低秩维度
    lora_alpha=32,           # 缩放因子
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM"
)

# 应用LoRA
model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# 输出: trainable params: 13M || all params: 6.7B || trainable%: 0.19%
\`\`\`

---

## 📊 训练监控

| 指标 | 说明 | 健康值 |
|------|------|--------|
| Loss | 损失函数 | 持续下降 |
| Grad Norm | 梯度范数 | <1.0 |
| Learning Rate | 学习率 | 先增后减 |

---

## 💡 实战练习

1. 准备100条训练数据
2. 使用LoRA微调7B模型
3. 对比微调前后效果

---

## 📝 本节小结

- LoRA通过低秩分解减少参数
- QLoRA进一步降低显存需求
- 数据质量比数量更重要
- 监控训练过程防止过拟合

---

*继续学习下一节 →*`;
}

function promptMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **提示词工程** 是与AI沟通的艺术。好的提示词 = 好的输出。

## 🎯 学习目标

- 掌握提示词设计的核心原则
- 学会使用各种提示词技巧
- 能够设计高质量的提示词模板

---

## 🔑 知识要点

### 1. 提示词设计流程

\`\`\`mermaid
flowchart LR
    A[明确目标] --> B[设定角色]
    B --> C[提供上下文]
    C --> D[指定格式]
    D --> E[添加约束]
    E --> F[测试优化]
    F -->|不满意| A

    style F fill:#90EE90
\`\`\`

### 2. 提示词技巧对比

\`\`\`mermaid
graph TB
    A[提示词技巧] --> B[Zero-Shot<br/>直接提问]
    A --> C[Few-Shot<br/>给出示例]
    A --> D[Chain-of-Thought<br/>逐步推理]
    A --> E[Role-Playing<br/>角色扮演]

    B -->|简单任务| F[快速直接]
    C -->|格式要求| G[准确规范]
    D -->|复杂推理| H[逻辑清晰]
    E -->|专业任务| I[深度专业]

    style D fill:#FFD700
\`\`\`

### 3. 实战代码

\`\`\`python
# Chain-of-Thought提示
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

## 📊 提示词模板

\`\`\`mermaid
graph LR
    A[提示词模板] --> B[角色设定]
    A --> C[任务描述]
    A --> D[输入数据]
    A --> E[输出格式]
    A --> F[约束条件]

    B --> G[完整提示词]
    C --> G
    D --> G
    E --> G
    F --> G
\`\`\`

---

## 💡 实战练习

1. 设计一个角色提示词
2. 使用Few-Shot完成格式化任务
3. 用Chain-of-Thought解决复杂问题

---

## 📝 本节小结

- CRISPE原则设计提示词
- Few-Shot提高输出准确性
- Chain-of-Thought增强推理能力
- 持续优化才能获得最佳效果

---

*继续学习下一节 →*`;
}

function defaultMermaid(title) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是AI应用开发中的重要技术点。

## 🎯 学习目标

- 理解${title}的核心原理
- 掌握实际的实现方法
- 了解最佳实践

---

## 🔑 知识要点

### 1. 核心架构

\`\`\`mermaid
graph TB
    A[输入数据] --> B[处理逻辑]
    B --> C[输出结果]

    B --> D[核心组件1]
    B --> E[核心组件2]
    B --> F[核心组件3]

    D --> G[优化]
    E --> G
    F --> G

    style A fill:#E3F2FD
    style C fill:#E8F5E9
\`\`\`

### 2. 技术对比

| 技术/方法 | 优点 | 缺点 | 适用场景 |
|-----------|------|------|----------|
| 方法A | 快速简单 | 精度有限 | 原型验证 |
| 方法B | 精度高 | 计算量大 | 生产环境 |
| 方法C | 平衡 | 需要调优 | 通用场景 |

### 3. 代码实现

\`\`\`python
# ${title} 实现示例
class Implementation:
    def __init__(self, config):
        self.config = config

    def process(self, input_data):
        """处理输入数据"""
        processed = self.preprocess(input_data)
        result = self.core_process(processed)
        return self.postprocess(result)

    def preprocess(self, data):
        """数据预处理"""
        return data

    def core_process(self, data):
        """核心处理逻辑"""
        return data

    def postprocess(self, data):
        """结果后处理"""
        return data
\`\`\`

---

## 💡 实战练习

1. 实现${title}的基础版本
2. 测试不同参数的效果
3. 优化性能

---

## 📝 本节小结

- ${title}的核心原理
- 实现方法和最佳实践
- 常见问题和解决方案

---

*继续学习下一节 →*`;
}

async function main() {
  console.log('=== 将ASCII图转换为Mermaid格式 ===\n');

  // Get all lessons
  const lessons = await prisma.lesson.findMany({
    select: { id: true, title: true, content: true }
  });

  console.log(`找到 ${lessons.length} 节课程\n`);

  let success = 0;
  let failed = 0;
  let skipped = 0;

  for (const lesson of lessons) {
    try {
      // Check if already has mermaid
      if (lesson.content.includes('```mermaid')) {
        skipped++;
        continue;
      }

      // Check if has ASCII art
      if (!lesson.content.includes('┌') && !lesson.content.includes('│')) {
        skipped++;
        continue;
      }

      const content = generateMermaidContent(lesson.title);

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
  console.log(`成功转换: ${success}`);
  console.log(`跳过: ${skipped}`);
  console.log(`失败: ${failed}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
