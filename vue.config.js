'use strict'
const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir)
}
module.exports = {
  chainWebpack(config){
   // set svg-sprite-loader
   config.module
   .rule('svg')
   .exclude.add(resolve('packages/SvgIcon/svg'))
   .end()
 config.module
   .rule('icons')
   .test(/\.svg$/)
   .include.add(resolve('packages/SvgIcon/svg'))
   .end()
   .use('svg-sprite-loader')
   .loader('svg-sprite-loader')
   .options({
     symbolId: 'icon-[name]'
   })
   .end()
  }
}