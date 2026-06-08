// Fix duplicate lesson content by generating unique content for each
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Generate quiz content based on course context
function generateQuizContent(courseTitle) {
  const quizMap = {
    'LLM应用开发入门': `# 概念测验

## 📌 测验说明

> 通过以下题目检验你对LLM应用开发基础知识的掌握程度。

---

## 📝 选择题

### 1. 什么是LLM？

A. 低延迟机器学习 (Low Latency Machine Learning)
B. 大语言模型 (Large Language Model)
C. 本地语言模型 (Local Language Model)
D. 轻量级语言模型 (Lightweight Language Model)

**答案：B**

> 大语言模型（Large Language Model）是基于Transformer架构，在海量文本数据上训练的AI模型。

---

### 2. OpenAI API中，哪个参数控制输出的随机性？

A. \`max_tokens\`
B. \`top_p\`
C. \`temperature\`
D. \`frequency_penalty\`

**答案：C**

> temperature参数控制输出的随机性，值越高输出越随机，值越低输出越确定。

---

### 3. 流式输出使用的是什么协议？

A. WebSocket
B. HTTP长轮询
C. Server-Sent Events (SSE)
D. gRPC

**答案：C**

> 流式输出通常使用SSE协议，服务器可以持续向客户端推送数据。

---

### 4. 以下哪个不是常见的LLM错误码？

A. 429 (Rate Limit)
B. 500 (Server Error)
C. 418 (I'm a teapot)
D. 503 (Service Unavailable)

**答案：C**

> 418不是常见的LLM API错误码。常见的是429(限流)、500(服务错误)、503(服务不可用)。

---

### 5. API调用时，推荐的重试策略是？

A. 立即重试
B. 固定延迟重试
C. 指数退避重试
D. 不重试

**答案：C**

> 指数退避重试可以避免在限流时继续加重服务器负担。

---

## 📊 评分标准

| 分数 | 评价 |
|------|------|
| 5/5 | 优秀！已掌握LLM基础 |
| 3-4/5 | 良好，建议复习错题 |
| 0-2/5 | 需要重新学习相关内容 |

---

*完成测验后，继续学习下一节 →*`,

    'AI Agent 基础概念': `# 概念测验

## 📌 测验说明

> 通过以下题目检验你对AI Agent核心概念的掌握程度。

---

## 📝 选择题

### 1. AI Agent的核心组件不包括以下哪个？

A. 大脑（LLM）
B. 工具（Tools）
C. 记忆（Memory）
D. 数据库（Database）

**答案：D**

> AI Agent的核心组件包括大脑(LLM)、工具(Tools)、记忆(Memory)和规划(Planning)，不包括数据库。

---

### 2. ReAct框架中的三个步骤是？

A. Read, Act, Compute
B. Reason, Act, Observe
C. Research, Analyze, Conclude
D. Request, Accept, Complete

**答案：B**

> ReAct = Reasoning(思考) + Acting(行动) + Observing(观察)

---

### 3. Agent的短期记忆通常存储在哪里？

A. 数据库
B. 向量数据库
C. 对话上下文
D. 文件系统

**答案：C**

> 短期记忆通常存储在对话上下文中，保持当前对话的连贯性。

---

### 4. 以下哪个不是Agent常用的工具类型？

A. 搜索引擎
B. 代码执行器
C. API调用
D. 图形渲染器

**答案：D**

> Agent常用工具包括搜索引擎、代码执行器、API调用等，图形渲染器不是常用工具。

---

### 5. Function Calling的作用是？

A. 定义函数
B. 让LLM调用外部函数
C. 优化函数性能
D. 调试函数

**答案：B**

> Function Calling让LLM能够调用外部定义的函数，扩展其能力范围。

---

## 📊 评分标准

| 分数 | 评价 |
|------|------|
| 5/5 | 优秀！已掌握Agent基础 |
| 3-4/5 | 良好，建议复习错题 |
| 0-2/5 | 需要重新学习相关内容 |

---

*完成测验后，继续学习下一节 →*`,

    '模型微调入门指南': `# 概念测验

## 📌 测验说明

> 通过以下题目检验你对模型微调基础知识的掌握程度。

---

## 📝 选择题

### 1. 以下哪种微调方法参数效率最高？

A. 全量微调
B. LoRA
C. QLoRA
D. Prefix Tuning

**答案：C**

> QLoRA在LoRA基础上增加了量化，进一步降低了显存需求，参数效率最高。

---

### 2. LoRA的全称是？

A. Low-Rank Adaptation
B. Large-Rank Adaptation
C. Low-Rate Adjustment
D. Large-Rate Adjustment

**答案：A**

> LoRA = Low-Rank Adaptation，通过低秩分解来减少可训练参数。

---

### 3. 微调时，以下哪个因素最重要？

A. 数据数量
B. 数据质量
C. 模型大小
D. 训练轮次

**答案：B**

> 数据质量比数量更重要，高质量的数据可以显著提升微调效果。

---

### 4. 以下哪个不是微调的常见问题？

A. 过拟合
B. 灾难性遗忘
C. 模型崩溃
D. 梯度消失

**答案：C**

> 过拟合、灾难性遗忘、梯度消失都是微调的常见问题，模型崩溃不是。

---

### 5. LoRA中，r参数的作用是？

A. 学习率
B. 低秩维度
C. 批次大小
D. 训练轮次

**答案：B**

> r是低秩维度，控制LoRA矩阵的大小，r越小参数越少。

---

## 📊 评分标准

| 分数 | 评价 |
|------|------|
| 5/5 | 优秀！已掌握微调基础 |
| 3-4/5 | 良好，建议复习错题 |
| 0-2/5 | 需要重新学习相关内容 |

---

*完成测验后，继续学习下一节 →*`,

    '人工智能基础概念': `# 概念测验

## 📌 测验说明

> 通过以下题目检验你对人工智能基础概念的掌握程度。

---

## 📝 选择题

### 1. 人工智能的英文缩写是？

A. ML
B. DL
C. AI
D. NLP

**答案：C**

> AI = Artificial Intelligence（人工智能）

---

### 2. 以下哪个不是机器学习的类型？

A. 监督学习
B. 无监督学习
C. 强化学习
D. 规则学习

**答案：D**

> 机器学习主要包括监督学习、无监督学习和强化学习三种类型。

---

### 3. 深度学习使用的是什么模型？

A. 决策树
B. 神经网络
C. 贝叶斯网络
D. 支持向量机

**答案：B**

> 深度学习使用多层神经网络来学习数据的特征表示。

---

### 4. 以下哪个是大语言模型？

A. ResNet
B. YOLO
C. GPT
D. SVM

**答案：C**

> GPT (Generative Pre-trained Transformer) 是大语言模型，其他都不是。

---

### 5. AI的发展经历了几次浪潮？

A. 1次
B. 2次
C. 3次
D. 4次

**答案：C**

> AI的发展经历了三次浪潮：1956-1974、1980-2000、2010至今。

---

## 📊 评分标准

| 分数 | 评价 |
|------|------|
| 5/5 | 优秀！已掌握AI基础 |
| 3-4/5 | 良好，建议复习错题 |
| 0-2/5 | 需要重新学习相关内容 |

---

*完成测验后，继续学习下一节 →*`
  };

  return quizMap[courseTitle] || quizMap['人工智能基础概念'];
}

