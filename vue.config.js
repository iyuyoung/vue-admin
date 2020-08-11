module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?
    '/static/admin/dist/' : '/',
  outputDir: process.env.NODE_ENV === 'production' ?
    '/static/admin/dist/' : '/',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/admin': {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        secure: false
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      var externals = {
        vue: 'Vue',
        'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter',
        vuex: 'Vuex'
      }
      config.externals(externals)
      const cdn = {
        css: [
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/theme-chalk/index.css'
        ],
        js: [
          'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
          'https://cdn.bootcdn.net/ajax/libs/vue-router/3.1.3/vue-router.min.js',
          'https://cdn.bootcdn.net/ajax/libs/vuex/3.1.2/vuex.min.js',
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.12.0/index.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
  }
}