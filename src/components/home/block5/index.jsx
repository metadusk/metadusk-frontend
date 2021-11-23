import React from "react";
import "./index.less";
import HelmetGoverance from "../../../assets/image/home/helmet_goverance.png";
import Rucition from "../../../assets/image/home/rucition.png";
import Exchange from "../../../assets/image/home/exchange.png";
import Footer from "../../footer";

const cardsList = [
  {
    img: HelmetGoverance,
    title: "Vote to Get",
  },
  {
    img: Rucition,
    title: "Coming Soon",
  },
  {
    img: Exchange,
    title: "Coming Soon",
  },
];

export default function Block5() {
  return (
    <div className="get-dusk">
      <div className="get-dusk-main">
        <div className="banner-light">How to get it</div>
        <div className="cards-list">
          {cardsList.map((item, index) => (
            <div className="card-item" key={index}>
              <img src={item.img} alt="" />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