// Generate error handling content for chatbot vs langgraph
function generateErrorHandlingContent(courseTitle) {
  if (courseTitle.includes('聊天机器人')) {
    return `# 错误处理与恢复

## 📌 核心概念

> **错误处理** 是聊天机器人稳定运行的关键，确保用户获得良好的体验。

## 🎯 学习目标

- 掌握聊天机器人常见错误类型
- 实现优雅的错误恢复机制
- 提升用户满意度

---

## 🔑 知识要点

### 1. 聊天机器人错误类型

\`\`\`mermaid
graph TD
    A[聊天机器人错误] --> B[输入错误]
    A --> C[处理错误]
    A --> D[输出错误]
    A --> E[外部依赖错误]

    B --> B1[空输入]
    B --> B2[超长输入]
    B --> B3[特殊字符]

    C --> C1[LLM超时]
    C --> C2[上下文溢出]
    C --> C3[意图识别失败]

    D --> D1[格式错误]
    D --> D2[内容违规]

    E --> E1[API不可用]
    E --> E2[数据库连接失败]

    style A fill:#FFE4B5
    style B fill:#E3F2FD
    style C fill:#E3F2FD
    style D fill:#E3F2FD
    style E fill:#E3F2FD
\`\`\`

### 2. 错误处理策略

| 错误类型 | 处理策略 | 用户提示 |
|----------|----------|----------|
| 空输入 | 提示重新输入 | "请输入您的问题" |
| LLM超时 | 重试+降级 | "处理中，请稍候..." |
| 上下文溢出 | 清理历史 | "对话已重置" |
| API不可用 | 切换备用 | "服务暂时不可用" |

### 3. 代码实现

\`\`\`python
class ChatbotErrorHandler:
    def __init__(self, bot):
        self.bot = bot
        self.max_retries = 3
        self.fallback_responses = {
            "timeout": "抱歉，处理超时了，请重新提问。",
            "error": "抱歉，遇到了一些问题，请稍后再试。",
            "overflow": "对话太长了，已为您重置对话。"
        }

    async def handle_message(self, user_id: str, message: str) -> str:
        """处理用户消息，带错误处理"""
        try:
            # 验证输入
            if not message or len(message.strip()) == 0:
                return "请输入您的问题"

            if len(message) > 2000:
                return "消息太长了，请简短一些"

            # 调用聊天机器人
            response = await self.bot.chat(user_id, message)
            return response

        except TimeoutError:
            # 超时处理
            for attempt in range(self.max_retries):
                try:
                    response = await self.bot.chat(user_id, message)
                    return response
                except TimeoutError:
                    continue
            return self.fallback_responses["timeout"]

        except ContextOverflowError:
            # 上下文溢出
            self.bot.clear_history(user_id)
            return self.fallback_responses["overflow"]

        except Exception as e:
            logger.error(f"Chat error: {e}")
            return self.fallback_responses["error"]
\`\`\`

---

## 💡 实战练习

1. 实现一个带错误处理的聊天机器人
2. 添加多种降级响应
3. 测试各种异常场景

---

## 📝 本节小结

- 输入验证是第一道防线
- 超时需要重试机制
- 上下文溢出需要清理历史
- 所有异常都要有友好的用户提示

---

*继续学习下一节 →*`;
  }

  // LangGraph error handling
  return `# 错误处理与恢复

## 📌 核心概念

> **错误处理** 是LangGraph工作流稳定运行的关键，确保任务能够优雅地处理异常。

## 🎯 学习目标

- 掌握LangGraph中的错误处理机制
- 实现工作流的恢复策略
- 构建健壮的Agent系统

---

## 🔑 知识要点

### 1. LangGraph错误处理架构

\`\`\`mermaid
graph TD
    A[工作流节点] --> B{执行结果}
    B -->|成功| C[下一节点]
    B -->|错误| D[错误处理]

    D --> E{错误类型}
    E -->|可恢复| F[重试策略]
    E -->|不可恢复| G[降级策略]
    E -->|严重错误| H[终止流程]

    F --> I[重新执行]
    G --> J[备用路径]
    H --> K[错误报告]

    I --> A
    J --> C

    style A fill:#E3F2FD
    style B fill:#FFE4B5
    style D fill:#FFB6C1
    style F fill:#90EE90
    style G fill:#87CEEB
    style H fill:#FFB6C1
\`\`\`

### 2. 错误处理策略

| 策略 | 适用场景 | 实现方式 |
|------|----------|----------|
| 重试 | 网络错误、超时 | 指数退避 |
| 降级 | 服务不可用 | 备用节点 |
| 跳过 | 非关键节点 | 继续执行 |
| 终止 | 严重错误 | 抛出异常 |

### 3. 代码实现

\`\`\`python
from langgraph.graph import Graph
from typing import TypedDict

class WorkflowState(TypedDict):
    input: str
    result: str
    error: str
    retry_count: int

def create_resilient_workflow():
    workflow = Graph()

    def node_with_retry(state: WorkflowState) -> WorkflowState:
        """带重试的节点"""
        max_retries = 3

        for attempt in range(max_retries):
            try:
                # 执行节点逻辑
                result = process_node(state["input"])
                return {"result": result, "error": None}

            except RetryableError as e:
                if attempt < max_retries - 1:
                    time.sleep(2 ** attempt)  # 指数退避
                    continue
                return {"result": None, "error": str(e)}

            except CriticalError as e:
                # 严重错误，直接终止
                raise

    def fallback_node(state: WorkflowState) -> WorkflowState:
        """降级节点"""
        return {"result": "使用备用方案处理", "error": None}

    # 添加节点
    workflow.add_node("main", node_with_retry)
    workflow.add_node("fallback", fallback_node)

    # 添加条件边
    workflow.add_conditional_edges(
        "main",
        lambda state: "fallback" if state.get("error") else "end",
        {"fallback": "fallback", "end": END}
    )

    return workflow.compile()
\`\`\`

---

## 📊 错误类型对比

| 错误类型 | 是否重试 | 处理方式 |
|----------|----------|----------|
| 网络超时 | 是 | 指数退避重试 |
| API限流 | 是 | 等待后重试 |
| 参数错误 | 否 | 修正参数 |
| 服务不可用 | 是 | 切换备用 |
| 权限错误 | 否 | 检查配置 |

---

## 💡 实战练习

1. 实现一个带错误处理的LangGraph工作流
2. 添加重试和降级机制
3. 测试各种异常场景

---

## 📝 本节小结

- 区分可恢复和不可恢复错误
- 使用指数退避重试策略
- 关键节点需要降级方案
- 记录错误日志便于排查

---

*继续学习下一节 →*`;
}

