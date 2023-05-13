var express = require('express');
var router = express.Router();
var CityModel = require("../model/CityModel");

router.get('/', async function (req, res, next) {
  const data = await CityModel.find({});
  // console.log(data.length, 'city data');
  res.send({
    code: 200,
    cities: data,
    message: 'success'
  });
});

module.exports = router;