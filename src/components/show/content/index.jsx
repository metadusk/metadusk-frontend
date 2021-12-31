import React from "react";
import "./index.less";
const DuskList = [
  {
    symbol: "Dusk",
    logo: "dusk.png",
    address: "0x5850d89f84552ef0a789ee61a93667904201e1b9",
    info: "元宇宙公元 1024 年, 在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种, 该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定, 变异极其频繁, 不出时年就衍生出来数十万种奇异种族, 有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……",
  },
  {
    symbol: "Justine Dusk",
    logo: "justinedusk.png",
    address: "0x5850d89f84552ef0a789ee61a93667904201e1b9",
    info: "元宇宙公元 1024 年, 在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种, 该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定, 变异极其频繁, 不出时年就衍生出来数十万种奇异种族, 有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……",
    mints: [
      { symbol: "Wedding Dress", logo: "weddingdress.png" },
      { symbol: "Wedding veil", logo: "weddingveil.png" },
      { symbol: "gun", logo: "gun.png" },
      { symbol: "Cigarette", logo: "cigarette.png" },
    ],
  },
  {
    symbol: "Xmas Punk",
    logo: "xmaspunk.png",
    address: "0x5850d89f84552ef0a789ee61a93667904201e1b9",
    info: "元宇宙公元 1024 年, 在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种, 该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定, 变异极其频繁, 不出时年就衍生出来数十万种奇异种族, 有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……",
    mints: [
      { symbol: "Helmet Skateboard", logo: "helmetskateboard.png" },
      { symbol: "Texas Vibe", logo: "texasvibe.png" },
      { symbol: "Xmas Hat", logo: "xmashat.png" },
      { symbol: "Punk Hacket", logo: "punkhacket.png" },
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
              <img src="../../../assets/image/show/dusk.png" alt="" />
            </div>
            1111111111111
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowContent;