// Generate transfer learning content for CV vs NLP
function generateTransferLearningContent(courseTitle) {
  if (courseTitle.includes('计算机视觉')) {
    return `# 迁移学习实战

## 📌 核心概念

> **迁移学习** 让我们可以在小数据集上训练出高质量的CV模型。

## 🎯 学习目标

- 理解迁移学习在CV中的应用
- 掌握预训练模型的使用方法
- 完成一个图像分类迁移学习项目

---

## 🔑 知识要点

### 1. CV迁移学习流程

\`\`\`mermaid
graph LR
    A[预训练模型<br/>ImageNet] --> B[移除顶层]
    B --> C[冻结底层]
    C --> D[添加新层]
    D --> E[微调训练]
    E --> F[领域模型]

    style A fill:#E3F2FD
    style F fill:#90EE90
\`\`\`

### 2. 常用预训练模型

| 模型 | 参数量 | Top-1准确率 | 适用场景 |
|------|--------|-------------|----------|
| ResNet50 | 25M | 76% | 通用分类 |
| VGG16 | 138M | 72% | 特征提取 |
| EfficientNet | 5M | 77% | 移动端 |
| ViT | 86M | 78% | 大规模数据 |

### 3. 代码实现

\`\`\`python
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from torch import nn

# 1. 加载预训练模型
model = models.resnet50(pretrained=True)

# 2. 冻结底层参数
for param in model.parameters():
    param.requires_grad = False

# 3. 修改最后一层
num_classes = 10  # 你的类别数
model.fc = nn.Linear(model.fc.in_features, num_classes)

# 4. 只训练最后一层
optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)

# 5. 训练
for epoch in range(10):
    for images, labels in train_loader:
        outputs = model(images)
        loss = nn.CrossEntropyLoss()(outputs, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    print(f"Epoch {epoch}: loss={loss.item():.4f}")
\`\`\`

---

## 📊 微调策略对比

| 策略 | 适用场景 | 训练参数 | 效果 |
|------|----------|----------|------|
| 特征提取 | 小数据集 | 最少 | 一般 |
| 微调顶层 | 中等数据 | 较少 | 良好 |
| 全部微调 | 大数据集 | 最多 | 最好 |

---

## 💡 实战练习

1. 使用ResNet50进行图像分类
2. 对比不同微调策略的效果
3. 可视化特征图

---

## 📝 本节小结

- 迁移学习可以利用预训练模型
- 小数据集建议冻结底层
- 学习率要比从头训练小
- 数据增强可以提升效果

---

*继续学习下一节 →*`;
  }

  // NLP transfer learning
  return `# 迁移学习实战

## 📌 核心概念

> **迁移学习** 让NLP模型能够在小数据集上取得优异表现。

## 🎯 学习目标

- 理解迁移学习在NLP中的应用
- 掌握BERT等预训练模型的使用
- 完成一个文本分类迁移学习项目

---

## 🔑 知识要点

### 1. NLP迁移学习流程

\`\`\`mermaid
graph LR
    A[预训练模型<br/>BERT] --> B[添加分类层]
    B --> C[微调训练]
    C --> D[领域模型]

    A -->|海量文本| E[通用语言理解]
    D -->|少量标注| F[特定任务]

    style A fill:#E3F2FD
    style D fill:#90EE90
\`\`\`

### 2. 常用预训练模型

| 模型 | 参数量 | 适用任务 | 特点 |
|------|--------|----------|------|
| BERT | 110M | 分类、NER | 双向理解 |
| GPT | 117M | 生成 | 自回归 |
| RoBERTa | 125M | 分类 | 优化训练 |
| ALBERT | 12M | 分类 | 参数共享 |

### 3. 代码实现

\`\`\`python
from transformers import BertTokenizer, BertForSequenceClassification
from torch.optim import AdamW

# 1. 加载预训练模型
tokenizer = BertTokenizer.from_pretrained('bert-base-chinese')
model = BertForSequenceClassification.from_pretrained(
    'bert-base-chinese',
    num_labels=3  # 分类数
)

# 2. 数据处理
def encode(texts, labels):
    encodings = tokenizer(
        texts,
        truncation=True,
        padding=True,
        max_length=128,
        return_tensors='pt'
    )
    return encodings, labels

# 3. 训练
optimizer = AdamW(model.parameters(), lr=2e-5)

for epoch in range(3):
    for batch in train_loader:
        inputs, labels = encode(batch['text'], batch['label'])

        outputs = model(**inputs, labels=labels)
        loss = outputs.loss

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

    print(f"Epoch {epoch}: loss={loss.item():.4f}")
\`\`\`

---

## 📊 NLP迁移学习对比

| 方法 | 数据需求 | 训练时间 | 效果 |
|------|----------|----------|------|
| 从头训练 | 大量 | 很长 | 一般 |
| 特征提取 | 少量 | 短 | 良好 |
| 微调 | 中等 | 中等 | 最好 |

---

## 💡 实战练习

1. 使用BERT进行中文文本分类
2. 对比不同预训练模型的效果
3. 分析注意力权重

---

## 📝 本节小结

- NLP迁移学习基于预训练模型
- BERT适合理解任务，GPT适合生成任务
- 微调时学习率要小
- 中文任务建议使用中文预训练模型

---

*继续学习下一节 →*`;
}

