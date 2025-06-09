#!/bin/bash

# 设置颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${YELLOW}开始部署医生档案管理系统...${NC}"

# 检查是否安装了必要的工具
command -v node >/dev/null 2>&1 || { echo -e "${RED}需要安装 Node.js${NC}"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo -e "${RED}需要安装 npm${NC}"; exit 1; }

# 创建环境变量文件
echo -e "${YELLOW}创建环境变量文件...${NC}"
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doctor-management
JWT_SECRET=your-secret-key-here
EOL

# 安装后端依赖
echo -e "${YELLOW}安装后端依赖...${NC}"
npm install

# 安装前端依赖
echo -e "${YELLOW}安装前端依赖...${NC}"
cd frontend
npm install
cd ..

# 创建启动脚本
echo -e "${YELLOW}创建启动脚本...${NC}"
cat > start.sh << EOL
#!/bin/bash

# 启动后端服务
echo "启动后端服务..."
npm run dev &

# 启动前端服务
echo "启动前端服务..."
cd frontend
npm start
EOL

# 设置执行权限
chmod +x start.sh

echo -e "${GREEN}部署完成！${NC}"
echo -e "${YELLOW}使用以下命令启动系统：${NC}"
echo -e "${GREEN}./start.sh${NC}" 