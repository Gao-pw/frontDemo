/** 
 * 策略模式：定义一系列的算法，把它们一个一个封装起来，并且使它们可以互相替换
 * （有点像多态）
 * 使用策略模式会把所有的属性暴露给用户，违反最少暴露原则，即封装
 * 但使用策略模式无非是把需要他们负责的逻辑抽离出来，好维护，但 js 中的策略模式往往用函数代替了
 */

// 表单检验 正则策略

// 策略对象
let strategies = {
    isNotEmpty:(value , errMessage)=>{
        if(value === ''){
            return errMessage;
        }
    },
    minLength:(value, errMessage)=>{
        if(value.length < 5 ){
            return errMessage;
        }
    }
}

// 验证类

class Validator{
    cache = [];
    add(value, rule){
        this.cache.push(strategies[rule].bind(null,value.value,value.errMessage))
    }
    start(){
        let errs= [];
        this.cache.forEach(fn=>{
            let temp = fn();
            temp && errs.push(temp)
        })
        console.log(errs)
    }
}

const validator = new Validator();

validator.add({value:'',errMessage:'不为空'},'isNotEmpty');

validator.add({value:'1234',errMessage:'不为空'},'isNotEmpty');

validator.add({value:'1234',errMessage:'字符串长度小于6'},'minLength');

validator.start();

