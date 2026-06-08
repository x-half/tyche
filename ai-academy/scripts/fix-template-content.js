// Fix template content by generating specific content based on title analysis
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Analyze title and generate specific content
function generateSpecificContent(title, courseTitle) {
  const t = title.toLowerCase();

  // ============ API相关 ============
  if (t.includes('chat completions') || t.includes('api')) {
    return generateAPIContent(title, courseTitle);
  }
  if (t.includes('function calling') || t.includes('tool use')) {
    return generateFunctionCallingContent(title, courseTitle);
  }
  if (t.includes('vision') || t.includes('多模态')) {
    return generateVisionContent(title, courseTitle);
  }

  // ============ Prompt相关 ============
  if (t.includes('prompt') || t.includes('提示词') || t.includes('few-shot') || t.includes('chain')) {
    return generatePromptContent(title, courseTitle);
  }

  // ============ RAG相关 ============
  if (t.includes('rag') || t.includes('检索') || t.includes('向量') || t.includes('embedding')) {
    return generateRAGContent(title, courseTitle);
  }

  // ============ Agent相关 ============
  if (t.includes('agent') || t.includes('react') || t.includes('langgraph') || t.includes('crew')) {
    return generateAgentContent(title, courseTitle);
  }

  // ============ 微调相关 ============
  if (t.includes('微调') || t.includes('lora') || t.includes('训练') || t.includes('rlhf')) {
    return generateFinetuneContent(title, courseTitle);
  }

  // ============ CV相关 ============
  if (t.includes('图像') || t.includes('yolo') || t.includes('cv') || t.includes('检测') || t.includes('分类')) {
    return generateCVContent(title, courseTitle);
  }

  // ============ NLP相关 ============
  if (t.includes('文本') || t.includes('nlp') || t.includes('情感') || t.includes('transformer') || t.includes('bert')) {
    return generateNLPContent(title, courseTitle);
  }

  // ============ 安全相关 ============
  if (t.includes('安全') || t.includes('攻击') || t.includes('防护') || t.includes('红队')) {
    return generateSecurityContent(title, courseTitle);
  }

  // ============ 部署相关 ============
  if (t.includes('部署') || t.includes('docker') || t.includes('推理') || t.includes('优化')) {
    return generateDeploymentContent(title, courseTitle);
  }

  // ============ 工具相关 ============
  if (t.includes('chatgpt') || t.includes('claude') || t.includes('copilot') || t.includes('cursor')) {
    return generateToolContent(title, courseTitle);
  }

  // Default
  return generateDefaultContent(title, courseTitle);
}

// ============ Content Generators ============

function generateAPIContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是构建AI应用的基础，掌握API调用是开发AI应用的第一步。

## 🎯 学习目标

- 理解${title}的工作原理
- 掌握API调用的代码实现
- 学会处理API响应和错误

---

## 🔑 知识要点

### 1. API调用流程

\`\`\`mermaid
sequenceDiagram
    participant C as 客户端
    participant S as API服务器
    participant M as 模型

    C->>S: 发送请求
    S->>M: 处理请求
    M-->>S: 返回结果
    S-->>C: 响应数据
\`\`\`

### 2. 核心代码

\`\`\`python
from openai import OpenAI

client = OpenAI()

# 基础调用
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个助手"},
        {"role": "user", "content": "你好"}
    ],
    temperature=0.7,
    max_tokens=1000
)

print(response.choices[0].message.content)
\`\`\`

### 3. 参数说明

| 参数 | 说明 | 建议值 |
|------|------|--------|
| model | 模型名称 | gpt-4 |
| messages | 消息列表 | 包含role和content |
| temperature | 创造性 | 0-2，默认0.7 |
| max_tokens | 最大输出 | 根据需求设置 |

---

## 💡 实战练习

1. 调用API完成一个简单对话
2. 测试不同参数的效果
3. 实现错误处理

---

## 📝 本节小结

- API调用是AI应用的基础
- 参数配置影响输出质量
- 错误处理保证稳定性

---

*继续学习下一节 →*`;
}

function generateFunctionCallingContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 让AI能够调用外部函数，扩展其能力范围。

## 🎯 学习目标

