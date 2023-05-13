/**
 * 创建用户模型并导出
 * Schema - 对应mongodb中field
 * Model - 对应mongodb中collection
 */
const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  cityId: Number,
});

// 模型为city，创建出来后集合名为citys
const CinemaModel = mongoose.model('cinemas', cinemaSchema);

module.exports = CinemaModel;

