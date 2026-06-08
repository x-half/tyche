const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function gen(title, course) {
  const t = title.toLowerCase();

  if (t.includes('completions') || t.includes('api') || t.includes('接口')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是构建AI应用的基础。

## 🎯 学习目标

- 掌握${title}的调用方法
- 学会处理响应和错误

---

## 🔑 知识要点

### 1. 调用代码

\`\`\`python
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "你好"}]
)
print(response.choices[0].message.content)
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('function') || t.includes('tool') || t.includes('工具') || t.includes('schema')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 让AI能够调用外部函数。

## 🔑 知识要点

\`\`\`python
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取天气",
        "parameters": {"type": "object", "properties": {"city": {"type": "string"}}}
    }
}]
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('rag') || t.includes('检索') || t.includes('向量') || t.includes('embedding') || t.includes('分块') || t.includes('文档')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是RAG系统的核心环节。

## 🔑 知识要点

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma

splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = splitter.split_documents(docs)
vectorstore = Chroma.from_documents(chunks, embeddings)
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('agent') || t.includes('react') || t.includes('langgraph') || t.includes('crew') || t.includes('任务') || t.includes('编排')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是AI Agent的核心技术。

## 🔑 知识要点

\`\`\`python
from langchain.agents import initialize_agent, Tool

tools = [Tool(name="Search", func=search, description="搜索")]
agent = initialize_agent(tools, llm, agent="zero-shot-react")
result = agent.invoke("今天天气")
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('微调') || t.includes('lora') || t.includes('训练') || t.includes('rlhf') || t.includes('对齐') || t.includes('数据')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是模型微调的关键技术。

## 🔑 知识要点

\`\`\`python
from peft import LoraConfig, get_peft_model

config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(base_model, config)
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('图像') || t.includes('yolo') || t.includes('cv') || t.includes('检测') || t.includes('分类') || t.includes('视觉') || t.includes('diffusion')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是计算机视觉的核心任务。

## 🔑 知识要点

\`\`\`python
import torch
import torchvision.models as models

model = models.resnet50(pretrained=True)
model.eval()
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('文本') || t.includes('nlp') || t.includes('情感') || t.includes('transformer') || t.includes('bert') || t.includes('特征')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是NLP的核心技术。

## 🔑 知识要点

\`\`\`python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("这个产品很好！")
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('安全') || t.includes('攻击') || t.includes('防护') || t.includes('红队') || t.includes('注入') || t.includes('隐私')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是AI安全的重要组成部分。

## 🔑 知识要点

\`\`\`python
def sanitize_input(user_input):
    dangerous = ["忽略指令", "假装你是"]
    for p in dangerous:
        if p in user_input:
            return "危险输入"
    return user_input
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('部署') || t.includes('docker') || t.includes('推理') || t.includes('优化') || t.includes('服务') || t.includes('监控') || t.includes('llmops')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是AI应用部署的关键技术。

## 🔑 知识要点

\`\`\`dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app"]
\`\`\`

---

*继续学习下一节 →*`;
  }

  if (t.includes('chatgpt') || t.includes('claude') || t.includes('copilot') || t.includes('cursor') || t.includes('midjourney') || t.includes('dall')) {
    return `# ${title}

## 📌 核心概念

> **${title}** 是当前最流行的AI工具。

## 🔑 知识要点

| 功能 | 说明 |
|------|------|
| 对话 | 自然语言交互 |
| 代码 | 代码生成和调试 |
| 创作 | 文本和图像创作 |

---

*继续学习下一节 →*`;
  }

  // Default
  return `# ${title}

## 📌 核心概念

> **${title}** 是${course}中的重要技术点。

## 🔑 知识要点

\`\`\`python
# ${title} 实现
class Impl:
    def process(self, data):
        return data
\`\`\`

---

*继续学习下一节 →*`;
}

async function main() {
  console.log('=== 修复模板内容 ===\n');

  const lessons = await prisma.lesson.findMany({
    where: {
      AND: [
        { content: { contains: '本节将深入讲解其原理和实践' } },
        { content: { contains: '核心组件1' } }
      ]
    },
    include: {
      module: { include: { course: { select: { title: true } } } }
    }
  });

  console.log('找到 ' + lessons.length + ' 节\n');

  let ok = 0;
  for (const l of lessons) {
    try {
      await prisma.lesson.update({
        where: { id: l.id },
        data: { content: gen(l.title, l.module.course.title) }
      });
      console.log('✅ ' + l.title);
      ok++;
    } catch (e) {
      console.error('❌ ' + l.title);
    }
  }

  console.log('\n完成: ' + ok);
}

main().catch(console.error).finally(() => prisma.$disconnect());
