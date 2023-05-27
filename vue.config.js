const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // 修改成false 就是不检查了
  devServer:{
    proxy:"http://127.0.0.1:8000"
  }
})

