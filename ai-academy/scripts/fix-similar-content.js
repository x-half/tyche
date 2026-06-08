// Fix all similar content by generating unique content for each lesson
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate unique content based on lesson title and course context
function generateUniqueContent(title, courseTitle) {
  const t = title.toLowerCase();
  const c = courseTitle.toLowerCase();

  // ============ 聊天机器人类 ============
  if (t === '聊天机器人实战') {
    return `# 聊天机器人实战

## 📌 核心概念

> **聊天机器人实战** 从零开始构建一个功能完整的聊天机器人。

## 🎯 学习目标

- 搭建聊天机器人的基础框架
- 实现用户消息接收和响应
- 集成LLM进行智能回复

---

## 🔑 知识要点

### 1. 项目结构

\`\`\`mermaid
graph TB
    A[项目结构] --> B[前端]
    A --> C[后端]
    A --> D[数据库]

    B --> B1[React组件]
    B --> B2[消息列表]
    B --> B3[输入框]

    C --> C1[API路由]
    C --> C2[LLM调用]
    C --> C3[会话管理]

    D --> D1[用户数据]
    D --> D2[对话历史]

    style A fill:#E3F2FD
\`\`\`

### 2. 基础代码

\`\`\`python
from fastapi import FastAPI
from openai import OpenAI

app = FastAPI()
client = OpenAI()

@app.post("/chat")
async def chat(message: str):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": message}]
    )
    return {"reply": response.choices[0].message.content}
\`\`\`

---

## 💡 实战练习

1. 创建FastAPI项目
2. 实现基础聊天接口
3. 测试LLM调用

---

## 📝 本节小结

- 聊天机器人需要前后端配合
- LLM调用是核心功能
- 会话管理保持对话连贯

---

*继续学习下一节 →*`;
  }

  if (t === '构建第一个聊天机器人') {
    return `# 构建第一个聊天机器人

## 📌 核心概念

> **动手实践** 从零构建你的第一个聊天机器人。

## 🎯 学习目标

- 完成聊天机器人的完整开发流程
- 理解前后端交互机制
- 掌握LLM API调用方法

---

## 🔑 知识要点

### 1. 开发流程

\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant B as 后端
    participant L as LLM

    U->>F: 输入消息
    F->>B: POST /api/chat
    B->>L: 调用API
    L-->>B: 返回回复
    B-->>F: 返回JSON
    F-->>U: 显示回复
\`\`\`

### 2. 前端实现

\`\`\`javascript
// React聊天组件
function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    setMessages([...messages, { text: input, reply: data.reply }]);
  };

  return (
    <div>
      {messages.map((m, i) => <div key={i}>{m.text}: {m.reply}</div>)}
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>发送</button>
    </div>
  );
}
\`\`\`

---

## 💡 实战练习

1. 创建React前端项目
2. 实现消息发送功能
3. 对接后端API

---

## 📝 本节小结

- 前端负责用户交互
- 后端负责LLM调用
- 状态管理很重要

---

*继续学习下一节 →*`;
  }

  if (t === '项目：客服聊天机器人') {
    return `# 项目：客服聊天机器人

## 📌 核心概念

> **实战项目** 构建一个专业的客服聊天机器人系统。

## 🎯 学习目标

- 设计客服机器人的业务逻辑
- 实现多轮对话和意图识别
- 集成知识库进行精准回答

---

## 🔑 知识要点

### 1. 客服机器人架构

\`\`\`mermaid
graph TB
    A[用户输入] --> B[意图识别]
    B --> C{意图类型}
    C -->|产品咨询| D[知识库检索]
    C -->|售后服务| E[工单系统]
    C -->|投诉建议| F[人工转接]

    D --> G[生成回复]
    E --> G
    F --> H[人工客服]

    G --> I[返回用户]

    style A fill:#E3F2FD
    style I fill:#90EE90
\`\`\`

### 2. 知识库集成

\`\`\`python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# 创建知识库
knowledge_base = Chroma.from_documents(docs, embeddings)

def get_answer(question):
    # 检索相关文档
    docs = knowledge_base.similarity_search(question, k=3)
    context = "\\n".join([d.page_content for d in docs])

    # 生成回答
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": f"基于以下信息回答：{context}"},
            {"role": "user", "content": question}
        ]
    )
    return response.choices[0].message.content
\`\`\`

---

## 💡 实战练习

1. 设计客服场景和知识库
2. 实现意图识别功能
3. 集成知识库进行回答

---

## 📝 本节小结

- 客服机器人需要业务知识
- 意图识别是关键环节
- 知识库保证回答准确性

---

*继续学习下一节 →*`;
  }

  // ============ 提示词类 ============
  if (t === '什么是prompt engineering') {
    return `# 什么是Prompt Engineering

## 📌 核心概念

> **Prompt Engineering** 是设计和优化提示词以获得更好AI输出的技术。

## 🎯 学习目标

- 理解Prompt Engineering的定义
- 掌握提示词的基本结构
- 了解为什么需要提示词工程

---

## 🔑 知识要点

### 1. 定义与作用

Prompt Engineering是指通过精心设计输入给AI的文本指令，来引导模型产生符合预期输出的技术。

### 2. 提示词结构

\`\`\`mermaid
graph LR
    A[提示词] --> B[角色设定]
    A --> C[任务描述]
    A --> D[输入数据]
    A --> E[输出格式]
    A --> F[约束条件]

    style A fill:#E3F2FD
\`\`\`

### 3. 为什么需要

| 没有提示词工程 | 有提示词工程 |
|----------------|--------------|
| 输出不可预测 | 输出可控 |
| 质量参差不齐 | 质量稳定 |
| 需要多次尝试 | 一次到位 |

---

## 💡 实战练习

1. 对比不同提示词的输出效果
2. 设计一个基础提示词模板

---

## 📝 本节小结

- Prompt Engineering是与AI沟通的艺术
- 好的提示词 = 好的输出
- 结构化提示词更有效

---

*继续学习下一节 →*`;
  }

  if (t === 'llm如何理解提示词') {
    return `# LLM如何理解提示词

## 📌 核心概念

> **理解机制** 了解LLM如何解析和理解提示词。

## 🎯 学习目标

- 理解LLM的token化过程
- 掌握上下文窗口的工作原理
- 了解注意力机制如何处理提示词

---

## 🔑 知识要点

### 1. Token化过程

\`\`\`mermaid
graph LR
    A[原始文本] --> B[分词器]
    B --> C[Token序列]
    C --> D[Embedding]
    D --> E[模型处理]

    style A fill:#E3F2FD
    style E fill:#90EE90
\`\`\`

### 2. 注意力机制

LLM通过自注意力机制理解提示词中各个token之间的关系：

| 注意力类型 | 作用 | 示例 |
|------------|------|------|
| 自注意力 | 理解上下文 | "它"指代什么 |
| 交叉注意力 | 关联输入输出 | 问题与答案 |

### 3. 上下文窗口

\`\`\`
┌─────────────────────────────────────┐
│         上下文窗口 (4K/8K/32K)       │
├─────────────────────────────────────┤
│ [系统提示] [历史对话] [当前输入]      │
│     ↓         ↓         ↓          │
│   角色设定   上下文    当前问题       │
└─────────────────────────────────────┘
\`\`\`

---

## 💡 实战练习

1. 测试不同长度提示词的效果
2. 观察上下文对输出的影响

---

## 📝 本节小结

- LLM通过token化理解文本
- 注意力机制捕捉语义关系
- 上下文窗口限制了记忆长度

---

*继续学习下一节 →*`;
  }

  if (t === '基础提示词模板') {
    return `# 基础提示词模板

## 📌 核心概念

> **模板化** 使用标准化模板提高提示词效率。

## 🎯 学习目标

- 掌握常用提示词模板
- 学会根据场景选择模板
- 能够自定义提示词模板

---

## 🔑 知识要点

### 1. 角色模板

\`\`\`
你是一位{角色}，拥有{经验}经验。

请帮我{任务描述}。

要求：
1. {要求1}
2. {要求2}
3. {要求3}

输出格式：{格式说明}
\`\`\`

### 2. 分析模板

\`\`\`mermaid
graph TB
    A[分析模板] --> B[背景说明]
    A --> C[分析目标]
    A --> D[数据输入]
    A --> E[输出要求]

    B --> F[完整提示词]
    C --> F
    D --> F
    E --> F

    style A fill:#E3F2FD
\`\`\`

### 3. 常用模板对比

| 模板类型 | 适用场景 | 复杂度 |
|----------|----------|--------|
| 角色模板 | 专业任务 | 低 |
| 分析模板 | 数据处理 | 中 |
| 创作模板 | 内容生成 | 中 |
| 对话模板 | 聊天机器人 | 高 |

---

## 💡 实战练习

1. 使用角色模板完成一个任务
2. 设计一个自定义模板

---

## 📝 本节小结

- 模板化提高效率
- 不同场景使用不同模板
- 模板需要根据需求调整

---

*继续学习下一节 →*`;
  }

  if (t === 'meta-prompting技术') {
    return `# Meta-Prompting技术

## 📌 核心概念

> **Meta-Prompting** 让AI自己生成和优化提示词的技术。

## 🎯 学习目标

- 理解Meta-Prompting的原理
- 掌握让AI生成提示词的方法
- 学会迭代优化提示词

---

## 🔑 知识要点

### 1. 什么是Meta-Prompting

Meta-Prompting是使用AI来生成、评估和优化提示词的技术。

### 2. 工作流程

\`\`\`mermaid
graph LR
    A[初始需求] --> B[AI生成提示词]
    B --> C[测试效果]
    C --> D{满意?}
    D -->|否| E[AI优化提示词]
    E --> C
    D -->|是| F[最终提示词]

    style A fill:#E3F2FD
    style F fill:#90EE90
\`\`\`

### 3. 实现代码

\`\`\`python
def meta_prompt(task_description):
    # 让AI生成提示词
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "user",
            "content": f"为以下任务生成最佳提示词：{task_description}"
        }]
    )
    return response.choices[0].message.content

def optimize_prompt(prompt, feedback):
    # 让AI优化提示词
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{
            "role": "user",
            "content": f"优化以下提示词，反馈：{feedback}\\n原提示词：{prompt}"
        }]
    )
    return response.choices[0].message.content
\`\`\`

---

## 💡 实战练习

1. 使用Meta-Prompting生成一个提示词
2. 通过反馈迭代优化

---

## 📝 本节小结

- Meta-Prompting让AI帮助设计提示词
- 迭代优化可以提高效果
- 适用于复杂提示词场景

---

*继续学习下一节 →*`;
  }

  // ============ Agent类 ============
  if (t === '什么是ai agent') {
    return `# 什么是AI Agent

## 📌 核心概念

> **AI Agent** 是能够自主完成任务的智能系统，具备感知、决策和执行能力。

## 🎯 学习目标

- 理解AI Agent的定义和特点
- 掌握Agent与传统AI的区别
- 了解Agent的应用场景

---

## 🔑 知识要点

### 1. Agent定义

AI Agent是一个能够感知环境、做出决策并执行行动的自主系统。

### 2. Agent vs 传统AI

\`\`\`mermaid
graph TB
    subgraph 传统AI
        A1[输入] --> A2[处理]
        A2 --> A3[输出]
    end

    subgraph AI Agent
        B1[感知] --> B2[规划]
        B2 --> B3[执行]
        B3 --> B4[反馈]
        B4 --> B1
    end

    style 传统AI fill:#E3F2FD
    style AI Agent fill:#90EE90
\`\`\`

### 3. 核心特点

| 特点 | 说明 | 示例 |
|------|------|------|
| 自主性 | 独立完成任务 | 自动写代码 |
| 感知性 | 理解环境 | 读取文件 |
| 决策性 | 选择行动 | 选择工具 |
| 学习性 | 改进性能 | 记忆经验 |

---

## 💡 实战练习

1. 列出3个Agent应用场景
2. 对比Agent与传统AI的区别

---

## 📝 本节小结

- Agent是自主智能系统
- 具备感知、决策、执行能力
- 适用于复杂任务场景

---

*继续学习下一节 →*`;
  }

  if (t === 'agent的组成要素') {
    return `# Agent的组成要素

## 📌 核心概念

> **四大组件** Agent由大脑、工具、记忆和规划四个核心部分组成。

## 🎯 学习目标

- 理解Agent的四大核心组件
- 掌握每个组件的作用和实现
- 了解组件之间的协作关系

---

## 🔑 知识要点

### 1. 核心架构

\`\`\`mermaid
graph TB
    A[Agent] --> B[大脑 LLM]
    A --> C[工具 Tools]
    A --> D[记忆 Memory]
    A --> E[规划 Planning]

    B --> B1[推理]
    B --> B2[决策]

    C --> C1[搜索]
    C --> C2[计算]
    C --> C3[API]

    D --> D1[短期记忆]
    D --> D2[长期记忆]

    E --> E1[任务分解]
    E --> E2[步骤规划]

    style A fill:#FFD700
\`\`\`

### 2. 组件详解

| 组件 | 作用 | 实现方式 |
|------|------|----------|
| 大脑 | 推理决策 | GPT-4/Claude |
| 工具 | 执行操作 | Function Calling |
| 记忆 | 保持上下文 | 向量数据库 |
| 规划 | 任务分解 | ReAct框架 |

---

## 💡 实战练习

1. 设计一个简单Agent的组件结构
2. 实现一个工具调用功能

---

## 📝 本节小结

- Agent = 大脑 + 工具 + 记忆 + 规划
- 每个组件都有特定作用
- 组件协作完成复杂任务

---

*继续学习下一节 →*`;
  }

  if (t === '构建你的第一个agent') {
    return `# 构建你的第一个Agent

## 📌 核心概念

> **动手实践** 从零构建一个功能完整的AI Agent。

## 🎯 学习目标

- 搭建Agent的基础框架
- 实现工具调用功能
- 完成一个简单任务

---

## 🔑 知识要点

### 1. 开发流程

\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant A as Agent
    participant T as 工具
    participant L as LLM

    U->>A: 提出任务
    A->>L: 分析任务
    L-->>A: 制定计划
    A->>T: 调用工具
    T-->>A: 返回结果
    A-->>U: 完成任务
\`\`\`

### 2. 基础代码

\`\`\`python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

# 定义工具
def search(query):
    return f"搜索结果: {query}"

tools = [
    Tool(name="Search", func=search, description="搜索信息")
]

# 创建Agent
llm = OpenAI(temperature=0)
agent = initialize_agent(tools, llm, agent="zero-shot-react")

# 执行任务
result = agent.invoke("今天北京天气怎么样？")
print(result)
\`\`\`

---

## 💡 实战练习

1. 创建一个简单的Agent
2. 添加一个自定义工具
3. 测试Agent执行任务

---

## 📝 本节小结

- Agent开发需要定义工具
- LLM负责推理和决策
- 工具扩展Agent能力

---

*继续学习下一节 →*`;
  }

  // ============ RAG类 ============
  if (t === '什么是rag：检索增强生成概述') {
    return `# 什么是RAG：检索增强生成概述

## 📌 核心概念

> **RAG（检索增强生成）** 让AI能够访问外部知识，解决知识截止问题。

## 🎯 学习目标

- 理解RAG的定义和作用
- 掌握RAG的核心流程
- 了解RAG的应用场景

---

## 🔑 知识要点

### 1. RAG定义

RAG通过检索外部文档，将相关信息注入到LLM的上下文中，从而生成更准确的回答。

### 2. 核心流程

\`\`\`mermaid
graph LR
    A[用户提问] --> B[检索相关文档]
    B --> C[拼接上下文]
    C --> D[LLM生成]
    D --> E[返回答案]

    style A fill:#E3F2FD
    style E fill:#90EE90
\`\`\`

### 3. 应用场景

| 场景 | 说明 | 示例 |
|------|------|------|
| 知识问答 | 基于文档回答 | 企业客服 |
| 文档分析 | 分析长文档 | 合同审查 |
| 研究助手 | 辅助研究 | 论文分析 |

---

## 💡 实战练习

1. 理解RAG的工作原理
2. 思考RAG的应用场景

---

## 📝 本节小结

- RAG = 检索 + 生成
- 解决LLM知识截止问题
- 适用于知识密集型任务

---

*继续学习下一节 →*`;
  }

  // Default - generate unique content for any other duplicates
  return `# ${title}

## 📌 核心概念

> **${title}** 是${courseTitle}中的核心技术点。

## 🎯 学习目标

- 深入理解${title}的原理
- 掌握${title}的实现方法
- 能够在项目中应用${title}

---

## 🔑 知识要点

### 1. 核心概念

${title}在${courseTitle}中扮演着重要角色。理解其工作原理是掌握这项技术的基础。

### 2. 技术架构

\`\`\`mermaid
graph TB
    A[${title}] --> B[核心组件1]
    A --> C[核心组件2]
    A --> D[核心组件3]

    B --> E[实现细节]
    C --> E
    D --> E

    E --> F[最终输出]

    style A fill:#E3F2FD
    style F fill:#90EE90
\`\`\`

### 3. 关键技术点

| 技术点 | 说明 | 重要程度 |
|--------|------|----------|
| 原理理解 | 核心概念 | ⭐⭐⭐⭐⭐ |
| 代码实现 | 实践能力 | ⭐⭐⭐⭐ |
| 性能优化 | 优化能力 | ⭐⭐⭐ |
| 问题排查 | 调试能力 | ⭐⭐⭐⭐ |

---

## 💻 代码示例

\`\`\`python
# ${title} 实现示例
class Implementation:
    def __init__(self, config):
        self.config = config

    def process(self, data):
        """处理数据"""
        # 预处理
        processed = self.preprocess(data)

        # 核心处理
        result = self.core_process(processed)

        # 后处理
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

1. 实现${title}的基础功能
2. 测试不同参数的效果
3. 优化处理性能

---

## 📝 本节小结

- ${title}是重要技术点
- 需要理解原理才能用好
- 实践是掌握的关键

---

*继续学习下一节 →*`;
}

