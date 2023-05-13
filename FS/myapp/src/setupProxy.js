// 反向代理后端的接口

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://127.0.0.1:9000',
      changeOrigin: true,
    })
  );
};