- 理解Function Calling的工作原理
- 掌握函数定义和调用方法
- 实现一个带工具调用的Agent

---

## 🔑 知识要点

### 1. 工作流程

\`\`\`mermaid
sequenceDiagram
    participant U as 用户
    participant L as LLM
    participant F as 函数

    U->>L: 发送请求
    L->>L: 识别需要调用函数
    L->>F: 调用函数
    F-->>L: 返回结果
    L-->>U: 格式化回复
\`\`\`

### 2. 函数定义

\`\`\`python
import openai

tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "获取指定城市的天气",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "城市名称"
                }
            },
            "required": ["city"]
        }
    }
}]
\`\`\`

### 3. 调用实现

\`\`\`python
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "北京天气"}],
    tools=tools,
    tool_choice="auto"
)

# 解析调用
if response.choices[0].message.tool_calls:
    tool_call = response.choices[0].message.tool_calls[0]
    print(f"调用: {tool_call.function.name}")
    print(f"参数: {tool_call.function.arguments}")
\`\`\`

---

## 💡 实战练习

1. 定义一个自定义函数
2. 实现Function Calling调用
3. 处理函数返回结果

---

## 📝 本节小结

- Function Calling扩展LLM能力
- 函数需要正确定义参数
- 结果需要格式化返回

---

*继续学习下一节 →*`;
}

function generateVisionContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 让AI能够理解和处理图像，实现多模态交互。

## 🎯 学习目标

- 理解多模态AI的工作原理
- 掌握图像处理的API调用
- 实现图像分析应用

---

## 🔑 知识要点

### 1. 多模态架构

\`\`\`mermaid
graph LR
    A[图像输入] --> B[视觉编码器]
    B --> C[特征融合]
    D[文本输入] --> E[文本编码器]
    E --> C
    C --> F[LLM处理]
    F --> G[输出]
\`\`\`

### 2. GPT-4 Vision调用

\`\`\`python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "描述这张图片"},
            {
                "type": "image_url",
                "image_url": {"url": "https://example.com/image.jpg"}
            }
        ]
    }]
)

print(response.choices[0].message.content)
\`\`\`

### 3. 应用场景

| 场景 | 说明 | 示例 |
|------|------|------|
| 图像描述 | 生成图片说明 | 电商商品描述 |
| 文档分析 | 提取图片信息 | 发票识别 |
| 图表解读 | 分析数据图表 | 报表分析 |

---

## 💡 实战练习

1. 调用Vision API分析图片
2. 实现文档OCR功能
3. 构建图像问答系统

---

## 📝 本节小结

- 多模态让AI理解图像
- Vision API支持图文混合
- 应用场景广泛

---

*继续学习下一节 →*`;
}

function generatePromptContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是与AI沟通的关键技巧，好的提示词能获得更好的输出。

## 🎯 学习目标

- 掌握${title}的核心原理
- 学会设计高质量提示词
- 能够优化提示词效果

---

## 🔑 知识要点

### 1. 提示词结构

\`\`\`mermaid
graph TB
    A[提示词] --> B[角色设定]
    A --> C[任务描述]
    A --> D[输入数据]
    A --> E[输出格式]
    A --> F[约束条件]
\`\`\`

### 2. 技巧对比

| 技巧 | 说明 | 适用场景 |
|------|------|----------|
| Zero-Shot | 直接提问 | 简单任务 |
| Few-Shot | 给出示例 | 格式要求 |
| Chain-of-Thought | 逐步推理 | 复杂推理 |

### 3. 代码示例

\`\`\`python
# Few-Shot提示
prompt = """
示例1: 输入"苹果" → 输出"水果"
示例2: 输入"狗" → 输出"动物"
示例3: 输入"汽车" → 输出"交通工具"

现在: 输入"飞机" → 输出?
"""
\`\`\`

---

## 💡 实战练习

1. 设计一个角色提示词
2. 使用Few-Shot完成任务
3. 测试不同技巧的效果

---

## 📝 本节小结

- 提示词设计是核心技能
- 不同场景使用不同技巧
- 迭代优化才能获得最佳效果

---

*继续学习下一节 →*`;
}

function generateRAGContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是RAG系统的核心环节，让AI能够访问外部知识。

## 🎯 学习目标

