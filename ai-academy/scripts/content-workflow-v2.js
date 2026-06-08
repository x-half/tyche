// Workflow script for parallel content generation
// NOTE: No Node.js APIs available in workflow context - use agents for everything

export const meta = {
  name: 'generate-lesson-content-v2',
  description: 'Generate real educational content for all 300 lessons using parallel agents',
  phases: [
    { title: 'Generate', detail: 'Parallel agents generate content for course batches' },
    { title: 'Apply', detail: 'Update database with generated content' },
  ],
}

// Course data extracted from database
const courseData = [
  // Batch 1
  {name: "AI Agent 基础概念", lessons: [
    {id: "lag-agent-1", title: "Agent的组成要素", type: "text"},
    {id: "lag-agent-2", title: "概念测验", type: "quiz"},
    {id: "lag-agent-3", title: "构建你的第一个Agent", type: "coding"},
    {id: "lag-agent-4", title: "工具调用基础", type: "text"},
    {id: "lag-agent-5", title: "Agent记忆系统", type: "text"},
    {id: "lag-agent-6", title: "练习：简单任务Agent", type: "hands-on"}
  ]},
  {name: "AI安全基础", lessons: [
    {id: "lag-safety-1", title: "AI安全的重要性", type: "text"},
    {id: "lag-safety-2", title: "常见安全威胁", type: "text"},
    {id: "lag-safety-3", title: "安全事件案例分析", type: "text"},
    {id: "lag-safety-4", title: "提示词注入防护", type: "coding"},
    {id: "lag-safety-5", title: "数据隐私保护", type: "text"},
    {id: "lag-safety-6", title: "内容安全过滤", type: "text"},
    {id: "lag-safety-7", title: "练习：安全审计", type: "hands-on"}
  ]},
  {name: "AI红队测试", lessons: [
    {id: "lag-redteam-1", title: "AI红队测试方法论", type: "text"},
    {id: "lag-redteam-2", title: "攻击面分析", type: "text"},
    {id: "lag-redteam-3", title: "自动化测试工具", type: "coding"},
    {id: "lag-redteam-4", title: "越狱攻击技术", type: "text"},
    {id: "lag-redteam-5", title: "数据投毒攻击", type: "text"},
    {id: "lag-redteam-6", title: "模型逆向攻击", type: "text"},
    {id: "lag-redteam-7", title: "防御策略设计", type: "text"},
    {id: "lag-redteam-8", title: "安全监控系统", type: "coding"},
    {id: "lag-redteam-9", title: "应急响应流程", type: "text"},
    {id: "lag-redteam-10", title: "项目：AI系统安全评估", type: "project"}
  ]},
  {name: "AI绘图工具入门", lessons: [
    {id: "lag-draw-1", title: "AI绘图技术概览", type: "text"},
    {id: "lag-draw-2", title: "Midjourney快速上手", type: "text"},
    {id: "lag-draw-3", title: "DALL-E使用指南", type: "text"},
    {id: "lag-draw-4", title: "绘图提示词结构", type: "text"},
    {id: "lag-draw-5", title: "风格与参数控制", type: "text"},
    {id: "lag-draw-6", title: "负向提示词使用", type: "text"},
    {id: "lag-draw-7", title: "图生图技术", type: "text"},
    {id: "lag-draw-8", title: "一致性角色创作", type: "text"},
    {id: "lag-draw-9", title: "商业应用场景", type: "text"},
    {id: "lag-draw-10", title: "练习：创作系列插画", type: "hands-on"}
  ]}
];

log(`Starting content generation for 300 lessons across 33 courses`);
log(`Processing in parallel batches...`);

// Phase 1: Generate content in parallel
phase('Generate');

