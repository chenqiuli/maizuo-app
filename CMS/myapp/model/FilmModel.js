/**
 * 创建用户模型并导出
 * Schema - 对应mongodb中field
 * Model - 对应mongodb中collection
 */
const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  type: Number,
  cityId: Number,
});

// 模型为film，创建出来后集合名为films
const FilmModel = mongoose.model('films', filmSchema);

module.exports = FilmModel;