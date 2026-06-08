import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// 真实课程内容映射
const LESSON_CONTENT: Record<string, string> = {
  "什么是人工智能": `# 什么是人工智能

## 定义

人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，致力于创建能够模拟人类智能的系统。简单来说，就是让机器像人一样思考、学习和解决问题。

## AI的发展历程

### 第一次浪潮（1956-1974）
- 1956年达特茅斯会议，AI正式诞生
- 早期研究集中在符号推理和问题求解
- 代表成果：通用问题求解器、ELIZA聊天程序

### 第二次浪潮（1980-2000）
- 专家系统的兴起
- 机器学习开始发展
- 神经网络的初步探索

### 第三次浪潮（2010至今）
- 深度学习的突破
- 大语言模型的崛起
- AI应用全面普及

## AI的核心技术

### 1. 机器学习（Machine Learning）
让机器从数据中自动学习规律，而不需要显式编程。

\`\`\`python
# 简单的机器学习示例
from sklearn.linear_model import LinearRegression

# 训练数据
X = [[1], [2], [3], [4], [5]]
y = [2, 4, 6, 8, 10]

# 训练模型
model = LinearRegression()
model.fit(X, y)

# 预测
print(model.predict([[6]]))  # 输出: [12.]
\`\`\`

### 2. 深度学习（Deep Learning）
使用多层神经网络处理复杂数据，是机器学习的一个子集。

### 3. 自然语言处理（NLP）
让机器理解和生成人类语言，ChatGPT就是NLP的典型应用。

### 4. 计算机视觉（CV）
让机器"看懂"图像和视频，如人脸识别、自动驾驶。

## AI的应用场景

| 领域 | 应用 | 示例 |
|------|------|------|
| 医疗 | 辅助诊断 | 影像识别、药物研发 |
| 金融 | 风控 | 欺诈检测、智能投顾 |
| 教育 | 个性化学习 | 智能辅导、自动评分 |
| 交通 | 自动驾驶 | 特斯拉、Waymo |
| 娱乐 | 内容推荐 | 抖音、Netflix |

## 当前最热门的AI技术

### 大语言模型（LLM）
- GPT-4、Claude、Gemini等
- 能够理解和生成自然语言
- 支持代码生成、文本创作、数据分析等

### AI Agent
- 能够自主完成复杂任务的AI系统
- 可以使用工具、调用API、执行代码
- 代表框架：LangChain、CrewAI

### RAG（检索增强生成）
- 让AI能够访问外部知识库
- 解决大模型"幻觉"问题
- 企业知识管理的核心技术

## 学习建议

1. **打好基础**：先理解机器学习的基本概念
2. **动手实践**：通过项目巩固知识
3. **关注前沿**：持续跟踪最新技术动态
4. **加入社区**：与其他学习者交流经验

## 总结

人工智能正在改变世界的每一个角落。无论你是开发者、产品经理还是创业者，掌握AI技术都将为你的职业发展带来巨大优势。

---

*下一节：AI的发展历程*`,

  "AI的发展历程": `# AI的发展历程

## 起源（1940s-1950s）

### 图灵测试（1950）
阿兰·图灵发表了著名论文《计算机器与智能》，提出了著名的图灵测试：如果一台机器能够与人类进行对话而不被识别出是机器，那么它就具有智能。

### 达特茅斯会议（1956）
1956年夏天，约翰·麦卡锡等人在达特茅斯学院组织了一次会议，首次提出了"人工智能"这个术语。这次会议标志着AI作为一门学科的正式诞生。

## 第一次黄金时代（1956-1974）

这一时期取得了许多重要成果：
- **通用问题求解器（GPS）**：能够解决多种逻辑问题
- **ELIZA**：第一个聊天程序，模拟心理治疗师
- **感知机**：最早的神经网络模型

## 第一次AI寒冬（1974-1980）

由于计算能力限制和过高的期望，AI研究进入低谷期。政府大幅削减研究经费。

## 专家系统时代（1980-1988）

专家系统将人类专家的知识编码到程序中，在特定领域表现出色：
- **MYCIN**：医疗诊断系统
- **R1**：计算机配置系统

## 第二次AI寒冬（1988-1993）

专家系统的局限性暴露，AI再次进入低谷。

## 机器学习崛起（1993-2011）

### 关键突破
- **支持向量机（SVM）**：高效的分类算法
- **随机森林**：集成学习方法
- **神经网络复兴**：计算能力提升带来新机遇

### 里程碑事件
- 1997年：深蓝击败国际象棋冠军卡斯帕罗夫
- 2006年：Hinton提出深度学习概念

## 深度学习革命（2012至今）

### 关键突破
- **2012年**：AlexNet在ImageNet竞赛中大幅领先
- **2014年**：GAN（生成对抗网络）提出
- **2017年**：Transformer架构提出
- **2020年**：GPT-3发布，展示大语言模型的潜力
- **2022年**：ChatGPT发布，AI进入大众视野
- **2024年**：GPT-4、Claude 3等多模态大模型发布

### 当前趋势
- 多模态AI：同时处理文本、图像、音频
- AI Agent：能够自主完成复杂任务
- 边缘AI：在设备端运行AI模型

## 中国AI发展

| 时期 | 代表事件 |
|------|----------|
| 2017年 | 国务院发布《新一代人工智能发展规划》 |
| 2023年 | 百度文心一言、阿里通义千问发布 |
| 2024年 | 国产大模型百花齐放 |

## 未来展望

- **通用人工智能（AGI）**：具有人类水平的通用智能
- **人机协作**：AI增强人类能力，而非替代人类
- **AI治理**：确保AI的安全、公平和可控

## 总结

AI的发展经历了多次起伏，但每次都以更强大的姿态回归。当前我们正处于AI发展的黄金时代，掌握这项技术将为个人和社会带来巨大价值。

---

*下一节：AI的应用领域*`,

  "AI的应用领域": `# AI的应用领域

## 概述

人工智能已经渗透到我们生活的方方面面。本节将介绍AI在各个领域的典型应用。

## 1. 医疗健康

### 影像诊断
AI可以分析医学影像，辅助医生诊断疾病：
- 肺癌筛查：CT影像分析
- 眼底病变：糖尿病视网膜病变检测
- 皮肤癌：皮肤图像识别

### 药物研发
- 分子结构预测
- 药物靶点发现
- 临床试验优化

### 个性化医疗
- 基因组分析
- 精准用药推荐
- 健康风险预测

## 2. 金融科技

### 风险控制
\`\`\`python
# 简单的欺诈检测示例
def detect_fraud(transaction):
    risk_score = 0

    # 金额异常检测
    if transaction.amount > 10000:
        risk_score += 30

    # 地点异常检测
    if transaction.country != user.home_country:
        risk_score += 20

    # 时间异常检测
    if transaction.hour < 6 or transaction.hour > 23:
        risk_score += 15

    return risk_score > 50
\`\`\`

### 智能投顾
- 资产配置建议
- 市场趋势预测
- 风险评估

### 量化交易
- 策略回测
- 实时交易执行
- 风险管理

## 3. 教育

### 个性化学习
- 学习路径推荐
- 知识点掌握评估
- 学习资源匹配

### 智能辅导
- 答疑解惑
- 作业批改
- 学情分析

### 语言学习
- 发音纠正
- 对话练习
- 翻译辅助

## 4. 交通出行

### 自动驾驶
- 环境感知
- 路径规划
- 决策控制

### 智能交通
- 交通流量预测
- 信号灯优化
- 事故预警

## 5. 娱乐传媒

### 内容推荐
- 个性化推荐算法
- 用户画像构建
- 内容匹配

### 内容生成
- AI写作
- AI绘画
- AI音乐

### 游戏
- NPC行为控制
- 游戏内容生成
- 难度自适应

## 6. 制造业

### 质量检测
- 缺陷识别
- 尺寸测量
- 外观检查

### 预测性维护
- 设备故障预测
- 维护计划优化
- 备件管理

### 供应链优化
- 需求预测
- 库存管理
- 物流规划

## 7. 农业

### 精准农业
- 作物监测
- 病虫害识别
- 产量预测

### 智能灌溉
- 土壤湿度监测
- 灌溉策略优化
- 水资源管理

## 8. 安全防护

### 人脸识别
- 门禁系统
- 支付验证
- 身份核验

### 异常检测
- 网络入侵检测
- 视频监控分析
- 行为异常识别

## 职业发展建议

### 热门AI岗位
| 岗位 | 技能要求 | 薪资范围 |
|------|----------|----------|
| AI工程师 | Python、深度学习、LLM | 30-80万 |
| 数据科学家 | 统计学、机器学习 | 25-60万 |
| AI产品经理 | AI理解、产品设计 | 20-50万 |
| 提示词工程师 | Prompt Engineering | 15-40万 |

### 学习路径
1. 入门：了解AI基础概念
2. 进阶：掌握核心技术
3. 实战：完成项目经验
4. 专精：选择细分领域深入

## 总结

AI的应用领域非常广泛，几乎涵盖了所有行业。选择一个你感兴趣的领域深入学习，将有机会在AI时代获得更好的职业发展。

---

*下一节：概念测验*`,

  "什么是大语言模型": `# 什么是大语言模型

## 定义

大语言模型（Large Language Model，LLM）是一种基于深度学习的人工智能模型，通过在海量文本数据上训练，能够理解和生成自然语言。

## 核心原理

### Transformer架构

LLM的核心是Transformer架构，由Google在2017年论文《Attention is All You Need》中提出。

\`\`\`
输入 → 编码器 → 解码器 → 输出
         ↓
    自注意力机制
\`\`\`

### 自注意力机制

自注意力机制让模型能够关注输入文本中不同位置的信息：

\`\`\`python
# 简化的注意力计算
def attention(query, key, value):
    # 计算注意力分数
    scores = torch.matmul(query, key.transpose(-2, -1))
    scores = scores / math.sqrt(d_k)

    # Softmax归一化
    attention_weights = torch.softmax(scores, dim=-1)

    # 加权求和
    output = torch.matmul(attention_weights, value)
    return output
\`\`\`

## 主流LLM对比

| 模型 | 公司 | 特点 | 上下文长度 |
|------|------|------|-----------|
| GPT-4 | OpenAI | 综合能力强 | 128K |
| Claude 3 | Anthropic | 长文本、安全性 | 200K |
| Gemini | Google | 多模态 | 1M |
| Llama 3 | Meta | 开源 | 8K |
| Qwen 2 | 阿里 | 中文优化 | 128K |

## LLM的能力

### 1. 文本生成
\`\`\`
用户: 写一首关于春天的诗
AI: 春风拂面暖阳斜，
    桃花盛开满枝丫。
    燕子归来寻旧巢，
    万物复苏景色佳。
\`\`\`

### 2. 代码生成
\`\`\`python
# 用户: 写一个快速排序算法
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`\`\`

### 3. 问答推理
能够理解复杂问题并给出合理答案。

### 4. 多语言支持
支持数十种语言的理解和生成。

## LLM的局限性

### 1. 幻觉问题
模型可能生成看似合理但实际错误的内容。

### 2. 知识截止
模型的知识有截止日期，无法获取最新信息。

### 3. 推理能力有限
在复杂逻辑推理方面仍有不足。

### 4. 成本较高
API调用需要付费，大量使用成本可观。

## 如何使用LLM

### API调用示例
\`\`\`python
import openai

response = openai.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手"},
        {"role": "user", "content": "什么是机器学习？"}
    ]
)

print(response.choices[0].message.content)
\`\`\`

## 总结

大语言模型是当前AI领域最重要的技术突破之一。理解LLM的原理和能力，是学习AI应用开发的基础。

---

*下一节：LLM的工作原理*`,

  "LLM的工作原理": `# LLM的工作原理

## 训练过程

大语言模型的训练分为两个阶段：

### 阶段一：预训练（Pre-training）

在海量文本数据上进行无监督学习，学习语言的统计规律。

\`\`\`
训练数据: 互联网文本、书籍、代码...
目标: 预测下一个token
方法: 自回归语言模型
\`\`\`

### 阶段二：微调（Fine-tuning）

在特定任务数据上进行有监督学习，让模型学会遵循指令。

\`\`\`
训练数据: 指令-回复对
目标: 学会遵循人类指令
方法: 监督微调（SFT）
\`\`\`

## Token化

LLM处理文本的基本单位是token，而不是字符或单词。

### 中文token示例
\`\`\`
"人工智能" → ["人工", "智能"] (2个token)
"机器学习" → ["机器", "学习"] (2个token)
\`\`\`

### 英文token示例
\`\`\`
"Hello world" → ["Hello", " world"] (2个token)
"unhappiness" → ["un", "happiness"] (2个token)
\`\`\`

## 推理过程

### 自回归生成

模型每次只生成一个token，然后将其加入输入继续生成。

\`\`\`
输入: "今天天气"
Step 1: "今天天气" → "真"
Step 2: "今天天气真" → "好"
Step 3: "今天天气真好" → "，"
Step 4: "今天天气真好，" → "适合"
...
\`\`\`

### Temperature参数

控制生成的随机性：
- **temperature=0**：确定性输出，适合代码生成
- **temperature=0.7**：平衡创造性和准确性
- **temperature=1.0**：更有创造性，适合创意写作

\`\`\`python
response = openai.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "写一首诗"}],
    temperature=0.9  # 更有创造性
)
\`\`\`

## 上下文窗口

LLM能够处理的最大token数量，称为上下文窗口。

| 模型 | 上下文窗口 | 约等于 |
|------|-----------|--------|
| GPT-3.5 | 4K tokens | 3000字 |
| GPT-4 | 128K tokens | 10万字 |
| Claude 3 | 200K tokens | 15万字 |

## 关键概念

### System Prompt
系统提示词，用于设定AI的角色和行为。

\`\`\`python
messages = [
    {"role": "system", "content": "你是一个专业的Python教师"},
    {"role": "user", "content": "什么是装饰器？"}
]
\`\`\`

### Few-shot Learning
通过提供少量示例，让模型学会特定任务。

\`\`\`python
messages = [
    {"role": "user", "content": "将以下文本分类为正面/负面："},
    {"role": "user", "content": "这部电影太好看了！→ 正面"},
    {"role": "user", "content": "服务态度很差。→ 负面"},
    {"role": "user", "content": "产品质量不错。→"}
]
\`\`\`

## 总结

理解LLM的工作原理，有助于更好地使用这些模型。记住：LLM本质上是一个概率模型，它通过学习大量文本数据来预测下一个最可能的token。

---

*下一节：主流模型对比*`,

  "主流模型对比": `# 主流模型对比

## 概述

当前主流的大语言模型各有特点，了解它们的差异有助于选择最适合的模型。

## GPT系列（OpenAI）

### GPT-4o
- **发布时间**：2024年5月
- **特点**：多模态、速度快、成本低
- **上下文**：128K tokens
- **定价**：$5/1M输入tokens

### GPT-4 Turbo
- **特点**：更强的推理能力
- **上下文**：128K tokens
- **定价**：$10/1M输入tokens

### 适用场景
- 通用任务首选
- 代码生成
- 复杂推理

## Claude系列（Anthropic）

### Claude 3.5 Sonnet
- **发布时间**：2024年6月
- **特点**：长文本处理、安全性高
- **上下文**：200K tokens
- **定价**：$3/1M输入tokens

### Claude 3 Opus
- **特点**：最强推理能力
- **上下文**：200K tokens
- **定价**：$15/1M输入tokens

### 适用场景
- 长文档处理
- 需要高安全性的场景
- 复杂分析任务

## Gemini系列（Google）

### Gemini 1.5 Pro
- **特点**：超长上下文、多模态
- **上下文**：1M tokens
- **定价**：$3.5/1M输入tokens

### 适用场景
- 超长文档分析
- 视频理解
- 多模态任务

## 开源模型

### Llama 3（Meta）
\`\`\`python
# 使用Hugging Face加载Llama 3
from transformers import AutoTokenizer, AutoModelForCausalLM

model_id = "meta-llama/Meta-Llama-3-8B"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id)
\`\`\`

### Qwen 2（阿里）
- 中文能力优秀
- 支持多种规格
- 完全开源

## 选型建议

| 需求 | 推荐模型 | 原因 |
|------|----------|------|
| 通用开发 | GPT-4o | 性价比高 |
| 长文档 | Claude 3.5 | 200K上下文 |
| 中文场景 | Qwen 2 | 中文优化 |
| 本地部署 | Llama 3 | 开源免费 |
| 多模态 | Gemini 1.5 | 1M上下文 |

## 代码示例：多模型调用

\`\`\`python
import openai
import anthropic

def call_llm(provider, prompt):
    if provider == "openai":
        client = openai.OpenAI()
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    elif provider == "anthropic":
        client = anthropic.Anthropic()
        response = client.messages.create(
            model="claude-3-5-sonnet-20241022",
            max_tokens=1024,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.content[0].text

# 使用示例
result = call_llm("openai", "什么是机器学习？")
print(result)
\`\`\`

## 总结

选择LLM时需要考虑：任务类型、成本预算、数据隐私、上下文长度等因素。建议多尝试几个模型，找到最适合自己需求的。

---

*下一节：概念测验*`,

  "RAG核心概念": `# RAG核心概念

## 什么是RAG

RAG（Retrieval-Augmented Generation，检索增强生成）是一种结合了信息检索和文本生成的技术。它让大语言模型能够访问外部知识库，从而提供更准确、更及时的回答。

## 为什么需要RAG

### 大模型的局限性

1. **知识截止**：模型的知识有截止日期
2. **幻觉问题**：可能生成错误信息
3. **无法访问私有数据**：不了解企业内部信息

### RAG如何解决

\`\`\`
用户问题 → 检索相关文档 → 拼接上下文 → LLM生成答案
\`\`\`

## RAG的核心组件

### 1. 文档加载器（Document Loader）
负责读取各种格式的文档。

\`\`\`python
from langchain.document_loaders import (
    PyPDFLoader,
    TextLoader,
    CSVLoader
)

# 加载PDF文档
loader = PyPDFLoader("document.pdf")
documents = loader.load()

# 加载文本文件
loader = TextLoader("data.txt")
documents = loader.load()
\`\`\`

### 2. 文本分割器（Text Splitter）
将长文档分割成小块，便于检索。

\`\`\`python
from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,      # 每块最大500字符
    chunk_overlap=50     # 块之间重叠50字符
)

chunks = splitter.split_documents(documents)
\`\`\`

### 3. 嵌入模型（Embedding Model）
将文本转换为向量表示。

\`\`\`python
from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()

# 将文本转换为向量
vector = embeddings.embed_query("什么是机器学习？")
print(len(vector))  # 1536维
\`\`\`

### 4. 向量数据库（Vector Store）
存储和检索向量。

\`\`\`python
from langchain.vectorstores import Chroma

# 创建向量数据库
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings
)

# 检索相似文档
results = vectorstore.similarity_search(
    "什么是深度学习？",
    k=3  # 返回最相似的3个文档
)
\`\`\`

## RAG工作流程

\`\`\`
1. 用户提问
   ↓
2. 问题向量化
   ↓
3. 向量检索（找到最相关的文档）
   ↓
4. 拼接上下文（问题 + 检索到的文档）
   ↓
5. LLM生成答案
   ↓
6. 返回给用户
\`\`\`

## 完整RAG示例

\`\`\`python
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# 1. 加载文档
loader = TextLoader("knowledge.txt")
documents = loader.load()

# 2. 分割文本
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(documents)

# 3. 创建向量数据库
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# 4. 创建RAG链
llm = ChatOpenAI(model="gpt-4")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=vectorstore.as_retriever()
)

# 5. 提问
answer = qa_chain.run("什么是深度学习？")
print(answer)
\`\`\`

## RAG vs 微调

| 特性 | RAG | 微调 |
|------|-----|------|
| 知识更新 | 实时更新 | 需要重新训练 |
| 成本 | 较低 | 较高 |
| 私有数据 | 支持 | 支持 |
| 准确性 | 依赖检索质量 | 依赖训练数据 |
| 响应速度 | 稍慢（需要检索） | 快 |

## 总结

RAG是让大模型访问外部知识的核心技术。掌握RAG，是构建企业级AI应用的基础。

---

*下一节：RAG的典型应用场景*`,

  "ChatGPT功能全览": `# ChatGPT功能全览

## 概述

ChatGPT是OpenAI开发的AI对话助手，是目前最流行的AI工具之一。本节将介绍它的核心功能和使用技巧。

## 核心功能

### 1. 对话问答
最基础的功能，可以回答各种问题。

**示例：**
\`\`\`
用户: 什么是Python的装饰器？
ChatGPT: 装饰器是Python的一种语法糖，用于修改函数或类的行为。
        它本质上是一个接受函数作为参数并返回新函数的高阶函数。
\`\`\`

### 2. 代码生成
可以生成各种编程语言的代码。

**示例：**
\`\`\`python
# 用户: 写一个Python函数，计算斐波那契数列
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

### 3. 文本创作
可以撰写文章、邮件、报告等。

### 4. 数据分析
可以分析数据并提供见解。

### 5. 翻译
支持多种语言的互译。

## 高级功能

### GPTs（自定义助手）
可以创建专门用途的AI助手。

### 联网搜索
可以访问互联网获取最新信息。

### 代码解释器
可以执行Python代码并分析结果。

### 文件上传
可以上传文件进行分析。

## 使用技巧

### 1. 明确指令
\`\`\`
❌ 帮我写代码
✅ 用Python写一个函数，输入一个列表，返回去重后的排序列表
\`\`\`

### 2. 提供上下文
\`\`\`
❌ 解释这个概念
✅ 我是一个Python初学者，请用简单易懂的方式解释什么是装饰器
\`\`\`

### 3. 分步骤提问
\`\`\`
❌ 帮我构建一个网站
✅ 请先帮我设计网站的数据库结构
...然后帮我实现用户注册功能
...最后帮我设计前端页面
\`\`\`

## 免费版 vs Plus版

| 功能 | 免费版 | Plus版（$20/月） |
|------|--------|-----------------|
| GPT-4o | 有限 | 完整 |
| GPT-4 | ❌ | ✅ |
| 联网搜索 | ✅ | ✅ |
| 代码解释器 | ✅ | ✅ |
| GPTs | ✅ | ✅ |
| 高级数据分析 | ❌ | ✅ |

## 总结

ChatGPT是一个功能强大的AI工具，掌握它的使用技巧可以大幅提升工作效率。

---

*下一节：基础对话技巧*`,
};

