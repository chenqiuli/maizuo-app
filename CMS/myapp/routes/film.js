var express = require('express');
var router = express.Router();
var FilmModel = require("../model/FilmModel");


// 分页查询电影列表
router.get('/', async function (req, res, next) {
  const { pageNum, pageSize, cityId, type } = req.query;
  const data = await FilmModel.find({ cityId, type })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);
  res.send({
    code: 200,
    films: data,
    message: 'success'
  });
});

// 查看详情
router.get('/detail', async function (req, res, next) {
  const { id } = req.query;
  const data = await FilmModel.find({ _id: id });
  res.send({
    code: 200,
    films: data,
    message: 'success'
  });
});

module.exports = router;