- 理解${title}在RAG中的作用
- 掌握具体实现方法
- 能够优化处理效果

---

## 🔑 知识要点

### 1. RAG流程

\`\`\`mermaid
graph LR
    A[文档] --> B[加载]
    B --> C[分块]
    C --> D[向量化]
    D --> E[存储]
    E --> F[检索]
    F --> G[生成]
\`\`\`

### 2. 核心代码

\`\`\`python
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma

# 加载文档
loader = PyPDFLoader("doc.pdf")
docs = loader.load()

# 分块
splitter = RecursiveCharacterTextSplitter(chunk_size=1000)
chunks = splitter.split_documents(docs)

# 向量化
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)
\`\`\`

### 3. 关键参数

| 参数 | 说明 | 建议值 |
|------|------|--------|
| chunk_size | 分块大小 | 500-1500 |
| chunk_overlap | 重叠大小 | 50-200 |
| k | 检索数量 | 3-5 |

---

## 💡 实战练习

1. 加载并处理一个PDF文档
2. 测试不同分块策略
3. 实现相似度检索

---

## 📝 本节小结

- 文档处理是RAG的基础
- 分块策略影响检索质量
- 向量化是语义检索的关键

---

*继续学习下一节 →*`;
}

function generateAgentContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是AI Agent的核心技术，让AI能够自主思考和行动。

## 🎯 学习目标

- 理解${title}的工作原理
- 掌握具体实现方法
- 能够构建简单的Agent

---

## 🔑 知识要点

### 1. Agent架构

\`\`\`mermaid
graph TB
    A[用户任务] --> B[LLM推理]
    B --> C{需要工具?}
    C -->|是| D[调用工具]
    D --> E[获取结果]
    E --> B
    C -->|否| F[返回结果]
\`\`\`

### 2. ReAct框架

\`\`\`python
from langchain.agents import initialize_agent, Tool

tools = [
    Tool(name="Search", func=search, description="搜索"),
    Tool(name="Calc", func=calc, description="计算")
]

agent = initialize_agent(tools, llm, agent="zero-shot-react")
result = agent.invoke("今天北京天气")
\`\`\`

### 3. 核心组件

| 组件 | 作用 | 实现 |
|------|------|------|
| 大脑 | 推理决策 | LLM |
| 工具 | 执行操作 | Function |
| 记忆 | 保持上下文 | Memory |
| 规划 | 任务分解 | ReAct |

---

## 💡 实战练习

1. 创建一个简单的Agent
2. 添加自定义工具
3. 测试多步骤任务

---

## 📝 本节小结

- Agent = LLM + 工具 + 记忆
- ReAct是核心推理框架
- 工具扩展Agent能力

---

*继续学习下一节 →*`;
}

function generateFinetuneContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是让通用模型适应特定任务的关键技术。

## 🎯 学习目标

- 理解${title}的原理
- 掌握具体实现方法
- 能够完成一次微调

---

## 🔑 知识要点

### 1. 微调流程

\`\`\`mermaid
graph LR
    A[准备数据] --> B[配置LoRA]
    B --> C[训练模型]
    C --> D[评估效果]
    D --> E[部署使用]
\`\`\`

### 2. LoRA配置

\`\`\`python
from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,  # 低秩维度
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM"
)

model = get_peft_model(base_model, config)
\`\`\`

### 3. 关键参数

| 参数 | 说明 | 建议值 |
|------|------|--------|
| r | 低秩维度 | 8-64 |
| alpha | 缩放因子 | 2×r |
| dropout | 正则化 | 0.05-0.1 |

---

## 💡 实战练习

1. 准备训练数据
2. 配置LoRA参数
3. 训练并评估模型

---

## 📝 本节小结

- LoRA减少可训练参数
- 数据质量比数量重要
- 监控训练过程防止过拟合

---

*继续学习下一节 →*`;
}

function generateCVContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是计算机视觉的核心任务，让AI能够"看懂"图像。

## 🎯 学习目标

- 理解${title}的原理
- 掌握具体实现方法
- 能够完成CV项目

---

## 🔑 知识要点

### 1. CV任务流程

