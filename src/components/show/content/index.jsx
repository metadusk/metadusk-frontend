import React from "react";
import "./index.less";
import Dusk from "../../../assets/image/show/dusk.png";
import JustineDusk from "../../../assets/image/show/justinedusk.png";
import WeddingDress from "../../../assets/image/show/weddingdress.png";
import Weddingveil from "../../../assets/image/show/weddingveil.png";
import Gun from "../../../assets/image/show/gun.png";
import Cigarette from "../../../assets/image/show/cigarette.png";
import XmasPunk from "../../../assets/image/show/xmaspunk.png";
import HelmetSkateboard from "../../../assets/image/show/helmetskateboard.png";
import TexasVibe from "../../../assets/image/show/texasvibe.png";
import XmasHat from "../../../assets/image/show/xmashat.png";
import PunkHacket from "../../../assets/image/show/punkhacket.png";
const DuskList = [
  {
    symbol: "Dusk",
    logo: Dusk,
    address: "0x5850d89f84552ef0a789ee61a93667904201e1b9",
    info: "元宇宙公元 1024 年, 在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种, 该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定, 变异极其频繁, 不出时年就衍生出来数十万种奇异种族, 有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……",
  },
  {
    symbol: "Justine Dusk",
    logo: JustineDusk,
    address: "0x5850d89f84552ef0a789ee61a93667904201e1b9",
    info: "元宇宙公元 1024 年, 在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种, 该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定, 变异极其频繁, 不出时年就衍生出来数十万种奇异种族, 有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……",
    mints: [
      { symbol: "Wedding Dress", logo: WeddingDress },
      { symbol: "Wedding veil", logo: Weddingveil },
      { symbol: "Gun", logo: Gun },
      { symbol: "Cigarette", logo: Cigarette },
    ],
  },
  {
    symbol: "Xmas Punk",
    logo: XmasPunk,
    address: "0x5850d89f84552ef0a789ee61a93667904201e1b9",
    info: "元宇宙公元 1024 年, 在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种, 该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定, 变异极其频繁, 不出时年就衍生出来数十万种奇异种族, 有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……",
    mints: [
      { symbol: "Helmet Skateboard", logo: HelmetSkateboard },
      { symbol: "Texas Vibe", logo: TexasVibe },
      { symbol: "Xmas Hat", logo: XmasHat },
      { symbol: "Punk Hacket", logo: PunkHacket },
    ],
  },
];
const ShowContent = () => {
  return (
    <div className="show-content">
      {DuskList.map((item) => (
        <div className="show-content-dusk">
          <div className="show-content-dusk-item">
            <div className="dusk-logo">
              <img src={item.logo} alt="" />
            </div>
            <div className="dusk-info">
              <div className="dusk-info-title">{item.symbol}</div>
              <div className="dusk-info-address">
                <span className="dusk-info-address-t">Token Address</span>
                <span className="dusk-info-address-b">{item.address}</span>
              </div>
              <div className="dusk-info-text">{item.info}</div>
            </div>
          </div>
          {item.mints ? (
            <div className="show-content-dusk-mint">
              <div className="show-content-dusk-mint-item">
                {item.mints.map((itemMint) => (
                  <div className="mint-wrap">
                    <div className="mint-logo">
                      <img src={itemMint.logo} alt="" />
                    </div>
                    <div className="mint-button">
                      <a href="">Open Bland Box</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowContent;
