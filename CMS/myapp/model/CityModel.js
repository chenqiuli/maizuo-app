/**
 * 创建用户模型并导出
 * Schema - 对应mongodb中field
 * Model - 对应mongodb中collection
 */
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityId: Number,
  name: String,
  pinyin: String,
  isHot: Number,
});

// 模型为city，创建出来后集合名为citys
const CityModel = mongoose.model('citys', citySchema);

module.exports = CityModel;

