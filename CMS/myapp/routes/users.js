var express = require('express');
var router = express.Router();
var UserModel = require("../model/UserModel");

// 把上传的图片存放到静态资源文件夹   
var multer = require('multer');
const upload = multer({ dest: 'public/images' });

// 未登录，新增用户信息
router.post('/', async function (req, res, next) {
  const { phone, } = req.body;
  await UserModel.create({
    name: "",
    gender: null,
    phone,
    birth: "",
    avatar: '/images/quesheng.jpg'
  });
  res.send({ code: 200, message: 'success' });
});

// 已登录，修改个人信息 
router.put('/:id', upload.single('avatar'), async function (req, res, next) {
  const { id } = req.params;
  const { name, gender, birth } = req.body;
  console.log(name, 'req.-body');
  // 只允许上传单个图片   
  let avatar;
  if (req.file) {
    avatar = `/images/${req.file.filename}`;
  }
  await UserModel.updateOne({ _id: id }, {
    name,
    gender,
    birth,
    avatar
  });
  res.send({ code: 200, message: 'success' });
});

// 查询是否有该手机号 1:有 0:无
router.get('/phone', async function (req, res, next) {
  const { phone } = req.query;
  const result = await UserModel.find({ phone });
  res.send({ code: 200, message: 'success', data: result?.length ? 1 : 0 });
});

// 根据手机号查询返回所有信息
router.get('/', async function (req, res, next) {
  const { phone } = req.query;
  const result = await UserModel.find({ phone });
  res.send({ code: 200, message: 'success', data: result });
});

module.exports = router;

