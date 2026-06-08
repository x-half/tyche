// Comprehensive content generator for all lessons
// Generates real educational content based on lesson topics

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Content templates organized by topic category
const contentTemplates = {
  // LLM & API related
  'api': (title) => `# ${title}

## 概述

本节将深入讲解${title}的核心概念和实践方法。掌握这些知识对于构建高质量的AI应用至关重要。

## 核心概念

### 什么是API调用

API（Application Programming Interface）是应用程序之间通信的接口。在LLM开发中，我们通过API向大模型发送请求并获取响应。

\`\`\`python
import openai

client = openai.OpenAI(api_key="your-api-key")

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个专业的AI助手"},
        {"role": "user", "content": "请解释什么是机器学习"}
    ],
    temperature=0.7,
    max_tokens=1000
)

print(response.choices[0].message.content)
\`\`\`

### 请求参数详解

| 参数 | 类型 | 说明 | 建议值 |
|------|------|------|--------|
| model | string | 模型名称 | gpt-4, gpt-3.5-turbo |
| messages | array | 消息列表 | 包含role和content |
| temperature | float | 创造性程度 | 0-2，默认0.7 |
| max_tokens | int | 最大输出长度 | 根据需求设置 |
| stream | bool | 是否流式输出 | true/false |

### 错误处理最佳实践

\`\`\`python
import time
from openai import OpenAI, APIError, RateLimitError, Timeout

client = OpenAI()

def call_api_with_retry(messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=messages,
                timeout=30
            )
            return response
        except RateLimitError:
            wait_time = 2 ** attempt
            print(f"触发限流，等待{wait_time}秒后重试...")
            time.sleep(wait_time)
        except APIError as e:
            print(f"API错误: {e}")
            if attempt == max_retries - 1:
                raise
        except Timeout:
            print("请求超时")
            if attempt == max_retries - 1:
                raise
    return None
\`\`\`

## 流式输出实现

流式输出可以提升用户体验，让用户看到逐步生成的内容：

\`\`\`python
stream = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "写一首关于AI的诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
\`\`\`

## 实践练习

1. 调用OpenAI API完成一个简单的对话
2. 实现带重试机制的API调用
3. 实现流式输出并展示在终端

## 总结

通过本节学习，你应该掌握了API调用的基本方法、参数配置和错误处理技巧。

---

*继续学习下一节*`,

  // Prompt Engineering related
  'prompt': (title) => `# ${title}

## 概述

${title}是使用大语言模型的核心技能。好的提示词可以让AI输出更准确、更有价值的内容。

## 核心原则

### 1. 明确具体

\`\`\`
❌ 不好的提示词：
"帮我写一篇文章"

✅ 好的提示词：
"请写一篇关于人工智能在医疗领域应用的文章，字数800字，包含3个具体案例，面向非技术读者"
\`\`\`

### 2. 提供上下文

\`\`\`
❌ 缺少上下文：
"这段代码有什么问题？"

✅ 提供上下文：
"我正在用Python开发一个Web应用，使用Flask框架。以下是我的用户注册函数，但出现了数据库连接错误：
[代码片段]
请帮我找出问题并提供修复建议。"
\`\`\`

### 3. 指定输出格式

\`\`\`
请按照以下格式回答：

## 概念解释
[用简单语言解释]

## 代码示例
[提供可运行的代码]

## 注意事项
[列出关键点]
\`\`\`

## 常用提示词模板

### 角色设定

\`\`\`
你是一位拥有10年经验的Python开发专家。请帮我审查以下代码，关注：
1. 代码质量
2. 性能优化
3. 安全性
4. 最佳实践
\`\`\`

### Few-Shot学习

\`\`\`
请根据以下示例，完成新的分类任务：

示例1：输入："今天天气真好" → 输出：正面
示例2：输入："这个产品质量很差" → 输出：负面
示例3：输入："今天的会议取消了" → 输出：中性

新输入："这个餐厅的服务很好" → 输出：
\`\`\`

### Chain-of-Thought

\`\`\`
请一步一步思考：

问题：一个商店打8折促销，原价200元的商品，使用50元优惠券后，实际支付多少钱？

思考过程：
1. 原价：200元
2. 打8折：200 × 0.8 = 160元
3. 使用优惠券：160 - 50 = 110元
答案：110元
\`\`\`

## 提示词优化技巧

| 技巧 | 说明 | 示例 |
|------|------|------|
| 分步骤 | 将复杂任务分解 | "第一步...第二步..." |
| 限定范围 | 限制输出长度 | "用100字以内解释" |
| 给出示例 | 参考格式 | "参考以下格式..." |
| 设置约束 | 明确要求 | "不要使用专业术语" |

## 实践练习

1. 为你的工作场景设计3个提示词模板
2. 测试不同temperature对输出的影响
3. 使用Few-Shot方法训练AI完成特定任务

## 总结

掌握提示词工程是高效使用AI的关键。通过不断实践和优化，你可以让AI成为强大的工作助手。

---

*继续学习下一节*`,

  // RAG related
  'rag': (title) => `# ${title}

## 概述

RAG（Retrieval-Augmented Generation，检索增强生成）是让大模型能够访问外部知识的关键技术。本节将深入讲解${title}。

## RAG核心原理

### 什么是RAG

RAG通过将外部知识检索与大模型生成相结合，解决了大模型知识截止日期和幻觉问题。

\`\`\`
用户问题 → 检索相关文档 → 拼接上下文 → LLM生成答案
\`\`\`

### RAG架构

\`\`\`python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# 1. 创建向量数据库
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(documents, embeddings)

# 2. 创建检索器
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# 3. 创建RAG链
llm = ChatOpenAI(model="gpt-4")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever
)

# 4. 查询
result = qa_chain.invoke("什么是机器学习？")
print(result["result"])
\`\`\`

## 文档处理流程

### 文档加载

\`\`\`python
from langchain.document_loaders import (
    PyPDFLoader,
    TextLoader,
    CSVLoader,
    UnstructuredMarkdownLoader
)

# 加载PDF
loader = PyPDFLoader("document.pdf")
pages = loader.load()

# 加载Markdown
loader = UnstructuredMarkdownLoader("readme.md")
docs = loader.load()
\`\`\`

### 文本分块

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    length_function=len,
    separators=["\\n\\n", "\\n", "。", "！", "？", ".", " "]
)

chunks = text_splitter.split_documents(pages)
print(f"分块数量: {len(chunks)}")
\`\`\`

### 分块策略对比

| 策略 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| 固定长度 | 简单高效 | 可能切断语义 | 结构化文档 |
| 递归分割 | 保持语义完整 | 计算量大 | 通用文档 |
| 语义分块 | 语义最完整 | 实现复杂 | 高质量需求 |

## 向量检索

### Embedding原理

\`\`\`python
from openai import OpenAI

client = OpenAI()

response = client.embeddings.create(
    model="text-embedding-ada-002",
    input="什么是机器学习"
)

embedding = response.data[0].embedding
print(f"向量维度: {len(embedding)}")  # 1536
\`\`\`

### 相似度计算

\`\`\`python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# 计算两个文本的相似度
sim = cosine_similarity(embedding1, embedding2)
print(f"相似度: {sim:.4f}")
\`\`\`

## 实践练习

1. 构建一个简单的RAG问答系统
2. 测试不同分块策略的效果
3. 比较不同Embedding模型的性能

## 总结

RAG是企业级AI应用的核心技术。通过本节学习，你应该掌握了RAG的基本原理和实现方法。

---

*继续学习下一节*`,

  // Agent related
  'agent': (title) => `# ${title}

## 概述

AI Agent是能够自主完成复杂任务的智能系统。本节将深入讲解${title}的核心概念和实践方法。

## Agent核心组件

### 1. 大脑（LLM）

Agent的核心推理引擎，负责理解任务、制定计划和决策。

### 2. 工具（Tools）

Agent可以调用的各种工具，如搜索引擎、代码执行器、数据库查询等。

### 3. 记忆（Memory）

- **短期记忆**：当前对话上下文
- **长期记忆**：持久化存储的知识和经验

### 4. 规划（Planning）

任务分解和执行策略。

## ReAct框架

ReAct（Reasoning + Acting）是Agent的核心推理框架：

\`\`\`
思考(Thought) → 行动(Action) → 观察(Observation) → 思考...
\`\`\`

### 实现示例

\`\`\`python
from langchain.agents import initialize_agent, Tool
from langchain.llms import OpenAI

# 定义工具
tools = [
    Tool(
        name="Search",
        func=search_func,
        description="用于搜索最新信息"
    ),
    Tool(
        name="Calculator",
        func=calculator_func,
        description="用于数学计算"
    )
]

# 创建Agent
llm = OpenAI(temperature=0)
agent = initialize_agent(
    tools,
    llm,
    agent="zero-shot-react-description",
    verbose=True
)

# 执行任务
result = agent.invoke("今天北京的天气怎么样？适合穿什么衣服？")
\`\`\`

## 工具调用

### Function Calling

\`\`\`python
import openai
import json

tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的天气信息",
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
    }
]

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "北京今天天气怎么样？"}],
    tools=tools,
    tool_choice="auto"
)
\`\`\`

## 记忆系统

\`\`\`python
from langchain.memory import ConversationBufferWindowMemory

# 短期记忆：保留最近10轮对话
memory = ConversationBufferWindowMemory(
    k=10,
    return_messages=True
)

# 长期记忆：使用向量数据库
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings

vectorstore = FAISS.from_texts(long_term_memories, OpenAIEmbeddings())
\`\`\`

## 实践练习

1. 构建一个简单的问答Agent
2. 为Agent添加工具调用能力
3. 实现带记忆的对话Agent

## 总结

Agent是AI应用的高级形态，通过本节学习，你应该掌握了Agent的核心概念和基本实现方法。

---

*继续学习下一节*`,

  // Fine-tuning related
  'finetune': (title) => `# ${title}

## 概述

模型微调是将预训练大模型适配到特定任务的关键技术。本节将深入讲解${title}。

## 为什么需要微调

| 方法 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| Prompt Engineering | 简单快速 | 能力有限 | 简单任务 |
| RAG | 知识可控 | 不改变模型能力 | 知识问答 |
| 微调 | 深度定制 | 需要数据和算力 | 专业领域 |

## 微调流程

### 1. 数据准备

\`\`\`python
# 数据格式示例
training_data = [
    {
        "instruction": "请分析这段代码的性能问题",
        "input": "def fibonacci(n):\\n    if n <= 1:\\n        return n\\n    return fibonacci(n-1) + fibonacci(n-2)",
        "output": "这段代码使用递归实现斐波那契数列，存在严重的性能问题：\\n\\n1. 时间复杂度为O(2^n)，存在大量重复计算\\n2. 建议使用动态规划或记忆化递归优化"
    }
]

# 转换为对话格式
def format_conversation(data):
    return {
        "messages": [
            {"role": "system", "content": "你是一个代码分析专家"},
            {"role": "user", "content": f"{data['instruction']}\\n{data['input']}"},
            {"role": "assistant", "content": data["output"]}
        ]
    }
\`\`\`

### 2. LoRA微调

\`\`\`python
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

# 加载基座模型
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-2-7b-hf")

# LoRA配置
lora_config = LoraConfig(
    r=16,  # 低秩维度
    lora_alpha=32,  # 缩放因子
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# 应用LoRA
model = get_peft_model(model, lora_config)
print(f"可训练参数: {model.print_trainable_parameters()}")
\`\`\`

### 3. 训练过程

\`\`\`python
from transformers import TrainingArguments, Trainer

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
    eval_steps=500
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset
)

trainer.train()
\`\`\`

## 评估指标

| 指标 | 说明 | 计算方法 |
|------|------|----------|
| Loss | 损失函数值 | 交叉熵 |
| Perplexity | 困惑度 | 2^Loss |
| BLEU | 翻译质量 | n-gram匹配 |
| ROUGE | 摘要质量 | 召回率 |

## 实践练习

1. 准备一份领域训练数据
2. 使用LoRA微调一个7B模型
3. 评估微调效果

## 总结

微调是让大模型适应特定任务的有效方法。通过本节学习，你应该掌握了微调的基本流程和关键技术。

---

*继续学习下一节*`,

  // Vision & Image related
  'vision': (title) => `# ${title}

## 概述

${title}是计算机视觉和多模态AI的重要应用方向。本节将深入讲解相关技术和实践方法。

## 核心技术

### 图像分类

\`\`\`python
import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image

# 加载预训练模型
model = models.resnet50(pretrained=True)
model.eval()

# 图像预处理
transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# 推理
image = Image.open("cat.jpg")
input_tensor = transform(image).unsqueeze(0)
with torch.no_grad():
    output = model(input_tensor)
    probabilities = torch.nn.functional.softmax(output[0], dim=0)
\`\`\`

### 目标检测

\`\`\`python
from ultralytics import YOLO

# 加载YOLOv8模型
model = YOLO("yolov8n.pt")

# 推理
results = model("street.jpg")

# 可视化
for result in results:
    boxes = result.boxes
    for box in boxes:
        print(f"类别: {box.cls}, 置信度: {box.conf:.2f}")
        print(f"位置: {box.xyxy}")
\`\`\`

### 使用GPT-4 Vision

\`\`\`python
import openai

client = openai.OpenAI()

response = client.chat.completions.create(
    model="gpt-4-vision-preview",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "请描述这张图片的内容"},
                {
                    "type": "image_url",
                    "image_url": {"url": "https://example.com/image.jpg"}
                }
            ]
        }
    ]
)

print(response.choices[0].message.content)
\`\`\`

## OpenCV基础

\`\`\`python
import cv2
import numpy as np

# 读取图像
img = cv2.imread("image.jpg")

# 灰度转换
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 边缘检测
edges = cv2.Canny(gray, 100, 200)

# 显示结果
cv2.imshow("Edges", edges)
cv2.waitKey(0)
cv2.destroyAllWindows()
\`\`\`

## 模型对比

| 模型 | 任务 | 精度 | 速度 | 适用场景 |
|------|------|------|------|----------|
| ResNet | 分类 | 高 | 快 | 通用分类 |
| YOLO | 检测 | 中 | 极快 | 实时检测 |
| SAM | 分割 | 高 | 中 | 精细分割 |
| CLIP | 多模态 | 高 | 中 | 图文理解 |

## 实践练习

1. 使用YOLO进行目标检测
2. 使用GPT-4V分析图片内容
3. 构建一个简单的图像分类应用

## 总结

计算机视觉技术正在快速发展，通过本节学习，你应该掌握了基本的图像处理和分析方法。

---

*继续学习下一节*`,

  // NLP related
  'nlp': (title) => `# ${title}

## 概述

自然语言处理（NLP）是AI的核心分支之一。本节将深入讲解${title}的基本概念和实践方法。

## 文本预处理

### 分词

\`\`\`python
import jieba

# 中文分词
text = "自然语言处理是人工智能的重要方向"
words = jieba.lcut(text)
print(words)
# ['自然语言', '处理', '是', '人工智能', '的', '重要', '方向']

# 英文分词（使用NLTK）
from nltk.tokenize import word_tokenize
text = "Natural language processing is important"
tokens = word_tokenize(text.lower())
\`\`\`

### 停用词过滤

\`\`\`python
from nltk.corpus import stopwords

stop_words = set(stopwords.words('english'))
filtered = [w for w in tokens if w not in stop_words]
\`\`\`

## 词向量

### Word2Vec

\`\`\`python
from gensim.models import Word2Vec

sentences = [
    ["机器", "学习", "是", "人工智能", "的", "分支"],
    ["深度", "学习", "是", "机器", "学习", "的", "子集"]
]

model = Word2Vec(sentences, vector_size=100, window=5, min_count=1)
similar = model.wv.most_similar("学习")
print(similar)
\`\`\`

### 使用Transformers

\`\`\`python
from transformers import pipeline

# 情感分析
classifier = pipeline("sentiment-analysis")
result = classifier("I love this product!")
print(result)  # [{'label': 'POSITIVE', 'score': 0.9998}]

# 命名实体识别
ner = pipeline("ner", aggregation_strategy="simple")
entities = ner("Apple is looking at buying U.K. startup for $1 billion")
print(entities)
\`\`\`

## 文本分类

\`\`\`python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline

# 训练数据
texts = ["这个产品很好", "质量太差了", "服务态度不错", "非常不满意"]
labels = ["正面", "负面", "正面", "负面"]

# 创建分类器
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

pipeline.fit(texts, labels)
prediction = pipeline.predict(["这个东西不错"])
print(prediction)  # ['正面']
\`\`\`

## 实践练习

1. 对一段中文文本进行分词和词性标注
2. 训练一个简单的情感分类器
3. 使用预训练模型进行命名实体识别

## 总结

NLP是AI应用的基础技术，通过本节学习，你应该掌握了文本处理的基本方法。

---

*继续学习下一节*`,

  // Default template for other topics
  'default': (title) => `# ${title}

## 概述

本节将深入讲解${title}的核心概念和实践方法。掌握这些知识对于理解和应用现代AI技术至关重要。

## 核心概念

### 基础原理

${title}是当前AI领域的重要技术方向。理解其基本原理是掌握这项技术的关键。

### 技术架构

\`\`\`
输入 → 处理 → 输出
     ↓
   模型推理
     ↓
   结果优化
\`\`\`

## 关键技术

### 1. 数据处理

\`\`\`python
import pandas as pd
import numpy as np

# 数据加载
df = pd.read_csv("data.csv")

# 数据清洗
df = df.dropna()
df = df.drop_duplicates()

# 特征工程
df['feature'] = df['raw_data'].apply(lambda x: process(x))
\`\`\`

### 2. 模型应用

\`\`\`python
from transformers import pipeline

# 使用预训练模型
classifier = pipeline("text-classification")
result = classifier("输入文本")
print(result)
\`\`\`

### 3. 结果评估

| 指标 | 说明 | 计算方法 |
|------|------|----------|
| 准确率 | 正确预测比例 | TP+TN / Total |
| 精确率 | 预测为正的正确率 | TP / TP+FP |
| 召回率 | 实际为正的检出率 | TP / TP+FN |
| F1分数 | 精确率和召回率的调和平均 | 2*P*R / P+R |

## 最佳实践

1. **数据质量优先**：高质量数据比复杂模型更重要
2. **迭代优化**：持续改进模型和流程
3. **监控评估**：建立完善的评估体系
4. **文档记录**：记录实验过程和结果

## 实际应用案例

### 案例1：智能客服

使用${title}技术构建智能客服系统，提升客户服务效率。

### 案例2：内容分析

应用${title}进行内容分析和理解，支持业务决策。

### 案例3：自动化流程

将${title}集成到工作流程中，实现自动化处理。

## 实践练习

1. 动手实践：完成一个简单的${title}项目
2. 参数调优：测试不同参数对结果的影响
3. 性能优化：优化模型推理速度

## 常见问题

**Q: ${title}的学习曲线如何？**
A: 掌握基础概念后，通过实践可以快速提升。

**Q: 需要什么前置知识？**
A: 需要Python基础和机器学习基本概念。

## 总结

通过本节学习，你应该掌握了${title}的核心概念和基础实践方法。继续学习后续课程，深入了解高级应用。

---

*继续学习下一节*`
};

