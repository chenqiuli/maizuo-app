var express = require('express');
var router = express.Router();
var CinemaModel = require("../model/CinemaModel");


// 分页查询电影列表
router.get('/', async function (req, res, next) {
  const { cityId } = req.query;
  const data = await CinemaModel.find({ cityId });
  res.send({
    code: 200,
    cinemas: data,
    message: 'success'
  });
});

module.exports = router;