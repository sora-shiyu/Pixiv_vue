const path = require('path') // 引入path模块 -> 设置绝对路径
function resolve (dir) { // 声明一个函数,调用函数的时候传入相对路径
  return path.join(__dirname, dir) // return绝对路径
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      // .set('路径别名', resolve('vue.config文件的相对路径'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
  }
}