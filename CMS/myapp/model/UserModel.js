/**
 * 创建用户模型并导出
 * Schema - 对应mongodb中field
 * Model - 对应mongodb中collection
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  gender: Number,
  phone: String,
  birth: String,
  avatar: String,
});

// 模型为user，创建出来后集合名为users
const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;