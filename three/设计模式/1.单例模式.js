/** 单例模式 */

/** 函数版 
 *  借助闭包 获取 单例
 */
let singleFunction = (function(){
    let single = undefined; 
    return function(fun){
        if(fun instanceof Function){
            if(single===undefined){
                single = [fun]
            }else{
                single = [...single,fun]
            }
        }
        return single;
    }
})()

let a = singleFunction(()=>{console.log('我是a设置的方法')});
let b = singleFunction();
console.log(a===b); //true
b.forEach((ele)=>{
    ele()  //我是a设置的方法
})

/** 
 * class 版
 */
class Single {
    static single;
    fun = []; // 对外事件
    constructor(){
        if(!Single.single){
            Single.single = this
        }
        return Single.single
    }
    getFun(){
        this.fun.forEach(element => {
            element();
        });
    }
    setFun(fun){
        this.fun.push(fun);
    }
}
let c = new Single();
let d = new Single();
console.log(c===d); // true

d.setFun(()=>{console.log('我是d设置的方法')})
c.getFun() //我是d设置的方法
