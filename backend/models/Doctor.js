const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    enum: ['男', '女'],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  specialty: [{
    type: String
  }],
  education: [{
    degree: String,
    school: String,
    major: String,
    graduationYear: Number
  }],
  workExperience: [{
    hospital: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  certificates: [{
    name: String,
    issueDate: Date,
    expiryDate: Date,
    issuingAuthority: String
  }],
  contact: {
    phone: String,
    email: String,
    address: String
  },
  status: {
    type: String,
    enum: ['在职', '离职', '休假'],
    default: '在职'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 更新时间中间件
doctorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Doctor', doctorSchema); 