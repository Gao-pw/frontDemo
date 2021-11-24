/** 
 * index.js: webpack 入口起点文件
 * 1. 运行指令：
 * 开发环境：webpack ./src/index.js -o ./build/built.js --mode==development
 * 生成环境：webpack ./src/index.js -o ./build/built.js --mode==production (进行了压缩)
 */
import './style.scss';

console.log(1+1);