\`\`\`mermaid
graph LR
    A[图像输入] --> B[预处理]
    B --> C[特征提取]
    C --> D[模型推理]
    D --> E[后处理]
    E --> F[结果输出]
\`\`\`

### 2. 代码实现

\`\`\`python
import torch
import torchvision.models as models

# 加载预训练模型
model = models.resnet50(pretrained=True)
model.eval()

# 图像预处理
from torchvision import transforms
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
])

# 推理
image = Image.open("image.jpg")
input_tensor = transform(image).unsqueeze(0)
output = model(input_tensor)
\`\`\`

### 3. 常用模型

| 模型 | 任务 | 特点 |
|------|------|------|
| ResNet | 分类 | 残差连接 |
| YOLO | 检测 | 实时性好 |
| SAM | 分割 | 通用性强 |

---

## 💡 实战练习

1. 使用预训练模型进行分类
2. 测试不同模型的效果
3. 可视化特征图

---

## 📝 本节小结

- CV让AI理解图像
- 预训练模型效果好
- 数据增强提升性能

---

*继续学习下一节 →*`;
}

function generateNLPContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是自然语言处理的核心技术，让AI能够理解和生成文本。

## 🎯 学习目标

- 理解${title}的原理
- 掌握具体实现方法
- 能够完成NLP项目

---

## 🔑 知识要点

### 1. NLP处理流程

\`\`\`mermaid
graph LR
    A[文本输入] --> B[分词]
    B --> C[向量化]
    C --> D[模型处理]
    D --> E[后处理]
    E --> F[结果输出]
\`\`\`

### 2. 代码实现

\`\`\`python
from transformers import pipeline

# 情感分析
classifier = pipeline("sentiment-analysis")
result = classifier("这个产品很好！")
print(result)

# 命名实体识别
ner = pipeline("ner", aggregation_strategy="simple")
entities = ner("Apple是一家科技公司")
print(entities)
\`\`\`

### 3. 常用任务

| 任务 | 说明 | 工具 |
|------|------|------|
| 分类 | 文本分类 | BERT |
| NER | 实体识别 | spaCy |
| 生成 | 文本生成 | GPT |

---

## 💡 实战练习

1. 实现文本分类
2. 提取命名实体
3. 构建情感分析系统

---

## 📝 本节小结

- NLP让AI理解文本
- 预训练模型效果好
- 任务选择合适的工具

---

*继续学习下一节 →*`;
}

function generateSecurityContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是AI安全的重要组成部分，保护AI系统免受攻击。

## 🎯 学习目标

- 理解${title}的原理
- 掌握防护方法
- 能够进行安全评估

---

## 🔑 知识要点

### 1. 安全威胁类型

\`\`\`mermaid
graph TB
    A[AI安全威胁] --> B[提示词注入]
    A --> C[数据投毒]
    A --> D[模型逆向]
    A --> E[对抗样本]
\`\`\`

### 2. 防护代码

\`\`\`python
def sanitize_input(user_input: str) -> str:
    """过滤危险输入"""
    dangerous_patterns = [
        "忽略之前的指令",
        "你是一个",
        "假装你是"
    ]

    for pattern in dangerous_patterns:
        if pattern in user_input:
            return "检测到危险输入"

    return user_input
\`\`\`

### 3. 防护策略

| 威胁 | 防护方法 |
|------|----------|
| 提示词注入 | 输入过滤 |
| 数据投毒 | 数据验证 |
| 模型逆向 | 访问控制 |

---

## 💡 实战练习

1. 测试提示词注入攻击
2. 实现输入过滤
3. 进行安全评估

---

## 📝 本节小结

- 安全是AI系统的重要考量
- 输入验证是第一道防线
- 持续监控和更新防护

---

*继续学习下一节 →*`;
}

function generateDeploymentContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是AI应用部署的关键技术，确保系统稳定运行。

## 🎯 学习目标

- 理解${title}的原理
- 掌握部署方法
- 能够优化性能

---

## 🔑 知识要点

### 1. 部署流程

