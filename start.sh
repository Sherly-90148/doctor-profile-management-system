#!/bin/bash

# 启动后端服务
echo "启动后端服务..."
npm run dev &

# 启动前端服务
echo "启动前端服务..."
cd frontend
npm start
