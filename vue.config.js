const { defineConfig } = require('@vue/cli-service')
// Vue打包优化-CDN加速

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
 
// 本地环境是否需要使用cdn
const devNeedCdn = false

const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      "element-ui": "ELEMENT",
      'axios': 'axios',
  },
  // cdn的css链接
  css: [
      'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/theme-chalk/index.min.css',
  ],
  // cdn的js链接
  js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js',
      'https://cdn.bootcss.com/axios/0.26.1/axios.min.js',
      'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.6/index.min.js'
  ]
};

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,  // 关闭eslint
  publicPath: process.env.NODE_ENV === 'production'
    ? ''//这里写展示页面的仓库名称
    : '/',
  // 跨域问题解决
  devServer: {
    // 配置代理
    proxy: {
      '/bgapi': {
        // 此处的写法，目的是为了 将 /api 替换成 'https://iw233.cn/api.php'
        target: 'https://api.wuenci.com/meting/api/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/bgapi': ''
        }
      }
    }
  },
  
	chainWebpack: config => {
		// ============注入cdn start============
		config.plugin('html').tap(args => {
			// 生产环境或本地需要cdn时，才注入cdn
			if (isProduction || devNeedCdn) args[0].cdn = cdn
			return args
		})
	
	},
	configureWebpack: config => {
		// 用cdn方式引入，则构建时要忽略相关资源
		if (isProduction || devNeedCdn) config.externals = cdn.externals
	},


})

// publicPath: process.env.NODE_ENV === 'production'
// ? '/Yz-Music-Cloud/'//这里写展示页面的仓库名称
// : '/',