async function main() {
  console.log('=== 修复重复内容 ===\n');

  // 1. Fix 概念测验 duplicates
  const quizLessons = await prisma.lesson.findMany({
    where: { title: '概念测验' },
    include: {
      module: {
        include: {
          course: { select: { title: true } }
        }
      }
    }
  });

  console.log('修复概念测验 (' + quizLessons.length + '节)...');
  for (const lesson of quizLessons) {
    const content = generateQuizContent(lesson.module.course.title);
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { content }
    });
    console.log('  ✅ ' + lesson.module.course.title);
  }

  // 2. Fix 错误处理与恢复 duplicates
  const errorLessons = await prisma.lesson.findMany({
    where: { title: '错误处理与恢复' },
    include: {
      module: {
        include: {
          course: { select: { title: true } }
        }
      }
    }
  });

  console.log('\n修复错误处理与恢复 (' + errorLessons.length + '节)...');
  for (const lesson of errorLessons) {
    const content = generateErrorHandlingContent(lesson.module.course.title);
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { content }
    });
    console.log('  ✅ ' + lesson.module.course.title);
  }

  // 3. Fix 迁移学习实战 duplicates
  const transferLessons = await prisma.lesson.findMany({
    where: { title: '迁移学习实战' },
    include: {
      module: {
        include: {
          course: { select: { title: true } }
        }
      }
    }
  });

  console.log('\n修复迁移学习实战 (' + transferLessons.length + '节)...');
  for (const lesson of transferLessons) {
    const content = generateTransferLearningContent(lesson.module.course.title);
    await prisma.lesson.update({
      where: { id: lesson.id },
      data: { content }
    });
    console.log('  ✅ ' + lesson.module.course.title);
  }

  console.log('\n=== 完成 ===');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
