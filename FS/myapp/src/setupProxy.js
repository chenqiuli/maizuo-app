/**
 * 反向代理后端的接口
 * 该文件修改后必须重启项目才生效
 * 该文件上线发布后不生效，上线发布后的反向代理在nginx中配置
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://127.0.0.1:9000',
      target: "http://47.120.33.13:9000",
      changeOrigin: true,
    })
  );
};

