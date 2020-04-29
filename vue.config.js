module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/admin/' : '/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/admin': {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false
      }
    }
  }
}