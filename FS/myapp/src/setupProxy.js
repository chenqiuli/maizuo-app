/**
 * 反向代理后端的接口
 * 该文件修改后必须重启项目才生效
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:9000',
      changeOrigin: true,
    })
  );
};

