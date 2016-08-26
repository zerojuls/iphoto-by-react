/**
 * Created by Stellar on 2016/8/23.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss'

// //导入图片信息
// import images from './data/image.json';
// //利用自执行函数将图片信息转成图片URL路径信息
// var imageDatas=(function genImageURL(imageDatasArr ) {
//     for (var i=0,j=imageDatasArr.length;i<j;i++){
//         var singleImageData=imageDatasArr[i];
//         singleImageData.imageURL=require('./images/'+singleImageData.fileName);
//         imageDatasArr[i]=singleImageData;
//     }
//     return imageDatasArr;
// })(images);




class  GalleryByReactApp extends React.Component{
    render(){
        return (
            <section className="stage">
                <section className="img-sec"></section>
                <nav className="controller-nav"></nav>
            </section>
        )
    }
};
ReactDOM.render(<GalleryByReactApp />,document.getElementById('content'));