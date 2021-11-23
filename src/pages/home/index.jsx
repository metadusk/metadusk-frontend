import React from "react";
import "./index.less";
import "../../assets/css/index.less";
import Block1 from "../../components/home/block1";
import Block2 from "../../components/home/block2";
import Block3 from "../../components/home/block3";
import Block4 from "../../components/home/block4";
import Block5 from "../../components/home/block5";
import Block6 from "../../components/home/block6";
import Swiper from "swiper";
import Header from "../../components/header";
import Footer from "../../components/footer";

const pageList = [
  (props) => <Block1 {...props} />,
  (props) => <Block2 {...props} />,
  (props) => <Block3 {...props} />,
  (props) => <Block4 {...props} />,
  (props) => <Block5 {...props} />,
  // (props) => <Block6 {...props} />,
];

export default class Home extends React.Component {
  state = {
    activeIndex: 0,
  };
  componentDidMount() {
    const swiper = new Swiper(".home-swiper-container", {
      spaceBetween: 0,
      direction: "vertical",
      slidesPerView: "1",
      initialSlide: 0,
      speed: 600,
      mousewheel: true,
      lazy: true,
      width: window.innerWidth,
      height: window.innerHeight,
      on: {
        slideChange: () => {
          this.setState({ activeIndex: swiper.activeIndex });
        },
      },
    });
    this.setState({ swiper });
  }

  render() {
    const { activeIndex } = this.state;
    return (
      <div className="home-page">
        <Header />
        <div className="home-swiper-container">
          <div className="swiper-wrapper">
            {pageList.map((item, index) => (
              <div className="swiper-slide" key={index}>
                {item({ active: activeIndex === index })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
