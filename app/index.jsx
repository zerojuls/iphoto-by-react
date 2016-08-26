/**
 * Created by Stellar on 2016/8/23.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss'

//导入图片信息
import images from './data/image.json';
//利用自执行函数将图片信息转成图片URL路径信息
var imageDatas=(function genImageURL(imageDatasArr ) {
    for (var i=0,j=imageDatasArr.length;i<j;i++){
        var singleImageData=imageDatasArr[i];
        singleImageData.imageURL=require('./images/'+singleImageData.fileName);
        imageDatasArr[i]=singleImageData;
    }
    return imageDatasArr;
})(images);

/**
 * 获取区间随机值
 * @param low
 * @param high
 */
function getRangeRandom(low,high) {
    return Math.floor(Math.random() * (high-low)+low);
}

class ImgFigure extends React.Component{
    render(){
        let styleObj={};
        //如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos)
        {
            styleObj=this.props.arrange.pos;
        }
        return (
            <figure className="img-figure" style={styleObj}>
                <img src={this.props.data.imageURL}
                     alt={this.props.data.title}
                />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        );
    }
};


class  GalleryByReactApp extends React.Component{
    constructor(){
        super();
        this.Constant={
            centerPos:{
                left:0,
                right:0
            },
            hPosRange:{//水平方向的取值范围
                leftSecX:[0,0],
                rightSecX:[0,0],
                y:[0,0]
            },
            vPosRange:{//垂直方向取值范围
                x:[0,0],
                topY:[0,0]
            }

        };
         this.state={
                imgsArrangeArr:[
                    // {
                    //     pos:{
                    //         left:'0',
                    //         top:'0'
                    //     }
                    // }
                ]
            };


    }
    /*
    * 重新布局所有图片
    * @param centerIndex 指定居中排布的图片索引
    * */
    rearrange(centerIndex){
        let imgsArrangeArr=this.state.imgsArrangeArr,
            Constant=this.Constant,
            centerPos=Constant.centerPos,
            hPosRange=Constant.hPosRange,
            vPosRange=Constant.vPosRange,
            hPosRangeLeftSecX=hPosRange.leftSecX,
            hPosRangeRightSecX=hPosRange.rightSecX,
            hPosRangeY=hPosRange.y,
            vPosRangeTopY=vPosRange.topY,
            vPosRangeX=vPosRange.x,

            imgsArrangeTopArr=[],
            //上方区域取一个或者不取
            topImgNum=Math.floor(Math.random() * 2),
            topImgSpliceIndex=0,
            imgsArrangeCenterArr=imgsArrangeArr.splice(centerIndex,1);
        //首先居中centerIndex的图片
        imgsArrangeCenterArr[0].pos=centerPos;

        //取出要布局上侧的图片的状态信息
        topImgSpliceIndex=Math.floor(Math.random()*imgsArrangeArr.length-topImgNum);
        imgsArrangeTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

        //布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value,index) {
           imgsArrangeTopArr[index].pos={
               top:getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
               left:getRangeRandom(vPosRangeX[0],vPosRangeX[1])
           }
        });

        //布局左右两侧的图片
        for (let i=0,j=imgsArrangeArr.length,k=j / 2;i<j;i++){
            let hPosRangeLORX=null;
            //前半部分布局在左边
            if (i<k){
                hPosRangeLORX=hPosRangeLeftSecX;
            }else {
                hPosRangeLORX=hPosRangeRightSecX;
            }
            imgsArrangeArr[i].pos={
                top:getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                left:getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
            }
        }
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr:imgsArrangeArr

        });


    }


    //组件加载过后，为每张图片计算其位置范围
    componentDidMount(){
        //首选拿到舞台的大小
        let stageDOM=ReactDOM.findDOMNode(this.refs.stage),
            stageW=stageDOM.scrollWidth,
            stageH=stageDOM.scrollHeight,
            halfStageW=Math.floor(stageW / 2),
            halfStageH=Math.floor(stageH / 2);

        //拿到一个imageFigure的大小
        let imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW=imgFigureDOM.scrollWidth,
            imgH=imgFigureDOM.scrollHeight,
            halfImgW=Math.floor(imgW / 2),
            halfImgH=Math.floor(imgH /2 );
        //计算中心图片的位置
        this.Constant.centerPos={
            left:halfStageW-halfImgW,
            top:halfStageH-halfImgH
        }
        //计算左侧、右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0]=-halfImgW;
        this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW * 3;

        this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
        this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
        this.Constant.hPosRange.y[0]=-halfImgH;
        this.Constant.hPosRange.y[1]=stageH-halfImgH;
        //计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0]=-halfImgH;
        this.Constant.vPosRange.topY[1]=halfStageH-halfImgH * 3;
        this.Constant.vPosRange.x[0]=halfStageW-imgW;
        this.Constant.vPosRange.x[1]=halfStageW;

        this.rearrange(0);

    }

    render(){
        let controllerUnits=[],
            imgFigures=[];
        imageDatas.forEach(function (value,index) {
            if (!this.state.imgsArrangeArr[index]){
                this.state.imgsArrangeArr[index]={
                    pos:{
                        left:0,
                        top:0
                    }

                }
            }
           imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} arrange={this.state.imgsArrangeArr[index]}/>);
        }.bind(this));
        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
};
ReactDOM.render(<GalleryByReactApp />,document.getElementById('content'));