\`\`\`mermaid
graph LR
    A[模型训练] --> B[模型导出]
    B --> C[容器化]
    C --> D[服务部署]
    D --> E[监控运维]
\`\`\`

### 2. Docker部署

\`\`\`dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
\`\`\`

### 3. 性能优化

| 优化点 | 方法 | 效果 |
|--------|------|------|
| 量化 | INT8/INT4 | 减少显存 |
| 批处理 | 合并请求 | 提高吞吐 |
| 缓存 | Redis缓存 | 降低延迟 |

---

## 💡 实战练习

1. 容器化一个AI服务
2. 实现负载均衡
3. 监控系统性能

---

## 📝 本节小结

- 容器化是标准部署方式
- 性能优化提升用户体验
- 监控确保系统稳定

---

*继续学习下一节 →*`;
}

function generateToolContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是当前最流行的AI工具，掌握它能大幅提升工作效率。

## 🎯 学习目标

- 了解${title}的核心功能
- 掌握使用技巧
- 能够应用到实际工作

---

## 🔑 知识要点

### 1. 核心功能

\`\`\`mermaid
graph TB
    A[${title}] --> B[对话交流]
    A --> C[代码生成]
    A --> D[文本创作]
    A --> E[数据分析]
\`\`\`

### 2. 使用技巧

| 技巧 | 说明 | 示例 |
|------|------|------|
| 角色设定 | 设定AI角色 | "你是一个专家" |
| 分步骤 | 复杂任务分步 | "第一步..." |
| 给示例 | 提供参考 | "参考这个格式" |

### 3. 最佳实践

\`\`\`
# 提示词模板
你是一个{角色}，请帮我{任务}。

要求：
1. {要求1}
2. {要求2}

输出格式：{格式说明}
\`\`\`

---

## 💡 实战练习

1. 使用${title}完成一个任务
2. 测试不同提示词效果
3. 总结使用技巧

---

## 📝 本节小结

- ${title}功能强大
- 提示词设计是关键
- 实践才能掌握

---

*继续学习下一节 →*`;
}

function generateDefaultContent(title, courseTitle) {
  return `# ${title}

## 📌 核心概念

> **${title}** 是${courseTitle}的重要组成部分，掌握它对构建AI应用至关重要。

## 🎯 学习目标

- 理解${title}的核心原理
- 掌握${title}的实现方法
- 能够在项目中应用${title}

---

## 🔑 知识要点

### 1. 基本概念

${title}在${courseTitle}中扮演着关键角色。理解其工作原理是掌握这项技术的基础。

### 2. 核心流程

\`\`\`mermaid
graph TB
    A[输入] --> B[处理]
    B --> C[输出]

    B --> D[步骤1]
    B --> E[步骤2]
    B --> F[步骤3]
\`\`\`

### 3. 实现代码

\`\`\`python
# ${title} 实现示例
class Implementation:
    def __init__(self, config):
        self.config = config

    def process(self, data):
        """处理数据"""
        result = self.transform(data)
        return result

    def transform(self, data):
        """转换逻辑"""
        return data

# 使用
impl = Implementation({})
result = impl.process("输入数据")
\`\`\`

---

## 💡 实战练习

1. 实现${title}的基础功能
2. 测试不同参数的效果
3. 优化处理性能

---

## 📝 本节小结

- ${title}是重要技术点
- 理解原理是基础
- 实践是掌握的关键

---

*继续学习下一节 →*`;
}

async function main() {
  console.log('=== 修复模板内容 ===\n');

  // Find template content lessons
  const lessons = await prisma.lesson.findMany({
    where: {
      AND: [
        { content: { contains: '扮演着重要角色' } },
        { content: { contains: '核心组件1' } }
      ]
    },
    include: {
      module: {
        include: {
          course: { select: { title: true } }
        }
      }
    }
  });

  console.log(`找到 ${lessons.length} 节模板内容\n`);

  let success = 0;
  let failed = 0;

  for (const lesson of lessons) {
    try {
      const content = generateSpecificContent(lesson.title, lesson.module.course.title);

      await prisma.lesson.update({
        where: { id: lesson.id },
        data: { content }
      });

      console.log(`✅ [${lesson.module.course.title}] ${lesson.title}`);
      success++;
    } catch (error) {
      console.error(`❌ ${lesson.title}: ${error.message}`);
      failed++;
    }
  }

  console.log('\n=== 完成 ===');
  console.log(`成功: ${success}`);
  console.log(`失败: ${failed}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
