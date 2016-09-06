# iphoto-by-react
基于React开发的图片展示墙
项目借鉴慕课网教程：[React实战--打造画廊应用](http://www.imooc.com/learn/507)
由于慕课网教程较过时，这里使用了最新的技术栈重写了原项目。主要改造如下
- 去掉yeoman+grunt初始化工程，直接使用webpack配置工程
- 进行了React on ES6改造
```javascript
/**
 * Created by Stellar on 2016/9/6.
 */

import React from 'react';
import ReactDOM from 'react-dom';

export default  class ImgFigure extends React.Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }
    /*
     imgFigure的点击处理函数
     */
    handleClick(e){
        if (this.props.arrange.isCenter){
            this.props.inverse();
        }else{
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    }

    render(){
        let styleObj={};
        //如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos)
        {
            styleObj=this.props.arrange.pos;
        }
        //如果图片旋转角度不为0，添旋转角度
        if (this.props.arrange.rotate)
        {
            styleObj['transform']='rotate('+this.props.arrange.rotate+'deg)';
        }

        if(this.props.arrange.isCenter){
            styleObj.zIndex=11;
        }
        let imgFigureClassName="img-figure";
        imgFigureClassName+=this.props.arrange.isInverse?' is-inverse':'';
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );
    }
};
```
- 采用了部分ES6新特性来编写代码，如let 、const箭头函数（可以避免显式调用bind(this)绑定执行函数）
- 将各个独立的部分封装成独立的组件

**运行**
`npm`
`npm run dev`
浏览器访问`127.0.0.1:8080`可以看到效果