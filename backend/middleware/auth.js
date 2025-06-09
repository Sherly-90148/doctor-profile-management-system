const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 验证 JWT token
exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: '请先登录' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: '用户不存在' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: '账户已被禁用' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('认证错误:', error);
    res.status(401).json({ message: '认证失败' });
  }
};

// 检查管理员权限
exports.admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: '需要管理员权限' });
  }
  next();
};

// 检查用户权限
exports.user = (req, res, next) => {
  if (req.user.role !== 'user' && req.user.role !== 'admin') {
    return res.status(403).json({ message: '需要用户权限' });
  }
  next();
}; 