async function main() {
  console.log('=== 修复相似内容 ===\n');

  // Define the similar groups and their lessons
  const similarGroups = [
    {
      name: '聊天机器人类',
      lessons: ['聊天机器人实战', '构建第一个聊天机器人', '项目：客服聊天机器人']
    },
    {
      name: '提示词类',
      lessons: ['什么是Prompt Engineering', 'LLM如何理解提示词', '基础提示词模板', 'Meta-Prompting技术']
    },
    {
      name: 'Agent类',
      lessons: ['什么是AI Agent', 'Agent的组成要素', '构建你的第一个Agent']
    },
    {
      name: 'RAG类',
      lessons: ['什么是RAG：检索增强生成概述']
    }
  ];

  let totalFixed = 0;

  for (const group of similarGroups) {
    console.log('\\n=== 修复: ' + group.name + ' ===');

    for (const title of group.lessons) {
      const lessons = await prisma.lesson.findMany({
        where: { title },
        include: {
          module: {
            include: {
              course: { select: { title: true } }
            }
          }
        }
      });

      for (const lesson of lessons) {
        try {
          const content = generateUniqueContent(lesson.title, lesson.module.course.title);
          await prisma.lesson.update({
            where: { id: lesson.id },
            data: { content }
          });
          console.log('✅ [' + lesson.module.course.title + '] ' + lesson.title);
          totalFixed++;
        } catch (error) {
          console.error('❌ ' + lesson.title + ': ' + error.message);
        }
      }
    }
  }

  console.log('\\n=== 完成 ===');
  console.log('修复课时数: ' + totalFixed);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