// We'll process 8 batches of ~4 courses each
// Each agent generates content and writes to a JSON file
const batch1 = await agent(
  `You are generating educational content for an AI learning platform. Generate high-quality, real educational content in Chinese for the following lessons.

For each lesson, write 400-600 words of real educational content that:
- Explains concepts clearly with examples
- Includes code snippets (Python/JavaScript) where relevant
- Uses markdown tables for comparisons
- Has practical tips and best practices
- Is structured with clear headings (##, ###)
- Is written in Chinese

Courses and lessons:
📚 AI Agent 基础概念:
  - Agent的组成要素: Explain what makes up an AI Agent (LLM brain, tools, memory, planning)
  - 概念测验: Quiz questions about Agent concepts
  - 构建你的第一个Agent: Step-by-step guide to build a simple Agent
  - 工具调用基础: How Agents use tools (API calls, code execution)
  - Agent记忆系统: Short-term and long-term memory in Agents
  - 练习：简单任务Agent: Hands-on exercise to build a task Agent

📚 AI安全基础:
  - AI安全的重要性: Why AI safety matters, risks and impacts
  - 常见安全威胁: Prompt injection, jailbreaking, data poisoning
  - 安全事件案例分析: Real-world AI security incidents
  - 提示词注入防护: Techniques to prevent prompt injection
  - 数据隐私保护: Privacy protection in AI systems
  - 内容安全过滤: Content moderation and safety filters
  - 练习：安全审计: Hands-on security audit exercise

📚 AI红队测试:
  - AI红队测试方法论: Red teaming methodology for AI
  - 攻击面分析: Attack surface analysis
  - 自动化测试工具: Automated testing tools
  - 越狱攻击技术: Jailbreak techniques
  - 数据投毒攻击: Data poisoning attacks
  - 模型逆向攻击: Model inversion attacks
  - 防御策略设计: Defense strategy design
  - 安全监控系统: Security monitoring systems
  - 应急响应流程: Incident response procedures
  - 项目：AI系统安全评估: Project - AI system security assessment

📚 AI绘图工具入门:
  - AI绘图技术概览: Overview of AI image generation
  - Midjourney快速上手: Getting started with Midjourney
  - DALL-E使用指南: DALL-E usage guide
  - 绘图提示词结构: Image prompt structure
  - 风格与参数控制: Style and parameter control
  - 负向提示词使用: Negative prompts usage
  - 图生图技术: Image-to-image techniques
  - 一致性角色创作: Consistent character creation
  - 商业应用场景: Commercial applications
  - 练习：创作系列插画: Exercise - create a series of illustrations

Output a JSON array where each element has: {id, title, content}
Write the JSON array to: scripts/generated-content/batch-1.json

IMPORTANT: Each lesson's content must be REAL educational material with actual code examples, explanations, and practical knowledge. NOT template text.`,
  { label: 'batch-1', phase: 'Generate' }
);

const batch2 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson should be 400-600 words with real examples, code snippets, tables, and practical tips.

📚 AI编程助手实战:
  - GitHub Copilot快速上手: Getting started with Copilot, setup, basic usage
  - Cursor IDE使用指南: Cursor IDE features, AI integration
  - 代码补全最佳实践: Best practices for AI code completion
  - 代码审查与重构: AI-assisted code review and refactoring
  - 测试用例生成: Generating tests with AI
  - 文档自动生成: Auto-generating documentation
  - 练习：AI驱动开发: Exercise - AI-driven development workflow

📚 ChatGPT高效使用指南:
  - 基础对话技巧: Basic conversation techniques
  - 常见使用场景: Common use cases (writing, coding, analysis)
  - GPTs自定义助手: Creating custom GPTs
  - 联网搜索与代码解释器: Web browsing and code interpreter
  - 多模态功能使用: Using vision, voice features
  - 效率提升10倍的技巧: 10x productivity tips
  - 练习：构建你的工作流: Exercise - build your workflow

📚 Claude使用技巧大全:
  - Claude能力概览: Claude's capabilities overview
  - 与ChatGPT的差异: Differences from ChatGPT
  - 基础使用场景: Basic usage scenarios
  - 超长文档处理: Processing long documents
  - 代码分析与生成: Code analysis and generation
  - Artifacts功能详解: Artifacts feature deep dive
  - Projects项目管理: Projects feature
  - 练习：构建你的知识库: Exercise - build your knowledge base

