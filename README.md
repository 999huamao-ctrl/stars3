# StarS3 - 流量转化平台

## 功能特性

### 流量承接
- 高性能落地页（LCP < 2.5s）
- 自定义短链接
- 智能跳转（带倒计时）
- UTM 参数自动传递

### 工作台
- 数据看板（实时统计）
- 链接管理（CRUD）
- 流量分析（来源追踪）
- 转化漏斗

### 数据分析
- 点击追踪
- 转化统计
- 地理位置分析
- 设备/浏览器分析

## 技术栈

- Next.js 14 + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- Vercel 部署

## 快速开始

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 数据库迁移
npx prisma migrate dev

# 开发
npm run dev

# 部署
vercel --prod
```

## 项目结构

```
src/
├── app/
│   ├── [slug]/          # 动态落地页
│   ├── admin/           # 工作台
│   └── api/             # API 路由
├── lib/                 # 工具函数
└── components/          # UI 组件
```
