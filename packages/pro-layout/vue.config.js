/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)

const testConfig = {
  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, 'src/main.ts'),
    },
  },
}

const libConfig = {
  css: {
    extract: false,
  },
  configureWebpack: {
    entry: {
      app: resolve('src'),
    },
    externals: {
      vue: { commonjs: 'vue', commonjs2: 'vue', root: 'Vue' },
      'ant-design-vue': {
        commonjs: 'ant-design-vue',
        commonjs2: 'ant-design-vue',
        root: 'ant-design-vue',
      },
    },
  },
}

module.exports = process.env.BUILD_LIB === 'lib' ? libConfig : testConfig