📚 CrewAI 多Agent系统:
  - CrewAI架构与设计哲学: Architecture and design philosophy
  - Agent角色定义: Defining agent roles
  - 任务分配与编排: Task assignment and orchestration
  - 层级化管理结构: Hierarchical management
  - 顺序与并行执行: Sequential and parallel execution
  - 自定义工具集成: Custom tool integration
  - 内容创作团队: Content creation team
  - 代码开发团队: Code development team
  - 项目：自动化营销团队: Project - automated marketing team

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-2.json`,
  { label: 'batch-2', phase: 'Generate' }
);

const batch3 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson 400-600 words with code examples, tables, practical tips.

📚 Function Calling 工具调用精通:
  - Function Calling原理: How function calling works in LLMs
  - OpenAI Function Calling: OpenAI's function calling API
  - Claude Tool Use: Claude's tool use feature
  - Gemini Function Declarations: Gemini's function calling
  - Schema设计与验证: Schema design and validation
  - 多步骤工具链: Multi-step tool chains
  - 并行与串行执行: Parallel and sequential execution
  - 数据库查询工具: Database query tools
  - Web搜索与爬虫工具: Web search and scraping tools
  - 代码执行工具: Code execution tools
  - 构建研究助手Agent: Build a research assistant agent

📚 GraphRAG与知识图谱:
  - 知识图谱概念与架构: Knowledge graph concepts and architecture
  - Neo4j图数据库入门: Getting started with Neo4j
  - 实体关系抽取: Entity and relation extraction
  - GraphRAG原理详解: GraphRAG principles
  - 图索引构建: Graph index construction
  - 图检索策略: Graph retrieval strategies
  - 社区检测与摘要: Community detection and summarization
  - 多跳推理: Multi-hop reasoning
  - 图谱可视化: Graph visualization
  - 项目：智能问答知识图谱: Project - QA knowledge graph

📚 LLM API 多平台精通:
  - Chat Completions高级用法: Advanced Chat Completions usage
  - Function Calling实战: Function Calling in practice
  - Vision API多模态处理: Vision API multimodal processing
  - Assistants API详解: Assistants API deep dive
  - 超长上下文处理: Long context handling
  - Tool Use高级用法: Advanced Tool Use
  - Gemini API全面解析: Gemini API comprehensive guide
  - 多模态能力实战: Multimodal capabilities in practice
  - Google Cloud集成: Google Cloud integration
  - 智能路由与降级策略: Smart routing and fallback
  - 成本优化与监控: Cost optimization and monitoring
  - 项目：构建多LLM应用: Project - multi-LLM application

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-3.json`,
  { label: 'batch-3', phase: 'Generate' }
);

const batch4 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson 400-600 words with code examples, tables, practical tips.

📚 LLMOps入门:
  - 什么是LLMOps: What is LLMOps, definition and scope
  - LLMOps vs MLOps: Key differences and similarities
  - 工具链概览: Tool chain overview (LangSmith, Helicone, etc.)
  - 模型服务化基础: Model serving basics
  - Docker容器化: Docker containerization for AI
  - 基础监控搭建: Basic monitoring setup
  - 练习：部署你的第一个AI服务: Exercise - deploy your first AI service

📚 LLM应用开发入门:
  - 概念测验: Quiz on LLM concepts
  - 获取API密钥与环境配置: Getting API keys and setup
  - 流式输出实现: Implementing streaming output
  - 错误处理与重试策略: Error handling and retry strategies
  - 聊天机器人实战: Building a chatbot
  - 文本生成应用: Text generation applications
  - 课程项目: Course project

