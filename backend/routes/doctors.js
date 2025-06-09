const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// 获取所有医生列表
router.get('/', async (req, res) => {
  try {
    const { department, title, status } = req.query;
    const query = {};

    if (department) query.department = department;
    if (title) query.title = title;
    if (status) query.status = status;

    const doctors = await Doctor.find(query)
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json(doctors);
  } catch (error) {
    console.error('获取医生列表错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取单个医生信息
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select('-__v');
    if (!doctor) {
      return res.status(404).json({ message: '未找到该医生信息' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('获取医生信息错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 创建医生信息
router.post('/', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    console.error('创建医生信息错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新医生信息
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-__v');

    if (!doctor) {
      return res.status(404).json({ message: '未找到该医生信息' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('更新医生信息错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 删除医生信息
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: '未找到该医生信息' });
    }
    res.json({ message: '医生信息已删除' });
  } catch (error) {
    console.error('删除医生信息错误:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router; 