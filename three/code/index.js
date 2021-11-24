/**
 * 添加图片
 * 由于采用闭包保证dom只加载一次，在此项目中不显示，故不采用该方案
 * @deprecated 废弃
 */
const addImageNode = (()=>{
    // console.log(dom,i)
    let imageNode = document.createElement('img');
    document.getElementsByClassName('d')[0].appendChild(imageNode);
    return {
        setSrc:(src)=>{
            imageNode.src = src
        }
    }
})()

/**
 * 添加图片代理 预加载
 * @param {*} dom 
 * @returns 
 */
const proxyImage = (dom,image_class)=>{
    let img = new Image;
    
    let imageNode =creatElement('img',image_class)
    dom.appendChild(imageNode);

    img.onload = function(){
        imageNode.src = this.src
    }

    return {
        setSrc:(src)=>{
            imageNode.src = 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F07%2Fchances-are-1-2000.jpg&q=85'
            // addImageNode.setSrc('');
            img.src = src
        }
    }
}

// proxyImage(document.getElementsByClassName('d')[0]).setSrc('https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg')

/**
 * 单一职责 封装创建元素
 * @param {*} type 
 * @param {*} class_name 
 * @returns 
 */
const creatElement = (type,class_name)=>{
    let ele = document.createElement(type);
    ele.className = class_name;
    return ele;
}

/**
 * 添加顶部滑动栏
 * @param {*} obj 
 */
const addBookSlider = (()=>{
    let slider = document.querySelector('#js-flickity')
    let i = 0;
    const color = ['red','black']
    return (obj)=>{
        let main = creatElement('div','book-cell')
        main.style.backgroundColor = color[(i++)%2];
        let bookImage = creatElement('div','book-img');
        proxyImage(bookImage,'book-photo').setSrc(obj.img)

        let content = creatElement('div','book-content')
        let title = creatElement('div','book-title')
        let author = creatElement('div','book-author')
        let sum = creatElement('div', 'book-sum');
        let see = creatElement('div', 'book-see')

        title.innerHTML = obj.book_title;
        author.innerHTML = obj.book_author;
        sum.innerHTML = obj.book_sum;
        see.innerHTML = obj.book_see;

        content.appendChild(title)
        content.appendChild(author)
        content.appendChild(sum)
        content.appendChild(see)

        main.appendChild(bookImage)
        main.appendChild(content)
        slider.appendChild(main);
    }
})()


const json_data = [{
    img : 'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg',
    book_title : 'new new BIG MAGIC',
    book_author : 'by Elizabeth Gilbert',
    book_sum : "Readers of all ages and walks of life have drawn inspiration and empowerment from Elizabeth Gilbert’s books for years. ",
    book_see : 'see'
},
{
    img : 'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg',
    book_title : 'new BIG MAGIC',
    book_author : 'by Elizabeth Gilbert',
    book_sum : 'bbbbb',
    book_see : 'see'
}
];
json_data.forEach(item=>{
    addBookSlider(item)
})