function generateLessonContent(title: string, type: string): string {
  // 如果有预定义内容，直接返回
  if (LESSON_CONTENT[title]) {
    return LESSON_CONTENT[title];
  }

  // 否则生成通用内容
  return `# ${title}

## 课程概述

本节将详细讲解${title}的核心概念和实践方法。

## 学习目标

- 理解${title}的基本原理
- 掌握关键技术和方法
- 了解实际应用场景

## 核心内容

### 1. 基础概念

${title}是当前AI领域的重要技术方向。掌握它对于理解和应用现代AI系统至关重要。

### 2. 关键技术

- 技术原理：深入理解底层机制
- 实践方法：掌握常用工具和框架
- 最佳实践：遵循行业标准和规范

### 3. 实际应用

通过具体案例学习${title}的实际应用。

## 实践练习

完成以下练习巩固所学知识：

1. 基础练习
2. 进阶挑战
3. 综合项目

## 总结

通过本节学习，你应该已经掌握了${title}的核心概念和基础实践方法。

---

*继续学习下一节*`;
}

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing data
  await prisma.userAchievement.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.examAttempt.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.userStreak.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.systemSetting.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.create({
    data: {
      email: "admin@aiacademy.com",
      name: "管理员",
      password: adminPassword,
      role: "admin",
      exp: 1000,
    },
  });

  const userPassword = await bcrypt.hash("user123456", 12);
  const testUser = await prisma.user.create({
    data: {
      email: "user@aiacademy.com",
      name: "测试用户",
      password: userPassword,
      role: "user",
      exp: 100,
    },
  });

  // Create categories
  const cats = [
    { name: "LLM开发", slug: "llm", icon: "🤖", description: "大语言模型应用开发", sortOrder: 1 },
    { name: "提示词工程", slug: "prompt", icon: "✨", description: "Prompt Engineering 技术", sortOrder: 2 },
    { name: "RAG系统", slug: "rag", icon: "🔍", description: "检索增强生成系统", sortOrder: 3 },
    { name: "AI Agent", slug: "agent", icon: "🤖", description: "AI智能体开发", sortOrder: 4 },
    { name: "模型微调", slug: "fine-tuning", icon: "🔧", description: "大模型微调技术", sortOrder: 5 },
    { name: "计算机视觉", slug: "cv", icon: "👁️", description: "计算机视觉与图像处理", sortOrder: 6 },
    { name: "NLP自然语言处理", slug: "nlp", icon: "📝", description: "自然语言处理技术", sortOrder: 7 },
    { name: "AI安全与伦理", slug: "safety", icon: "🛡️", description: "AI安全与伦理", sortOrder: 8 },
    { name: "部署运维", slug: "deployment", icon: "🚀", description: "LLMOps与部署", sortOrder: 9 },
    { name: "AI工具使用", slug: "tools", icon: "🛠️", description: "AI工具使用技巧", sortOrder: 10 },
    { name: "多模态AI", slug: "multimodal", icon: "🎨", description: "多模态AI技术", sortOrder: 11 },
    { name: "AI基础", slug: "basics", icon: "📚", description: "人工智能基础入门", sortOrder: 12 },
  ];

  const catMap: Record<string, string> = {};
  for (const cat of cats) {
    const created = await prisma.category.create({ data: cat });
    catMap[cat.slug] = created.id;
  }

  // All courses data
  const coursesData = [
    // ===== LLM开发 =====
    {
      title: "LLM应用开发入门", slug: "llm-basics", subtitle: "从零开始学习大语言模型",
      description: "全面了解大语言模型的核心概念，学习OpenAI、Claude等主流API的调用方法，构建你的第一个AI应用。",
      price: 0, isFree: true, level: "beginner", category: "llm", tags: ["OpenAI", "API", "入门"],
      featured: true, totalStudents: 5200, rating: 4.8, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "LLM基础概念", lessons: [
          { title: "什么是大语言模型", type: "video", duration: 20 },
          { title: "LLM的工作原理", type: "video", duration: 25 },
          { title: "主流模型对比：GPT vs Claude vs Gemini", type: "video", duration: 30 },
          { title: "概念测验", type: "quiz", duration: 10 },
        ]},
        { title: "API调用实战", lessons: [
          { title: "获取API密钥与环境配置", type: "hands-on", duration: 20 },
          { title: "Chat Completions API详解", type: "coding", duration: 35 },
          { title: "流式输出实现", type: "coding", duration: 30 },
          { title: "错误处理与重试策略", type: "coding", duration: 25 },
        ]},
        { title: "构建你的第一个AI应用", lessons: [
          { title: "聊天机器人实战", type: "coding", duration: 45 },
          { title: "文本生成应用", type: "coding", duration: 40 },
          { title: "课程项目", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "LLM API 多平台精通", slug: "llm-api-mastery", subtitle: "掌握OpenAI、Claude、Gemini三大平台",
      description: "深入学习三大主流LLM平台的API，掌握多模型集成、智能路由、降级策略等高级技术。",
      price: 19.9, isFree: false, level: "intermediate", category: "llm", tags: ["OpenAI", "Claude", "Gemini", "多模型"],
      featured: true, totalStudents: 2800, rating: 4.9, totalLessons: 16, totalDuration: 480,
      modules: [
        { title: "OpenAI GPT-4 深度集成", lessons: [
          { title: "Chat Completions高级用法", type: "video", duration: 22 },
          { title: "Function Calling实战", type: "coding", duration: 35 },
          { title: "Vision API多模态处理", type: "coding", duration: 32 },
          { title: "Assistants API详解", type: "hands-on", duration: 30 },
        ]},
        { title: "Claude API高级技巧", lessons: [
          { title: "Claude独特能力与架构", type: "video", duration: 20 },
          { title: "超长上下文处理", type: "coding", duration: 35 },
          { title: "Tool Use高级用法", type: "coding", duration: 32 },
          { title: "系统提示词设计", type: "hands-on", duration: 28 },
        ]},
        { title: "Gemini与Google AI", lessons: [
          { title: "Gemini API全面解析", type: "video", duration: 22 },
          { title: "多模态能力实战", type: "coding", duration: 35 },
          { title: "Google Cloud集成", type: "hands-on", duration: 30 },
        ]},
        { title: "多模型编排系统", lessons: [
          { title: "智能路由与降级策略", type: "coding", duration: 40 },
          { title: "成本优化与监控", type: "hands-on", duration: 35 },
          { title: "项目：构建多LLM应用", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "Function Calling 工具调用精通", slug: "function-calling", subtitle: "让AI调用外部工具和API",
      description: "掌握Function Calling核心技术，让AI能够执行代码、调用API、搜索数据库，构建真正的智能Agent。",
      price: 15.9, isFree: false, level: "intermediate", category: "llm", tags: ["Function Calling", "工具调用", "API"],
      featured: false, totalStudents: 1500, rating: 4.7, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "Function Calling基础", lessons: [
          { title: "Function Calling原理", type: "video", duration: 22 },
          { title: "OpenAI Function Calling", type: "coding", duration: 35 },
          { title: "Claude Tool Use", type: "coding", duration: 32 },
          { title: "Gemini Function Declarations", type: "coding", duration: 30 },
        ]},
        { title: "高级工具设计", lessons: [
          { title: "Schema设计与验证", type: "video", duration: 20 },
          { title: "多步骤工具链", type: "coding", duration: 40 },
          { title: "并行与串行执行", type: "hands-on", duration: 35 },
        ]},
        { title: "实战工具生态", lessons: [
          { title: "数据库查询工具", type: "coding", duration: 35 },
          { title: "Web搜索与爬虫工具", type: "hands-on", duration: 38 },
          { title: "代码执行工具", type: "coding", duration: 40 },
        ]},
        { title: "项目实战", lessons: [
          { title: "构建研究助手Agent", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "Structured Output 结构化输出", slug: "structured-output", subtitle: "让AI输出可靠的JSON数据",
      description: "掌握结构化输出技术，让LLM返回可靠的JSON数据，构建生产级数据处理应用。",
      price: 9.9, isFree: false, level: "intermediate", category: "llm", tags: ["JSON", "结构化输出", "数据提取"],
      featured: false, totalStudents: 980, rating: 4.6, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "结构化输出基础", lessons: [
          { title: "JSON Mode vs Structured Output", type: "video", duration: 22 },
          { title: "Schema设计最佳实践", type: "coding", duration: 30 },
          { title: "多平台实现对比", type: "hands-on", duration: 28 },
        ]},
        { title: "数据提取实战", lessons: [
          { title: "文档信息提取", type: "coding", duration: 38 },
          { title: "表格与列表提取", type: "hands-on", duration: 32 },
          { title: "多文档聚合处理", type: "coding", duration: 35 },
        ]},
        { title: "生产级可靠性", lessons: [
          { title: "验证与错误处理", type: "coding", duration: 30 },
          { title: "重试策略与降级", type: "hands-on", duration: 28 },
          { title: "项目：文档处理流水线", type: "project", duration: 50 },
        ]},
      ],
    },
    {
      title: "聊天机器人开发实战", slug: "chatbot-dev", subtitle: "从原型到生产级对话AI",
      description: "构建具有记忆、个性和领域知识的智能聊天机器人，掌握对话管理和部署策略。",
      price: 15.9, isFree: false, level: "intermediate", category: "llm", tags: ["聊天机器人", "对话AI", "记忆系统"],
      featured: false, totalStudents: 1200, rating: 4.7, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "聊天机器人架构", lessons: [
          { title: "对话AI设计原则", type: "video", duration: 22 },
          { title: "状态管理与对话流", type: "video", duration: 20 },
          { title: "构建第一个聊天机器人", type: "coding", duration: 40 },
        ]},
        { title: "记忆与上下文系统", lessons: [
          { title: "短期对话记忆", type: "coding", duration: 28 },
          { title: "长期用户记忆", type: "coding", duration: 35 },
          { title: "RAG集成知识检索", type: "coding", duration: 38 },
        ]},
        { title: "高级功能", lessons: [
          { title: "个性化与语气定制", type: "hands-on", duration: 25 },
          { title: "多轮复杂对话", type: "coding", duration: 35 },
          { title: "错误处理与恢复", type: "video", duration: 22 },
        ]},
        { title: "生产部署", lessons: [
          { title: "多渠道部署", type: "coding", duration: 40 },
          { title: "监控与日志", type: "hands-on", duration: 30 },
          { title: "项目：客服聊天机器人", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "LLM应用架构设计", slug: "llm-architecture", subtitle: "可扩展AI系统的架构模式",
      description: "学习企业级LLM应用的架构设计模式，掌握微服务、事件驱动、异步处理等高级架构技术。",
      price: 19.9, isFree: false, level: "advanced", category: "llm", tags: ["架构", "微服务", "系统设计"],
      featured: false, totalStudents: 800, rating: 4.8, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "LLM系统设计原则", lessons: [
          { title: "AI应用架构模式", type: "video", duration: 25 },
          { title: "服务拆分与边界", type: "video", duration: 22 },
          { title: "数据流与状态管理", type: "hands-on", duration: 30 },
        ]},
        { title: "微服务架构", lessons: [
          { title: "LLM服务边界设计", type: "coding", duration: 35 },
          { title: "API网关与负载均衡", type: "hands-on", duration: 32 },
          { title: "服务通信模式", type: "coding", duration: 30 },
        ]},
        { title: "异步处理", lessons: [
          { title: "消息队列集成", type: "coding", duration: 35 },
          { title: "流处理与实时更新", type: "coding", duration: 38 },
          { title: "批处理与定时任务", type: "video", duration: 22 },
        ]},
        { title: "生产运维", lessons: [
          { title: "容器化与编排", type: "hands-on", duration: 40 },
          { title: "监控与可观测性", type: "coding", duration: 35 },
          { title: "项目：企业AI平台设计", type: "project", duration: 60 },
        ]},
      ],
    },

    // ===== 提示词工程 =====
    {
      title: "Prompt Engineering 快速入门", slug: "prompt-basics", subtitle: "掌握与AI高效沟通的艺术",
      description: "零基础学习提示词工程，掌握与AI高效沟通的方法，让AI输出更准确、更有用。",
      price: 0, isFree: true, level: "beginner", category: "prompt", tags: ["Prompt", "入门", "技巧"],
      featured: true, totalStudents: 8500, rating: 4.7, totalLessons: 8, totalDuration: 240,
      modules: [
        { title: "提示词基础", lessons: [
          { title: "什么是Prompt Engineering", type: "video", duration: 15 },
          { title: "LLM如何理解提示词", type: "video", duration: 20 },
          { title: "基础提示词模板", type: "hands-on", duration: 25 },
          { title: "练习：优化你的第一个提示词", type: "coding", duration: 30 },
        ]},
        { title: "实用技巧", lessons: [
          { title: "角色设定与上下文", type: "video", duration: 20 },
          { title: "Few-Shot学习技巧", type: "hands-on", duration: 25 },
          { title: "输出格式控制", type: "coding", duration: 30 },
          { title: "练习：构建提示词库", type: "project", duration: 45 },
        ]},
      ],
    },
    {
      title: "Prompt Engineering 精通指南", slug: "prompt-mastery", subtitle: "从基础到高级的系统化学习",
      description: "系统学习提示词工程的高级技巧，包括Chain-of-Thought、Tree-of-Thought等前沿技术。",
      price: 15.9, isFree: false, level: "intermediate", category: "prompt", tags: ["Chain-of-Thought", "高级技巧"],
      featured: true, totalStudents: 3200, rating: 4.9, totalLessons: 16, totalDuration: 480,
      modules: [
        { title: "高级推理技巧", lessons: [
          { title: "Chain-of-Thought提示", type: "video", duration: 22 },
          { title: "Tree-of-Thought方法", type: "video", duration: 25 },
          { title: "自洽性与集成方法", type: "coding", duration: 28 },
          { title: "Meta-Prompting技术", type: "hands-on", duration: 32 },
        ]},
        { title: "领域专用提示词", lessons: [
          { title: "代码生成提示词", type: "hands-on", duration: 30 },
          { title: "数据分析提示词", type: "coding", duration: 28 },
          { title: "创意写作提示词", type: "hands-on", duration: 25 },
          { title: "商业沟通提示词", type: "video", duration: 20 },
        ]},
        { title: "提示词工程规模化", lessons: [
          { title: "构建提示词模板库", type: "coding", duration: 35 },
          { title: "A/B测试与性能指标", type: "video", duration: 22 },
          { title: "版本控制与协作", type: "hands-on", duration: 28 },
        ]},
        { title: "综合项目", lessons: [
          { title: "项目：企业级提示词系统", type: "project", duration: 60 },
        ]},
      ],
    },

    // ===== RAG系统 =====
    {
      title: "RAG基础入门", slug: "rag-basics", subtitle: "从零开始理解检索增强生成",
      description: "全面了解RAG技术的核心概念、架构设计和基本实现，掌握构建基础RAG系统的完整流程。",
      price: 0, isFree: true, level: "beginner", category: "rag", tags: ["RAG", "向量检索", "入门"],
      featured: true, totalStudents: 4500, rating: 4.7, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "RAG核心概念", lessons: [
          { title: "什么是RAG：检索增强生成概述", type: "video", duration: 20 },
          { title: "RAG的典型应用场景", type: "video", duration: 15 },
          { title: "RAG vs 微调：如何选择", type: "quiz", duration: 10 },
          { title: "RAG系统架构全景图", type: "video", duration: 25 },
        ]},
        { title: "文档处理与向量化", lessons: [
          { title: "文档加载与格式解析", type: "video", duration: 20 },
          { title: "文本分块策略详解", type: "hands-on", duration: 30 },
          { title: "Embedding模型选择与使用", type: "video", duration: 25 },
          { title: "构建文档向量化管道", type: "coding", duration: 40 },
        ]},
        { title: "检索与生成", lessons: [
          { title: "向量检索原理与相似度计算", type: "video", duration: 20 },
          { title: "混合检索策略实践", type: "coding", duration: 35 },
          { title: "构建第一个RAG问答系统", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "企业级RAG实战", slug: "rag-enterprise", subtitle: "构建生产环境可用的高性能RAG系统",
      description: "深入企业级RAG系统的架构设计与工程实践，覆盖多模态文档处理、高级检索策略、幻觉检测等核心话题。",
      price: 19.9, isFree: false, level: "advanced", category: "rag", tags: ["RAG", "企业级", "生产部署"],
      featured: true, totalStudents: 1800, rating: 4.8, totalLessons: 16, totalDuration: 480,
      modules: [
        { title: "高级文档处理", lessons: [
          { title: "多模态文档解析", type: "coding", duration: 35 },
          { title: "智能分块策略", type: "hands-on", duration: 30 },
          { title: "元数据提取与增强", type: "coding", duration: 32 },
        ]},
        { title: "高级检索策略", lessons: [
          { title: "混合检索与重排序", type: "coding", duration: 35 },
          { title: "多查询分解策略", type: "hands-on", duration: 32 },
          { title: "上下文压缩与过滤", type: "coding", duration: 30 },
        ]},
        { title: "质量保障", lessons: [
          { title: "幻觉检测与防护", type: "coding", duration: 35 },
          { title: "来源归属与引用", type: "hands-on", duration: 28 },
          { title: "评估指标与基准", type: "video", duration: 25 },
        ]},
        { title: "生产部署", lessons: [
          { title: "性能优化与缓存", type: "coding", duration: 35 },
          { title: "监控与质量保障", type: "hands-on", duration: 30 },
          { title: "项目：企业知识库", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "GraphRAG与知识图谱", slug: "graph-rag", subtitle: "用知识图谱增强RAG系统",
      description: "学习GraphRAG技术，将知识图谱与RAG系统结合，实现更精准的知识检索和推理。",
      price: 19.9, isFree: false, level: "advanced", category: "rag", tags: ["GraphRAG", "知识图谱", "Neo4j"],
      featured: false, totalStudents: 950, rating: 4.8, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "知识图谱基础", lessons: [
          { title: "知识图谱概念与架构", type: "video", duration: 25 },
          { title: "Neo4j图数据库入门", type: "hands-on", duration: 35 },
          { title: "实体关系抽取", type: "coding", duration: 30 },
        ]},
        { title: "GraphRAG实现", lessons: [
          { title: "GraphRAG原理详解", type: "video", duration: 22 },
          { title: "图索引构建", type: "coding", duration: 38 },
          { title: "图检索策略", type: "hands-on", duration: 35 },
        ]},
        { title: "高级应用", lessons: [
          { title: "社区检测与摘要", type: "coding", duration: 35 },
          { title: "多跳推理", type: "hands-on", duration: 32 },
          { title: "图谱可视化", type: "coding", duration: 30 },
        ]},
        { title: "项目实战", lessons: [
          { title: "项目：智能问答知识图谱", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "向量数据库深度指南", slug: "vector-db", subtitle: "掌握向量存储与检索核心技术",
      description: "深入学习向量数据库的原理与实战，掌握Chroma、Pinecone、Milvus等主流向量数据库。",
      price: 15.9, isFree: false, level: "intermediate", category: "rag", tags: ["向量数据库", "Chroma", "Pinecone"],
      featured: false, totalStudents: 1200, rating: 4.7, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "向量数据库基础", lessons: [
          { title: "向量表示与相似度计算", type: "video", duration: 22 },
          { title: "主流向量数据库对比", type: "video", duration: 20 },
          { title: "Chroma快速上手", type: "hands-on", duration: 30 },
        ]},
        { title: "高级特性", lessons: [
          { title: "Pinecone云端向量库", type: "coding", duration: 35 },
          { title: "Milvus分布式方案", type: "hands-on", duration: 32 },
          { title: "索引优化与调参", type: "coding", duration: 30 },
        ]},
        { title: "生产级应用", lessons: [
          { title: "增量更新与同步", type: "coding", duration: 35 },
          { title: "多租户架构", type: "hands-on", duration: 28 },
          { title: "成本优化策略", type: "video", duration: 22 },
          { title: "项目：多源知识检索系统", type: "project", duration: 55 },
        ]},
      ],
    },

    // ===== AI Agent =====
    {
      title: "AI Agent 基础概念", slug: "agent-basics", subtitle: "理解AI智能体的核心原理",
      description: "零基础了解AI Agent的核心概念、架构设计和工作原理，为深入学习打下基础。",
      price: 0, isFree: true, level: "beginner", category: "agent", tags: ["Agent", "入门", "概念"],
      featured: true, totalStudents: 3800, rating: 4.6, totalLessons: 8, totalDuration: 240,
      modules: [
        { title: "Agent核心概念", lessons: [
          { title: "什么是AI Agent", type: "video", duration: 20 },
          { title: "Agent的组成要素", type: "video", duration: 18 },
          { title: "ReAct推理行动框架", type: "video", duration: 22 },
          { title: "概念测验", type: "quiz", duration: 10 },
        ]},
        { title: "Agent实战入门", lessons: [
          { title: "构建你的第一个Agent", type: "coding", duration: 40 },
          { title: "工具调用基础", type: "hands-on", duration: 30 },
          { title: "Agent记忆系统", type: "video", duration: 20 },
          { title: "练习：简单任务Agent", type: "project", duration: 45 },
        ]},
      ],
    },
    {
      title: "LangGraph 工作流开发", slug: "langgraph", subtitle: "用LangGraph构建复杂Agent工作流",
      description: "掌握LangGraph框架，构建有状态、可循环的复杂Agent工作流，实现多步骤任务自动化。",
      price: 19.9, isFree: false, level: "advanced", category: "agent", tags: ["LangGraph", "工作流", "状态机"],
      featured: true, totalStudents: 1500, rating: 4.8, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "LangGraph基础", lessons: [
          { title: "LangGraph架构与核心概念", type: "video", duration: 25 },
          { title: "状态图与节点设计", type: "coding", duration: 35 },
          { title: "条件路由与分支", type: "hands-on", duration: 30 },
        ]},
        { title: "高级工作流", lessons: [
          { title: "循环与递归模式", type: "coding", duration: 38 },
          { title: "人机协作流程", type: "hands-on", duration: 32 },
          { title: "错误处理与恢复", type: "coding", duration: 30 },
        ]},
        { title: "实战应用", lessons: [
          { title: "研究助手工作流", type: "coding", duration: 40 },
          { title: "代码审查Agent", type: "hands-on", duration: 35 },
          { title: "多步骤数据分析", type: "coding", duration: 38 },
        ]},
        { title: "项目实战", lessons: [
          { title: "项目：自动化研究Agent", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "CrewAI 多Agent系统", slug: "crewai", subtitle: "构建多Agent协作系统",
      description: "学习CrewAI框架，让多个AI Agent像团队一样协作，共同完成复杂任务。",
      price: 15.9, isFree: false, level: "advanced", category: "agent", tags: ["CrewAI", "多Agent", "协作"],
      featured: false, totalStudents: 980, rating: 4.7, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "CrewAI基础", lessons: [
          { title: "CrewAI架构与设计哲学", type: "video", duration: 22 },
          { title: "Agent角色定义", type: "coding", duration: 30 },
          { title: "任务分配与编排", type: "hands-on", duration: 35 },
        ]},
        { title: "高级协作模式", lessons: [
          { title: "层级化管理结构", type: "coding", duration: 35 },
          { title: "顺序与并行执行", type: "hands-on", duration: 32 },
          { title: "自定义工具集成", type: "coding", duration: 30 },
        ]},
        { title: "实战项目", lessons: [
          { title: "内容创作团队", type: "coding", duration: 40 },
          { title: "代码开发团队", type: "hands-on", duration: 38 },
          { title: "项目：自动化营销团队", type: "project", duration: 60 },
        ]},
      ],
    },

    // ===== 模型微调 =====
    {
      title: "模型微调入门指南", slug: "fine-tuning-basics", subtitle: "了解大模型微调的核心概念",
      description: "零基础了解大模型微调的原理、方法和适用场景，为深入学习微调技术打下基础。",
      price: 0, isFree: true, level: "beginner", category: "fine-tuning", tags: ["微调", "入门", "LoRA"],
      featured: false, totalStudents: 2200, rating: 4.6, totalLessons: 8, totalDuration: 240,
      modules: [
        { title: "微调基础概念", lessons: [
          { title: "什么是模型微调", type: "video", duration: 20 },
          { title: "微调 vs RAG vs Prompt Engineering", type: "video", duration: 22 },
          { title: "何时需要微调", type: "video", duration: 15 },
          { title: "概念测验", type: "quiz", duration: 10 },
        ]},
        { title: "微调技术概览", lessons: [
          { title: "全量微调 vs 参数高效微调", type: "video", duration: 25 },
          { title: "LoRA/QLoRA技术简介", type: "video", duration: 20 },
          { title: "数据准备基础", type: "hands-on", duration: 30 },
          { title: "练习：微调你的第一个模型", type: "project", duration: 50 },
        ]},
      ],
    },
    {
      title: "LoRA/QLoRA 微调实战", slug: "lora-fine-tuning", subtitle: "用最少资源训练专属模型",
      description: "深入学习LoRA和QLoRA技术，用消费级GPU微调大模型，降低90%训练成本。",
      price: 19.9, isFree: false, level: "advanced", category: "fine-tuning", tags: ["LoRA", "QLoRA", "PEFT"],
      featured: true, totalStudents: 1200, rating: 4.9, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "LoRA原理与实现", lessons: [
          { title: "低秩分解原理", type: "video", duration: 25 },
          { title: "LoRA配置与超参数", type: "coding", duration: 35 },
          { title: "QLoRA量化训练", type: "hands-on", duration: 32 },
        ]},
        { title: "数据准备与训练", lessons: [
          { title: "训练数据格式与质量", type: "video", duration: 22 },
          { title: "数据清洗与增强", type: "coding", duration: 38 },
          { title: "训练过程监控", type: "hands-on", duration: 30 },
        ]},
        { title: "评估与部署", lessons: [
          { title: "自动评估指标", type: "coding", duration: 30 },
          { title: "人工评估方法", type: "hands-on", duration: 28 },
          { title: "模型合并与导出", type: "coding", duration: 25 },
        ]},
        { title: "项目实战", lessons: [
          { title: "项目：微调领域专属模型", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "RLHF与人类对齐", slug: "rlhf", subtitle: "让AI更符合人类价值观",
      description: "学习RLHF、DPO等人类对齐技术，让AI模型的输出更安全、更有帮助、更诚实。",
      price: 19.9, isFree: false, level: "advanced", category: "fine-tuning", tags: ["RLHF", "DPO", "对齐"],
      featured: false, totalStudents: 650, rating: 4.8, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "对齐技术基础", lessons: [
          { title: "AI对齐问题概述", type: "video", duration: 22 },
          { title: "RLHF原理详解", type: "video", duration: 28 },
          { title: "奖励模型训练", type: "coding", duration: 35 },
        ]},
        { title: "DPO与现代方法", lessons: [
          { title: "DPO直接偏好优化", type: "video", duration: 25 },
          { title: "ORPO与其他方法", type: "coding", duration: 32 },
          { title: "偏好数据构建", type: "hands-on", duration: 30 },
        ]},
        { title: "安全与评估", lessons: [
          { title: "安全评估方法", type: "coding", duration: 30 },
          { title: "红队测试基础", type: "hands-on", duration: 28 },
          { title: "持续改进流程", type: "video", duration: 22 },
          { title: "项目：对齐你的模型", type: "project", duration: 55 },
        ]},
      ],
    },

    // ===== 计算机视觉 =====
    {
      title: "计算机视觉基础入门", slug: "cv-basics", subtitle: "从零开始学习计算机视觉",
      description: "了解计算机视觉的核心概念和基础技术，学习图像处理、特征提取、目标检测等基础知识。",
      price: 0, isFree: true, level: "beginner", category: "cv", tags: ["CV", "入门", "图像处理"],
      featured: false, totalStudents: 2800, rating: 4.6, totalLessons: 10, totalDuration: 300,
      modules: [
        { title: "CV基础概念", lessons: [
          { title: "什么是计算机视觉", type: "video", duration: 18 },
          { title: "数字图像基础", type: "video", duration: 20 },
          { title: "OpenCV快速上手", type: "hands-on", duration: 30 },
        ]},
        { title: "核心任务", lessons: [
          { title: "图像分类入门", type: "video", duration: 22 },
          { title: "目标检测概述", type: "video", duration: 20 },
          { title: "图像分割简介", type: "video", duration: 18 },
          { title: "练习：图像处理基础", type: "coding", duration: 35 },
        ]},
        { title: "深度学习与CV", lessons: [
          { title: "CNN卷积神经网络", type: "video", duration: 25 },
          { title: "经典模型架构", type: "video", duration: 22 },
          { title: "迁移学习实战", type: "coding", duration: 40 },
        ]},
      ],
    },
    {
      title: "YOLO目标检测实战", slug: "yolo-detection", subtitle: "实时目标检测从入门到精通",
      description: "深入学习YOLO系列算法，从YOLOv5到YOLOv8，掌握实时目标检测的完整技术栈。",
      price: 15.9, isFree: false, level: "intermediate", category: "cv", tags: ["YOLO", "目标检测", "实时检测"],
      featured: false, totalStudents: 1500, rating: 4.7, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "YOLO基础", lessons: [
          { title: "YOLO算法演进史", type: "video", duration: 22 },
          { title: "YOLOv8环境搭建", type: "hands-on", duration: 25 },
          { title: "预训练模型推理", type: "coding", duration: 35 },
        ]},
        { title: "自定义训练", lessons: [
          { title: "数据集标注与准备", type: "hands-on", duration: 35 },
          { title: "模型训练与调优", type: "coding", duration: 40 },
          { title: "数据增强策略", type: "hands-on", duration: 30 },
        ]},
        { title: "部署优化", lessons: [
          { title: "模型导出与优化", type: "coding", duration: 35 },
          { title: "边缘设备部署", type: "hands-on", duration: 32 },
          { title: "实时视频处理", type: "coding", duration: 38 },
        ]},
        { title: "项目实战", lessons: [
          { title: "项目：智能监控系统", type: "project", duration: 60 },
        ]},
      ],
    },
    {
      title: "图像生成与Stable Diffusion", slug: "stable-diffusion", subtitle: "AI绘画从原理到创作",
      description: "学习Stable Diffusion等图像生成技术，掌握AI绘画的原理和实战技巧。",
      price: 15.9, isFree: false, level: "intermediate", category: "cv", tags: ["Stable Diffusion", "图像生成", "AI绘画"],
      featured: false, totalStudents: 2200, rating: 4.7, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "扩散模型基础", lessons: [
          { title: "扩散模型原理", type: "video", duration: 25 },
          { title: "Stable Diffusion架构", type: "video", duration: 22 },
          { title: "环境搭建与推理", type: "hands-on", duration: 30 },
        ]},
        { title: "提示词与控制", lessons: [
          { title: "提示词工程技巧", type: "hands-on", duration: 28 },
          { title: "ControlNet精确控制", type: "coding", duration: 35 },
          { title: "LoRA风格定制", type: "hands-on", duration: 32 },
        ]},
        { title: "高级技术", lessons: [
          { title: "图生图与修复", type: "coding", duration: 35 },
          { title: "超分辨率放大", type: "hands-on", duration: 28 },
          { title: "ComfyUI工作流", type: "coding", duration: 38 },
        ]},
        { title: "项目实战", lessons: [
          { title: "项目：AI艺术创作平台", type: "project", duration: 60 },
        ]},
      ],
    },

    // ===== NLP =====
    {
      title: "NLP基础入门", slug: "nlp-basics", subtitle: "自然语言处理核心概念",
      description: "了解自然语言处理的基础概念和技术，学习文本处理、词向量、序列模型等核心知识。",
      price: 0, isFree: true, level: "beginner", category: "nlp", tags: ["NLP", "入门", "文本处理"],
      featured: false, totalStudents: 2500, rating: 4.6, totalLessons: 10, totalDuration: 300,
      modules: [
        { title: "NLP基础概念", lessons: [
          { title: "什么是自然语言处理", type: "video", duration: 18 },
          { title: "文本预处理技术", type: "hands-on", duration: 25 },
          { title: "词向量与Word2Vec", type: "video", duration: 22 },
        ]},
        { title: "核心任务", lessons: [
          { title: "文本分类概述", type: "video", duration: 20 },
          { title: "情感分析入门", type: "hands-on", duration: 28 },
          { title: "命名实体识别", type: "video", duration: 18 },
          { title: "练习：文本处理基础", type: "coding", duration: 35 },
        ]},
        { title: "现代NLP", lessons: [
          { title: "Transformer架构", type: "video", duration: 25 },
          { title: "BERT与预训练模型", type: "video", duration: 22 },
          { title: "迁移学习实战", type: "coding", duration: 40 },
        ]},
      ],
    },
    {
      title: "文本分类与情感分析", slug: "text-classification", subtitle: "NLP核心任务实战",
      description: "深入学习文本分类和情感分析技术，从传统方法到深度学习，构建生产级文本分析系统。",
      price: 9.9, isFree: false, level: "intermediate", category: "nlp", tags: ["文本分类", "情感分析", "BERT"],
      featured: false, totalStudents: 1200, rating: 4.7, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "传统方法", lessons: [
          { title: "特征工程与TF-IDF", type: "video", duration: 22 },
          { title: "机器学习分类器", type: "coding", duration: 35 },
          { title: "模型评估指标", type: "hands-on", duration: 28 },
        ]},
        { title: "深度学习方法", lessons: [
          { title: "BERT微调实战", type: "coding", duration: 40 },
          { title: "多标签分类", type: "hands-on", duration: 32 },
          { title: "少样本学习", type: "coding", duration: 35 },
        ]},
        { title: "生产应用", lessons: [
          { title: "实时情感分析系统", type: "coding", duration: 35 },
          { title: "多语言支持", type: "hands-on", duration: 30 },
          { title: "模型压缩与加速", type: "video", duration: 22 },
          { title: "项目：舆情分析系统", type: "project", duration: 55 },
        ]},
      ],
    },

    // ===== AI安全 =====
    {
      title: "AI安全基础", slug: "ai-safety-basics", subtitle: "了解AI安全的核心概念",
      description: "了解AI安全领域的核心概念和挑战，学习提示词注入、数据隐私、内容安全等基础知识。",
      price: 0, isFree: true, level: "beginner", category: "safety", tags: ["安全", "入门", "伦理"],
      featured: false, totalStudents: 1800, rating: 4.5, totalLessons: 8, totalDuration: 240,
      modules: [
        { title: "AI安全概述", lessons: [
          { title: "AI安全的重要性", type: "video", duration: 18 },
          { title: "常见安全威胁", type: "video", duration: 20 },
          { title: "安全事件案例分析", type: "video", duration: 22 },
        ]},
        { title: "基础防护", lessons: [
          { title: "提示词注入防护", type: "hands-on", duration: 30 },
          { title: "数据隐私保护", type: "video", duration: 20 },
          { title: "内容安全过滤", type: "hands-on", duration: 25 },
          { title: "练习：安全审计", type: "coding", duration: 35 },
        ]},
      ],
    },
    {
      title: "AI红队测试", slug: "ai-red-teaming", subtitle: "像攻击者一样测试AI系统",
      description: "学习AI红队测试方法论，掌握发现和修复AI系统安全漏洞的专业技能。",
      price: 19.9, isFree: false, level: "advanced", category: "safety", tags: ["红队", "渗透测试", "安全"],
      featured: false, totalStudents: 450, rating: 4.8, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "红队测试基础", lessons: [
          { title: "AI红队测试方法论", type: "video", duration: 25 },
          { title: "攻击面分析", type: "hands-on", duration: 30 },
          { title: "自动化测试工具", type: "coding", duration: 35 },
        ]},
        { title: "高级攻击技术", lessons: [
          { title: "越狱攻击技术", type: "hands-on", duration: 35 },
          { title: "数据投毒攻击", type: "video", duration: 22 },
          { title: "模型逆向攻击", type: "coding", duration: 32 },
        ]},
        { title: "防御与修复", lessons: [
          { title: "防御策略设计", type: "coding", duration: 35 },
          { title: "安全监控系统", type: "hands-on", duration: 30 },
          { title: "应急响应流程", type: "video", duration: 22 },
          { title: "项目：AI系统安全评估", type: "project", duration: 60 },
        ]},
      ],
    },

    // ===== 部署运维 =====
    {
      title: "LLMOps入门", slug: "llmops-basics", subtitle: "AI应用运维基础",
      description: "了解LLMOps的核心概念和工具链，学习AI应用的部署、监控和运维基础知识。",
      price: 0, isFree: true, level: "beginner", category: "deployment", tags: ["LLMOps", "入门", "部署"],
      featured: false, totalStudents: 1500, rating: 4.5, totalLessons: 8, totalDuration: 240,
      modules: [
        { title: "LLMOps概述", lessons: [
          { title: "什么是LLMOps", type: "video", duration: 18 },
          { title: "LLMOps vs MLOps", type: "video", duration: 15 },
          { title: "工具链概览", type: "video", duration: 20 },
        ]},
        { title: "基础部署", lessons: [
          { title: "模型服务化基础", type: "hands-on", duration: 30 },
          { title: "Docker容器化", type: "coding", duration: 35 },
          { title: "基础监控搭建", type: "hands-on", duration: 28 },
          { title: "练习：部署你的第一个AI服务", type: "project", duration: 45 },
        ]},
      ],
    },
    {
      title: "模型服务与推理优化", slug: "model-serving", subtitle: "高性能模型推理技术",
      description: "学习模型服务化和推理优化技术，掌握vLLM、TensorRT、ONNX等高性能推理方案。",
      price: 15.9, isFree: false, level: "advanced", category: "deployment", tags: ["vLLM", "推理优化", "TensorRT"],
      featured: false, totalStudents: 800, rating: 4.7, totalLessons: 12, totalDuration: 360,
      modules: [
        { title: "推理基础", lessons: [
          { title: "推理性能指标", type: "video", duration: 20 },
          { title: "vLLM高性能推理", type: "hands-on", duration: 35 },
          { title: "量化技术实战", type: "coding", duration: 32 },
        ]},
        { title: "优化技术", lessons: [
          { title: "TensorRT加速", type: "coding", duration: 38 },
          { title: "ONNX模型转换", type: "hands-on", duration: 30 },
          { title: "批处理优化", type: "coding", duration: 35 },
        ]},
        { title: "生产部署", lessons: [
          { title: "负载均衡策略", type: "hands-on", duration: 30 },
          { title: "自动扩缩容", type: "coding", duration: 35 },
          { title: "A/B测试部署", type: "video", duration: 22 },
          { title: "项目：高性能推理服务", type: "project", duration: 55 },
        ]},
      ],
    },

    // ===== AI工具使用 =====
    {
      title: "ChatGPT高效使用指南", slug: "chatgpt-guide", subtitle: "让ChatGPT成为你的超级助手",
      description: "掌握ChatGPT的高级使用技巧，让AI成为你工作和学习的超级助手。",
      price: 0, isFree: true, level: "beginner", category: "tools", tags: ["ChatGPT", "效率", "技巧"],
      featured: true, totalStudents: 12000, rating: 4.5, totalLessons: 8, totalDuration: 200,
      modules: [
        { title: "ChatGPT基础", lessons: [
          { title: "ChatGPT功能全览", type: "video", duration: 15 },
          { title: "基础对话技巧", type: "video", duration: 18 },
          { title: "常见使用场景", type: "video", duration: 20 },
        ]},
        { title: "高级技巧", lessons: [
          { title: "GPTs自定义助手", type: "hands-on", duration: 25 },
          { title: "联网搜索与代码解释器", type: "hands-on", duration: 22 },
          { title: "多模态功能使用", type: "video", duration: 18 },
          { title: "效率提升10倍的技巧", type: "video", duration: 20 },
          { title: "练习：构建你的工作流", type: "project", duration: 30 },
        ]},
      ],
    },
    {
      title: "Claude使用技巧大全", slug: "claude-guide", subtitle: "解锁Claude的全部潜力",
      description: "深入学习Claude的独特能力和高级使用技巧，包括长文档处理、代码分析等。",
      price: 0, isFree: true, level: "beginner", category: "tools", tags: ["Claude", "技巧", "效率"],
      featured: false, totalStudents: 6500, rating: 4.6, totalLessons: 8, totalDuration: 200,
      modules: [
        { title: "Claude基础", lessons: [
          { title: "Claude能力概览", type: "video", duration: 15 },
          { title: "与ChatGPT的差异", type: "video", duration: 18 },
          { title: "基础使用场景", type: "video", duration: 20 },
        ]},
        { title: "高级应用", lessons: [
          { title: "超长文档处理", type: "hands-on", duration: 25 },
          { title: "代码分析与生成", type: "hands-on", duration: 28 },
          { title: "Artifacts功能详解", type: "hands-on", duration: 22 },
          { title: "Projects项目管理", type: "video", duration: 18 },
          { title: "练习：构建你的知识库", type: "project", duration: 30 },
        ]},
      ],
    },
    {
      title: "AI编程助手实战", slug: "ai-coding", subtitle: "用AI提升编程效率10倍",
      description: "学习使用GitHub Copilot、Cursor等AI编程工具，让AI成为你的编程搭档。",
      price: 0, isFree: true, level: "beginner", category: "tools", tags: ["编程", "Copilot", "Cursor"],
      featured: false, totalStudents: 8000, rating: 4.7, totalLessons: 8, totalDuration: 220,
      modules: [
        { title: "AI编程工具概览", lessons: [
          { title: "主流AI编程工具对比", type: "video", duration: 18 },
          { title: "GitHub Copilot快速上手", type: "hands-on", duration: 25 },
          { title: "Cursor IDE使用指南", type: "hands-on", duration: 28 },
        ]},
        { title: "实战技巧", lessons: [
          { title: "代码补全最佳实践", type: "hands-on", duration: 22 },
          { title: "代码审查与重构", type: "hands-on", duration: 25 },
          { title: "测试用例生成", type: "hands-on", duration: 22 },
          { title: "文档自动生成", type: "hands-on", duration: 20 },
          { title: "练习：AI驱动开发", type: "project", duration: 35 },
        ]},
      ],
    },
    {
      title: "AI绘图工具入门", slug: "ai-art", subtitle: "用AI创作你的第一幅画",
      description: "学习Midjourney、DALL-E等AI绘图工具，掌握AI绘画的基本技巧。",
      price: 5.9, isFree: false, level: "beginner", category: "tools", tags: ["AI绘画", "Midjourney", "DALL-E"],
      featured: false, totalStudents: 4500, rating: 4.6, totalLessons: 10, totalDuration: 260,
      modules: [
        { title: "AI绘图基础", lessons: [
          { title: "AI绘图技术概览", type: "video", duration: 15 },
          { title: "Midjourney快速上手", type: "hands-on", duration: 25 },
          { title: "DALL-E使用指南", type: "hands-on", duration: 22 },
        ]},
        { title: "提示词技巧", lessons: [
          { title: "绘图提示词结构", type: "video", duration: 18 },
          { title: "风格与参数控制", type: "hands-on", duration: 28 },
          { title: "负向提示词使用", type: "hands-on", duration: 22 },
        ]},
        { title: "进阶创作", lessons: [
          { title: "图生图技术", type: "hands-on", duration: 25 },
          { title: "一致性角色创作", type: "hands-on", duration: 28 },
          { title: "商业应用场景", type: "video", duration: 20 },
          { title: "练习：创作系列插画", type: "project", duration: 35 },
        ]},
      ],
    },

    // ===== 多模态AI =====
    {
      title: "多模态LLM应用开发", slug: "multimodal-llm", subtitle: "构建能看能听的AI应用",
      description: "学习GPT-4 Vision、Claude Vision等多模态LLM的使用，构建能处理图像、音频的AI应用。",
      price: 19.9, isFree: false, level: "advanced", category: "multimodal", tags: ["多模态", "Vision", "语音"],
      featured: false, totalStudents: 900, rating: 4.8, totalLessons: 14, totalDuration: 420,
      modules: [
        { title: "视觉能力", lessons: [
          { title: "多模态LLM架构", type: "video", duration: 22 },
          { title: "GPT-4 Vision实战", type: "coding", duration: 35 },
          { title: "Claude Vision集成", type: "coding", duration: 32 },
        ]},
        { title: "图像处理应用", lessons: [
          { title: "文档与票据处理", type: "coding", duration: 38 },
          { title: "图像描述与分析", type: "hands-on", duration: 30 },
          { title: "图表解读", type: "coding", duration: 35 },
        ]},
        { title: "语音集成", lessons: [
          { title: "Whisper语音转文字", type: "coding", duration: 32 },
          { title: "文字转语音集成", type: "hands-on", duration: 28 },
          { title: "实时语音应用", type: "coding", duration: 35 },
        ]},
        { title: "项目实战", lessons: [
          { title: "项目：AI视觉助手", type: "project", duration: 60 },
        ]},
      ],
    },

    // ===== AI基础 =====
    {
      title: "人工智能基础概念", slug: "ai-basics", subtitle: "零基础了解AI",
      description: "零基础了解人工智能的核心概念、发展历程和应用领域，为深入学习AI打下基础。",
      price: 0, isFree: true, level: "beginner", category: "basics", tags: ["AI", "入门", "基础"],
      featured: true, totalStudents: 15000, rating: 4.5, totalLessons: 8, totalDuration: 200,
      modules: [
        { title: "AI概述", lessons: [
          { title: "什么是人工智能", type: "video", duration: 15 },
          { title: "AI的发展历程", type: "video", duration: 18 },
          { title: "AI的应用领域", type: "video", duration: 20 },
        ]},
        { title: "核心技术", lessons: [
          { title: "机器学习基础", type: "video", duration: 22 },
          { title: "深度学习入门", type: "video", duration: 20 },
          { title: "大语言模型简介", type: "video", duration: 18 },
          { title: "练习：AI工具体验", type: "hands-on", duration: 30 },
          { title: "概念测验", type: "quiz", duration: 10 },
        ]},
      ],
    },
  ];

  // Create courses with modules and lessons
  let courseIndex = 0;
  for (const courseData of coursesData) {
    courseIndex++;
    const categoryId = catMap[courseData.category];

    const totalLessons = courseData.modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const totalDuration = courseData.modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + l.duration, 0), 0);

    const course = await prisma.course.create({
      data: {
        title: courseData.title,
        slug: courseData.slug,
        subtitle: courseData.subtitle,
        description: courseData.description,
        price: courseData.price,
        isFree: courseData.isFree,
        level: courseData.level,
        status: "published",
        featured: courseData.featured || false,
        categoryId,
        tags: JSON.stringify(courseData.tags),
        totalLessons,
        totalStudents: courseData.totalStudents,
        totalDuration,
        rating: courseData.rating,
        ratingCount: Math.floor(courseData.totalStudents * 0.15),
        sortOrder: courseIndex,
      },
    });

    // Create modules
    for (let mi = 0; mi < courseData.modules.length; mi++) {
      const modData = courseData.modules[mi];
      const module = await prisma.module.create({
        data: {
          title: modData.title,
          courseId: course.id,
          sortOrder: mi + 1,
          isFree: mi === 0,
        },
      });

      // Create lessons
      for (let li = 0; li < modData.lessons.length; li++) {
        const lessonData = modData.lessons[li];
        await prisma.lesson.create({
          data: {
            title: lessonData.title,
            slug: `lesson-${mi + 1}-${li + 1}`,
            moduleId: module.id,
            type: lessonData.type,
            duration: lessonData.duration,
            sortOrder: li + 1,
            isFree: mi === 0 && li < 2,
            content: generateLessonContent(lessonData.title, lessonData.type),
          },
        });
      }
    }

    console.log(`  ✅ ${courseData.title}`);
  }

  // Create achievements
  const achievements = [
    { name: "初学者", description: "完成第一门课程", icon: "🎯", condition: JSON.stringify({ type: "courses_completed", count: 1 }), expReward: 100 },
    { name: "学习达人", description: "完成5门课程", icon: "📚", condition: JSON.stringify({ type: "courses_completed", count: 5 }), expReward: 500 },
    { name: "AI专家", description: "完成10门课程", icon: "🏆", condition: JSON.stringify({ type: "courses_completed", count: 10 }), expReward: 1000 },
    { name: "连续学习7天", description: "连续7天学习打卡", icon: "🔥", condition: JSON.stringify({ type: "streak", count: 7 }), expReward: 200 },
    { name: "连续学习30天", description: "连续30天学习打卡", icon: "💎", condition: JSON.stringify({ type: "streak", count: 30 }), expReward: 1000 },
    { name: "考试达人", description: "通过5次考试", icon: "🏅", condition: JSON.stringify({ type: "exams_passed", count: 5 }), expReward: 800 },
  ];

  for (const a of achievements) {
    await prisma.achievement.create({ data: a });
  }

  // Create exams
  const examData = [
    { title: "LLM基础认证考试", description: "测试你对大语言模型基础知识的掌握", slug: "llm-basics", passScore: 60, timeLimit: 30, isPaid: false, price: 0, totalQuestions: 20 },
    { title: "Prompt Engineering 认证", description: "验证你的提示词工程能力", slug: "prompt-mastery", passScore: 70, timeLimit: 45, isPaid: true, price: 9.9, totalQuestions: 30 },
    { title: "RAG系统专家认证", description: "证明你具备构建RAG系统的能力", slug: "rag-enterprise", passScore: 70, timeLimit: 45, isPaid: true, price: 15.9, totalQuestions: 30 },
    { title: "AI Agent开发认证", description: "验证你的AI Agent开发能力", slug: "langgraph", passScore: 70, timeLimit: 45, isPaid: true, price: 15.9, totalQuestions: 25 },
  ];

  for (const exam of examData) {
    const course = await prisma.course.findUnique({ where: { slug: exam.slug } });
    if (course) {
      await prisma.exam.create({
        data: {
          title: exam.title,
          description: exam.description,
          courseId: course.id,
          passScore: exam.passScore,
          timeLimit: exam.timeLimit,
          isPaid: exam.isPaid,
          price: exam.price,
          totalQuestions: exam.totalQuestions,
          status: "active",
        },
      });
    }
  }

  // Create blog posts
  const blogPosts = [
    { title: "2024年AI学习路线图", slug: "ai-learning-roadmap-2024", excerpt: "最全面的AI学习路径指南", content: "# 2024年AI学习路线图\n\n人工智能正在快速发展...", category: "学习指南", status: "published", publishedAt: new Date() },
    { title: "RAG技术深度解析", slug: "rag-deep-dive", excerpt: "深入理解RAG的工作原理", content: "# RAG技术深度解析\n\nRAG是当前最热门的AI技术之一...", category: "技术深度", status: "published", publishedAt: new Date() },
    { title: "AI Agent：下一代AI应用", slug: "ai-agent-future", excerpt: "探索AI Agent的无限可能", content: "# AI Agent：下一代AI应用\n\nAI Agent正在改变我们与AI交互的方式...", category: "行业趋势", status: "published", publishedAt: new Date() },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

  console.log(`\nDatabase seeded successfully!`);
  console.log(`Total courses: ${coursesData.length}`);
  console.log(`Admin user created: admin@aiacademy.com (credentials set via seed)`);
  console.log(`Test user created: user@aiacademy.com (credentials set via seed)`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
