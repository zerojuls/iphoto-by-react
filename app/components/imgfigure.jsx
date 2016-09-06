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