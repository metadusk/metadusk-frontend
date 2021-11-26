import React from "react";
import './index.less'
import cx from 'classnames'
import ArrowIcon from '../../../assets/image/home/arrow_left.svg'
import Swiper from 'swiper'
import {exhibitsList} from "../../../config/nft";



export default class Block4 extends React.Component{
  state = {
    swiper: null
  }
  componentDidMount() {
    const swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      // loop: true,
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide: 1,
      slidesOffsetBefore: -10,
      coverflowEffect: {
        rotate: 45,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      on: {
        slideChange: function(){
          if (window.innerWidth > 888){
            if (this.activeIndex === 0){
              swiper.slideTo(1)
            } else if (this.activeIndex === exhibitsList.length - 1) {
              swiper.slideTo(exhibitsList.length - 2)
            }
          }
        },
      }
    });
    this.setState({swiper})
  }
render() {

  return (
    <div className="exhibits-ornament">
      <div className="exhibition-frame">
        <div className="effect-a"/>
        <div className="exhibition-frame-container">
          <div className="swiper-container">
            <div className="exhibition-frame-box swiper-wrapper">
              {
                exhibitsList.map((item, index) => (
                  <div className={cx({
                    "exhibition-frame-item-box": true,
                    "swiper-slide": true
                  })} key={index}>
                    <h2>{item.title}</h2>
                    <div className="exhibition-frame-item">
                      <img src={item.frame} className="w-frame" alt=""/>
                      {item.effect && <img src={item.effect} className="w-effect" alt=""/>}
                      <img src={item.nft} className="w-nft" alt=""/>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="switch-tab">
          <span onClick={()=>this.state.swiper && this.state.swiper.slidePrev()}><img src={ArrowIcon} alt=""/></span>
          NEXT
          <span onClick={()=>this.state.swiper && this.state.swiper.slideNext()}><img className="arrow-right" src={ArrowIcon} alt=""/></span>
        </div>
      </div>
    </div>
  )
}
}
