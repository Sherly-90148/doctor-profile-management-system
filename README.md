# 医生档案管理系统

一个基于 Node.js + React + MongoDB 的医生档案管理系统，支持医生信息的增删改查、数据导出和统计分析功能。

## 系统要求

- Node.js (v14.0.0 或更高版本)
- npm (v6.0.0 或更高版本)
- MongoDB (v4.0.0 或更高版本)

## 快速开始

1. 克隆项目到本地：
```bash
git clone [项目地址]
cd [项目目录]
```

2. 运行部署脚本：
```bash
chmod +x deploy.sh
./deploy.sh
```

3. 启动系统：
```bash
./start.sh
```

4. 访问系统：
- 管理端：http://localhost:3000
- 用户端：http://localhost:3000/user

## 系统功能

### 管理端功能
- 医生信息管理（增删改查）
- 数据导出（Excel格式）
- 数据统计与可视化
- 用户管理

### 用户端功能
- 查看医生信息
- 搜索和筛选
- 查看统计数据

## 技术栈

- 后端：Node.js + Express + MongoDB
- 前端：React + Ant Design + ECharts
- 数据导出：xlsx
- 数据可视化：ECharts

## 目录结构

```
.
├── frontend/          # 前端代码
├── src/              # 后端代码
├── deploy.sh         # 部署脚本
├── start.sh          # 启动脚本
└── README.md         # 项目说明
```

## 注意事项

1. 首次运行前请确保已安装所有必要的依赖
2. 默认使用本地 MongoDB 数据库
3. 如需修改配置，请编辑 .env 文件

## 常见问题

1. 如果遇到端口占用问题，可以在 .env 文件中修改端口号
2. 如果数据库连接失败，请确保 MongoDB 服务已启动
3. 如果前端依赖安装失败，可以尝试清除 npm 缓存后重新安装

## 联系方式

如有问题，请联系系统管理员。 