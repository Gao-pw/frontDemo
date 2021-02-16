console.info("%cauthor siroi","color:white;background-color:black;font-size:20px;");

function main(){

    let doneArr = [];//完成的
    let waitArr = [];//未完成的

    function init() {
        let doneTemp = JSON.parse(localStorage.getItem("done"));
        let waitTemp = JSON.parse(localStorage.getItem("wait"));
        if(waitTemp === null){
            waitArr = [];
        }else{
            waitArr = (waitTemp.wait === "") ? [] : waitTemp.wait.split(",");
        }

        if(doneTemp === null){
            doneArr = [];
        }else{
            doneArr = (doneTemp.done === "") ? [] : doneTemp.done.split(",");
        }
        if(waitArr){
           for(let i =0;i< waitArr.length;i++){
                addWait(waitArr[i]);
           }
        }
        if(doneArr){
            for(let i =0;i< doneArr.length;i++){
                 addDone(doneArr[i]);
            }
         }
    };

    /**
     * 删除存储
     * @param {*} message 
     * @param {*} type 
     */
    function deleteLoaclStroge(message,type) {
        switch(type){
            case "done":
                let indexDone = doneArr.indexOf(message);
                doneArr.splice(indexDone,1);
                localStorage.setItem("done",JSON.stringify({"done":`${doneArr}`}));
                break;
            case "wait":
                let indexWait = waitArr.indexOf(message);
                waitArr.splice(indexWait,1);
                localStorage.setItem("wait",JSON.stringify({"wait":`${waitArr}`}));
                break;
        }
    }

    /**
     * 本地存储
     */
    const addLocalStroage = (message,type)=>{
        switch(type){
            case "done":
                doneArr.push(message);
                localStorage.setItem("done",JSON.stringify({"done":`${doneArr}`}));
                break;
            case "wait":
                waitArr.push(message);
                console.log(waitArr);
                localStorage.setItem("wait",JSON.stringify({"wait":`${waitArr}`}));
                break;
        }
    }

    //未完成
    const addWait = (message)=>{
        //wait 元素
        const wait = document.getElementById("wait");

        //temp li 元素
        const tempLi = document.createElement("li");

        //temp input 元素
        const input = document.createElement("input");
        input.type = "checkbox"
        
        //temp span 元素
        const span = document.createElement("span");
        span.textContent = message;

        const del = document.createElement("i");
        del.classList.add("fa");
        del.classList.add("fa-trash");
        del.setAttribute("aria-hidden","true");
        
        //组合
        tempLi.appendChild(input);
        tempLi.appendChild(span);
        tempLi.appendChild(del);
        wait.appendChild(tempLi);


        //绑定事件
        tempLi.addEventListener("click",(event)=>{
            addDone(message);
            tempLi.remove();
            addLocalStroage(message,"done");
            deleteLoaclStroge(message,"wait");
        });

        del.addEventListener("click",(event)=>{
            event.stopPropagation();
            tempLi.remove();
            deleteLoaclStroge(message,"wait");
        })
    }

    //已完成
    const addDone = (message)=>{
        //done 元素
        const done = document.getElementById("done");

        //temp li 元素
        const tempLi = document.createElement("li");

        //temp input 元素
        const input = document.createElement("input");
        input.type = "checkbox"
        input.setAttribute("checked"," ture");
        
        //temp span 元素
        const span = document.createElement("span");
        span.textContent = message;

        const del = document.createElement("i");
        del.classList.add("fa");
        del.classList.add("fa-trash");
        del.setAttribute("aria-hidden","true");
        
        //组合
        tempLi.appendChild(input);
        tempLi.appendChild(span);
        tempLi.appendChild(del);
        done.appendChild(tempLi);

        //绑定事件
        tempLi.addEventListener("click",(event)=>{
            addWait(message);
            tempLi.remove();
            addLocalStroage(message,"wait");
            deleteLoaclStroge(message,"done");
        });

        del.addEventListener("click",(event)=>{
            event.stopPropagation();
            tempLi.remove();
            deleteLoaclStroge(message,"done");
        })
    }

    // button 绑定添加事件
    let addButton = document.getElementById("add");
    addButton.addEventListener("click",()=>{
        let value = document.querySelector("input[type='text']").value;
        if(value){
            if(waitArr.indexOf(value) === -1 && doneArr.indexOf(value) === -1){
                addWait(value);
                addLocalStroage(value,"wait");
            }else{
                alert("已经存在相同计划")
            }
            document.querySelector("input[type='text']").value = "";
        }else{
            alert("can not empty!");
        }
    });

    init();
}

window.onload = main;