// Determine which template to use based on lesson title
function getTemplate(title) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes('api') || lowerTitle.includes('调用') || lowerTitle.includes('openai') ||
      lowerTitle.includes('claude') || lowerTitle.includes('gemini') || lowerTitle.includes('gpt') ||
      lowerTitle.includes('completions') || lowerTitle.includes('function calling') ||
      lowerTitle.includes('tool use') || lowerTitle.includes('vision')) {
    return contentTemplates.api(title);
  }

  if (lowerTitle.includes('prompt') || lowerTitle.includes('提示词') || lowerTitle.includes('few-shot') ||
      lowerTitle.includes('chain') || lowerTitle.includes('思维链') || lowerTitle.includes('输出格式')) {
    return contentTemplates.prompt(title);
  }

  if (lowerTitle.includes('rag') || lowerTitle.includes('检索') || lowerTitle.includes('向量') ||
      lowerTitle.includes('embedding') || lowerTitle.includes('知识库') || lowerTitle.includes('分块')) {
    return contentTemplates.rag(title);
  }

  if (lowerTitle.includes('agent') || lowerTitle.includes('代理') || lowerTitle.includes('工具调用') ||
      lowerTitle.includes('记忆') || lowerTitle.includes('规划') || lowerTitle.includes('react')) {
    return contentTemplates.agent(title);
  }

  if (lowerTitle.includes('微调') || lowerTitle.includes('finetune') || lowerTitle.includes('lora') ||
      lowerTitle.includes('qlora') || lowerTitle.includes('训练') || lowerTitle.includes('rlhf') ||
      lowerTitle.includes('dpo')) {
    return contentTemplates.finetune(title);
  }

  if (lowerTitle.includes('图像') || lowerTitle.includes('视觉') || lowerTitle.includes('cv') ||
      lowerTitle.includes('yolo') || lowerTitle.includes('检测') || lowerTitle.includes('分割') ||
      lowerTitle.includes('stable diffusion') || lowerTitle.includes('midjourney') ||
      lowerTitle.includes('绘图') || lowerTitle.includes('dall-e') || lowerTitle.includes('diffusion')) {
    return contentTemplates.vision(title);
  }

  if (lowerTitle.includes('nlp') || lowerTitle.includes('自然语言') || lowerTitle.includes('文本') ||
      lowerTitle.includes('分类') || lowerTitle.includes('情感') || lowerTitle.includes('词向量') ||
      lowerTitle.includes('bert') || lowerTitle.includes('transformer')) {
    return contentTemplates.nlp(title);
  }

  return contentTemplates.default(title);
}

async function main() {
  console.log('=== 开始生成课程内容 ===\n');

  // Get all lessons with template content
  const lessons = await prisma.lesson.findMany({
    where: {
      content: { contains: '本节将详细讲解' }
    },
    select: {
      id: true,
      title: true,
      type: true
    }
  });

  console.log(`找到 ${lessons.length} 节需要更新的课程\n`);

  let success = 0;
  let failed = 0;

  for (const lesson of lessons) {
    try {
      const content = getTemplate(lesson.title);

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