📚 LLM应用架构设计:
  - AI应用架构模式: AI application architecture patterns
  - 服务拆分与边界: Service decomposition and boundaries
  - 数据流与状态管理: Data flow and state management
  - LLM服务边界设计: LLM service boundary design
  - API网关与负载均衡: API gateway and load balancing
  - 服务通信模式: Service communication patterns
  - 消息队列集成: Message queue integration
  - 流处理与实时更新: Stream processing and real-time updates
  - 批处理与定时任务: Batch processing and scheduled tasks
  - 容器化与编排: Containerization and orchestration
  - 监控与可观测性: Monitoring and observability
  - 项目：企业AI平台设计: Project - enterprise AI platform

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-4.json`,
  { label: 'batch-4', phase: 'Generate' }
);

const batch5 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson 400-600 words with code examples, tables, practical tips.

📚 LangGraph 工作流开发:
  - 状态图与节点设计: State graphs and node design
  - 条件路由与分支: Conditional routing and branching
  - 循环与递归模式: Loops and recursion patterns
  - 人机协作流程: Human-in-the-loop workflows
  - 错误处理与恢复: Error handling and recovery
  - 研究助手工作流: Research assistant workflow
  - 代码审查Agent: Code review agent
  - 多步骤数据分析: Multi-step data analysis
  - 项目：自动化研究Agent: Project - automated research agent

📚 LoRA/QLoRA 微调实战:
  - 低秩分解原理: Low-rank decomposition原理
  - LoRA配置与超参数: LoRA configuration and hyperparameters
  - QLoRA量化训练: QLoRA quantized training
  - 训练数据格式与质量: Training data format and quality
  - 数据清洗与增强: Data cleaning and augmentation
  - 训练过程监控: Training process monitoring
  - 自动评估指标: Automatic evaluation metrics
  - 人工评估方法: Human evaluation methods
  - 模型合并与导出: Model merging and export
  - 项目：微调领域专属模型: Project - fine-tune domain-specific model

📚 NLP基础入门:
  - 什么是自然语言处理: What is NLP
  - 文本预处理技术: Text preprocessing techniques
  - 词向量与Word2Vec: Word embeddings and Word2Vec
  - 文本分类概述: Text classification overview
  - 情感分析入门: Sentiment analysis basics
  - 命名实体识别: Named entity recognition
  - 练习：文本处理基础: Exercise - text processing basics
  - 迁移学习实战: Transfer learning in practice

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-5.json`,
  { label: 'batch-5', phase: 'Generate' }
);

const batch6 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson 400-600 words with code examples, tables, practical tips.

📚 Prompt Engineering 快速入门:
  - LLM如何理解提示词: How LLMs understand prompts
  - 基础提示词模板: Basic prompt templates
  - 练习：优化你的第一个提示词: Exercise - optimize your first prompt
  - Few-Shot学习技巧: Few-shot learning techniques
  - 输出格式控制: Output format control
  - 练习：构建提示词库: Exercise - build prompt library

📚 Prompt Engineering 精通指南:
  - Chain-of-Thought提示: Chain-of-Thought prompting
  - Tree-of-Thought方法: Tree-of-Thought method
  - 自洽性与集成方法: Self-consistency and ensemble
  - Meta-Prompting技术: Meta-Prompting techniques
  - 代码生成提示词: Code generation prompts
  - 数据分析提示词: Data analysis prompts
  - 创意写作提示词: Creative writing prompts
  - 商业沟通提示词: Business communication prompts
  - 构建提示词模板库: Building prompt template library
  - A/B测试与性能指标: A/B testing and metrics
  - 版本控制与协作: Version control and collaboration
  - 项目：企业级提示词系统: Project - enterprise prompt system

📚 RAG基础入门:
  - RAG的典型应用场景: Typical RAG use cases
  - RAG vs 微调：如何选择: RAG vs fine-tuning: how to choose
  - RAG系统架构全景图: RAG system architecture overview
  - 文档加载与格式解析: Document loading and parsing
  - 文本分块策略详解: Text chunking strategies
  - 构建文档向量化管道: Building document vectorization pipeline
  - 向量检索原理与相似度计算: Vector retrieval and similarity
  - 混合检索策略实践: Hybrid retrieval practice
  - 构建第一个RAG问答系统: Build your first RAG QA system

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-6.json`,
  { label: 'batch-6', phase: 'Generate' }
);

const batch7 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson 400-600 words with code examples, tables, practical tips.

📚 RLHF与人类对齐:
  - AI对齐问题概述: AI alignment problem overview
  - RLHF原理详解: RLHF principles deep dive
  - 奖励模型训练: Reward model training
  - DPO直接偏好优化: DPO direct preference optimization
  - ORPO与其他方法: ORPO and other methods
  - 偏好数据构建: Preference data construction
  - 安全评估方法: Safety evaluation methods
  - 红队测试基础: Red teaming basics
  - 持续改进流程: Continuous improvement process
  - 项目：对齐你的模型: Project - align your model

📚 Structured Output 结构化输出:
  - JSON Mode vs Structured Output: Comparison
  - Schema设计最佳实践: Schema design best practices
  - 多平台实现对比: Multi-platform implementation comparison
  - 文档信息提取: Document information extraction
  - 表格与列表提取: Table and list extraction
  - 多文档聚合处理: Multi-document aggregation
  - 验证与错误处理: Validation and error handling
  - 重试策略与降级: Retry strategies and fallback
  - 项目：文档处理流水线: Project - document processing pipeline

📚 YOLO目标检测实战:
  - YOLO算法演进史: YOLO algorithm evolution
  - YOLOv8环境搭建: YOLOv8 environment setup
  - 预训练模型推理: Pre-trained model inference
  - 数据集标注与准备: Dataset annotation and preparation
  - 模型训练与调优: Model training and tuning
  - 数据增强策略: Data augmentation strategies
  - 模型导出与优化: Model export and optimization
  - 边缘设备部署: Edge device deployment
  - 实时视频处理: Real-time video processing
  - 项目：智能监控系统: Project - smart surveillance system

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-7.json`,
  { label: 'batch-7', phase: 'Generate' }
);

