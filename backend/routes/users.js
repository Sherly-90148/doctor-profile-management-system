const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 获取所有用户列表（仅管理员）
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -__v')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('获取用户列表错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取单个用户信息
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password -__v');
    
    if (!user) {
      return res.status(404).json({ message: '未找到该用户' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('获取用户信息错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新用户信息
router.put('/:id', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '未找到该用户' });
    }

    // 如果提供了新密码，则更新密码
    if (password) {
      user.password = password;
    }

    // 更新其他字段
    Object.assign(user, updateData);
    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email
    });
  } catch (error) {
    console.error('更新用户信息错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除用户
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: '未找到该用户' });
    }
    res.json({ message: '用户已删除' });
  } catch (error) {
    console.error('删除用户错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新用户状态
router.patch('/:id/status', async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password -__v');

    if (!user) {
      return res.status(404).json({ message: '未找到该用户' });
    }

    res.json(user);
  } catch (error) {
    console.error('更新用户状态错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router; 