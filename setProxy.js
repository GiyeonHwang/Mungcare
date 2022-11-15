const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://192.168.2.77:5000',   // 설정한포트번호
      changeOrigin: true,
    })
  );
};