const batch8 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson 400-600 words with code examples, tables, practical tips.

📚 人工智能基础概念:
  - 机器学习基础: Machine learning basics
  - 深度学习入门: Deep learning introduction
  - 大语言模型简介: LLM introduction
  - 练习：AI工具体验: Exercise - AI tools experience
  - 概念测验: Concept quiz

📚 企业级RAG实战:
  - 多模态文档解析: Multimodal document parsing
  - 智能分块策略: Smart chunking strategies
  - 元数据提取与增强: Metadata extraction and enhancement
  - 混合检索与重排序: Hybrid retrieval and reranking
  - 多查询分解策略: Multi-query decomposition
  - 上下文压缩与过滤: Context compression and filtering
  - 幻觉检测与防护: Hallucination detection and prevention
  - 来源归属与引用: Source attribution and citation
  - 评估指标与基准: Evaluation metrics and benchmarks
  - 性能优化与缓存: Performance optimization and caching
  - 监控与质量保障: Monitoring and quality assurance
  - 项目：企业知识库: Project - enterprise knowledge base

📚 向量数据库深度指南:
  - 主流向量数据库对比: Vector DB comparison (Pinecone, Weaviate, Milvus, Chroma)
  - Chroma快速上手: Getting started with Chroma
  - Pinecone云端向量库: Pinecone cloud vector DB
  - Milvus分布式方案: Milvus distributed solution
  - 索引优化与调参: Index optimization and tuning
  - 增量更新与同步: Incremental updates and sync
  - 多租户架构: Multi-tenant architecture
  - 成本优化策略: Cost optimization strategies
  - 项目：多源知识检索系统: Project - multi-source knowledge retrieval

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-8.json`,
  { label: 'batch-8', phase: 'Generate' }
);

const batch9 = await agent(
  `Generate high-quality educational content in Chinese for these AI lessons. Each lesson 400-600 words with code examples, tables, practical tips.

📚 图像生成与Stable Diffusion:
  - 扩散模型原理: Diffusion model principles
  - Stable Diffusion架构: Stable Diffusion architecture
  - 环境搭建与推理: Setup and inference
  - 提示词工程技巧: Prompt engineering techniques
  - ControlNet精确控制: ControlNet precise control
  - LoRA风格定制: LoRA style customization
  - 图生图与修复: Image-to-image and inpainting
  - 超分辨率放大: Super-resolution upscaling
  - ComfyUI工作流: ComfyUI workflows
  - 项目：AI艺术创作平台: Project - AI art creation platform

📚 多模态LLM应用开发:
  - 多模态LLM架构: Multimodal LLM architecture
  - GPT-4 Vision实战: GPT-4 Vision in practice
  - Claude Vision集成: Claude Vision integration
  - 文档与票据处理: Document and receipt processing
  - 图像描述与分析: Image description and analysis
  - 图表解读: Chart interpretation
  - Whisper语音转文字: Whisper speech-to-text
  - 文字转语音集成: Text-to-speech integration
  - 实时语音应用: Real-time voice applications
  - 项目：AI视觉助手: Project - AI vision assistant

