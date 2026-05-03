import { ResumeContent } from "@/types/resume"
import { v4 as uuidv4 } from "uuid"

export const defaultResumeContent: ResumeContent = {
  personalInfo: {
    name: "张三",
    title: "高级前端工程师",
    email: "zhangsan@example.com",
    phone: "138-0000-0000",
    location: "北京市",
    website: "https://zhangsan.dev",
    linkedin: "linkedin.com/in/zhangsan",
    github: "github.com/zhangsan",
    summary:
      "5年前端开发经验，精通React、Vue、TypeScript等现代前端技术。曾主导多个大型Web应用的开发，具备优秀的团队协作能力和问题解决能力。",
  },
  workExperience: [
    {
      id: uuidv4(),
      company: "科技有限公司",
      position: "高级前端工程师",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description: "负责公司核心产品的前端架构设计和开发",
      achievements: [
        "主导前端微服务架构改造，提升开发效率40%",
        "优化首屏加载时间，从3.2秒降至1.5秒",
        "建立前端组件库，被3个项目团队采用",
      ],
    },
    {
      id: uuidv4(),
      company: "互联网公司",
      position: "前端工程师",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description: "参与电商平台的前端开发和维护",
      achievements: [
        "负责商品详情页重构，转化率提升15%",
        "实现前端自动化测试，代码覆盖率达到85%",
      ],
    },
  ],
  education: [
    {
      id: uuidv4(),
      school: "北京大学",
      degree: "本科",
      field: "计算机科学与技术",
      startDate: "2016-09",
      endDate: "2020-06",
      gpa: "3.8/4.0",
      achievements: ["校级优秀毕业生", "ACM竞赛银奖"],
    },
  ],
  skills: [
    { id: uuidv4(), name: "React", level: 5, category: "前端框架" },
    { id: uuidv4(), name: "Vue", level: 4, category: "前端框架" },
    { id: uuidv4(), name: "TypeScript", level: 5, category: "编程语言" },
    { id: uuidv4(), name: "JavaScript", level: 5, category: "编程语言" },
    { id: uuidv4(), name: "Node.js", level: 4, category: "后端技术" },
    { id: uuidv4(), name: "HTML/CSS", level: 5, category: "前端基础" },
    { id: uuidv4(), name: "Webpack", level: 4, category: "构建工具" },
    { id: uuidv4(), name: "Git", level: 5, category: "开发工具" },
  ],
  projects: [
    {
      id: uuidv4(),
      name: "企业级管理后台",
      description: "基于React + TypeScript的中后台管理系统",
      technologies: ["React", "TypeScript", "Ant Design", "Redux"],
      achievements: ["支持50+页面，服务1000+企业用户", "实现细粒度权限控制，保障数据安全"],
    },
    {
      id: uuidv4(),
      name: "跨平台移动应用",
      description: "使用React Native开发的电商App",
      technologies: ["React Native", "Redux", "GraphQL"],
      github: "github.com/zhangsan/mobile-app",
      achievements: ["同时支持iOS和Android平台", "用户量突破10万"],
    },
  ],
  languages: [
    { name: "中文", level: "母语" },
    { name: "英语", level: "流利" },
  ],
  certifications: [
    { name: "AWS认证开发者", issuer: "Amazon", date: "2023-05" },
  ],
}

export function createEmptyResumeContent(): ResumeContent {
  return {
    personalInfo: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      summary: "",
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    interests: [],
  }
}