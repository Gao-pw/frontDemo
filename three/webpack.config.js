/**
 * 1. 代码转换  ts=>js scss=>css
 * 2. 文件优化  压缩js. css. html
 * 3. 代码分割  提取多个页面的公共代码
 * 4. 模块合并  在采用模块化的项目里会有多个模块和文件，需要构建功能把模块分类合并成一个文件
 * 5. 自动刷新  监听本地源代码的变化，自动重新构建，刷新浏览器
 * 6. 代码校验  在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过
 * 7. 自动发布  更新完代码后，自动构建出线上发布代码并传输给发布系统
 */

/** 
 * webpack.config.js 指示 webpack 干哪些活(当你运行 webpack 指令时，会加载里面的配置)
 * 所有构建工具都是基于nodejs 平台运行的 模块化默认采用commonjs
 */

const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // 入口起点
    entry:'./src/index.js',
    // 输出
    output:{
        // 输出文件名
        filename:'build.js',
        // 输出路径 __dirname 代表当前文件的目录绝对路径
        path:resolve(__dirname,'build')
    },
    module:{
        rules: [
            // 详细loader的配置
            {
                // 正则
                test: /\.scss$/,
                // 使用那些loader 从后到前
                use:[
                    // 创建style标签，将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader',
                    // 将sass编译为css
                    'sass-loader'
                ]
            },
        ]
    },
    // plugins 的配置
    plugins:[
        // 详细plugins的配置
        // 1.下载 2.引用  3.使用
        // html-webpack-plugin
        // 默认会创建一个空的HTML,自动引入打包输出的所有资源(js/css)
        new HtmlWebpackPlugin({
            template:'./src/index2.html'
        })
    ],
    mode:'development'

}