📚 文本分类与情感分析:
  - 特征工程与TF-IDF: Feature engineering and TF-IDF
  - 机器学习分类器: ML classifiers (SVM, Random Forest, etc.)
  - 模型评估指标: Model evaluation metrics
  - BERT微调实战: BERT fine-tuning in practice
  - 多标签分类: Multi-label classification
  - 少样本学习: Few-shot learning
  - 实时情感分析系统: Real-time sentiment analysis
  - 多语言支持: Multi-language support
  - 模型压缩与加速: Model compression and acceleration
  - 项目：舆情分析系统: Project - public opinion analysis

📚 模型微调入门指南:
  - 微调 vs RAG vs Prompt Engineering: Comparison
  - 何时需要微调: When to fine-tune
  - 概念测验: Concept quiz
  - 全量微调 vs 参数高效微调: Full vs PEFT
  - 数据准备基础: Data preparation basics
  - 练习：微调你的第一个模型: Exercise - fine-tune your first model

📚 模型服务与推理优化:
  - 推理性能指标: Inference performance metrics
  - vLLM高性能推理: vLLM high-performance inference
  - 量化技术实战: Quantization techniques
  - TensorRT加速: TensorRT acceleration
  - ONNX模型转换: ONNX model conversion
  - 批处理优化: Batch processing optimization
  - 负载均衡策略: Load balancing strategies
  - 自动扩缩容: Auto-scaling
  - A/B测试部署: A/B testing deployment
  - 项目：高性能推理服务: Project - high-performance inference service

📚 聊天机器人开发实战:
  - 对话AI设计原则: Conversational AI design principles
  - 状态管理与对话流: State management and dialog flow
  - 构建第一个聊天机器人: Build your first chatbot
  - 短期对话记忆: Short-term conversation memory
  - 长期用户记忆: Long-term user memory
  - RAG集成知识检索: RAG integrated knowledge retrieval
  - 个性化与语气定制: Personalization and tone customization
  - 多轮复杂对话: Multi-turn complex conversations
  - 错误处理与恢复: Error handling and recovery
  - 多渠道部署: Multi-channel deployment
  - 监控与日志: Monitoring and logging
  - 项目：客服聊天机器人: Project - customer service chatbot

📚 计算机视觉基础入门:
  - 什么是计算机视觉: What is computer vision
  - 数字图像基础: Digital image basics
  - OpenCV快速上手: Getting started with OpenCV
  - 图像分类入门: Image classification basics
  - 目标检测概述: Object detection overview
  - 图像分割简介: Image segmentation intro
  - 练习：图像处理基础: Exercise - image processing basics
  - CNN卷积神经网络: CNN convolutional neural networks
  - 经典模型架构: Classic model architectures (ResNet, VGG)
  - 迁移学习实战: Transfer learning in practice

Output JSON array: [{id, title, content}] to scripts/generated-content/batch-9.json`,
  { label: 'batch-9', phase: 'Generate' }
);

log(`Generated content for 9 batches`);

// Phase 2: Apply to database
phase('Apply');

const applyResult = await agent(
  `Read all JSON files from scripts/generated-content/ (batch-1.json through batch-9.json).

For each file, read the JSON array of {id, title, content} objects.

Then run this Node.js script to update the database:

\`\`\`javascript
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function main() {
  const files = fs.readdirSync('scripts/generated-content').filter(f => f.startsWith('batch-') && f.endsWith('.json'));

  let success = 0;
  let failed = 0;

  for (const file of files) {
    const lessons = JSON.parse(fs.readFileSync('scripts/generated-content/' + file, 'utf8'));
    for (const lesson of lessons) {
      try {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { content: lesson.content }
        });
        console.log('✅', lesson.title);
        success++;
      } catch (error) {
        console.error('❌', lesson.title, error.message);
        failed++;
      }
    }
  }

  console.log('\\n=== 完成 ===');
  console.log('成功:', success, '失败:', failed);
}

main().catch(console.error).finally(() => prisma.$disconnect());
\`\`\`

Save this as scripts/apply-content.js and run it.`,
  { label: 'apply-to-db', phase: 'Apply' }
);

log('Content generation complete!');
return { batches: 9, totalLessons: 300 };
