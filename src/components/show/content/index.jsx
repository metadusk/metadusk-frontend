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
    address: "0xedfbf15775a2e42e03d059fb98da6e92284de7be",
    info: "In the year 1024, a fancy specie on a fertile wonderland in the Tesla Nebula. The species is flat-billed and walk upright. Their genes were unstable and upgradable,such within a few years, tons of species popped out, some of which were extremely intelligent, some are furiously violent, some are deep into fashion, etc......",
    button: "Auction",
    href: "/auction",
    mints: [],
  },
  {
    symbol: "Justine Dusk",
    logo: JustineDusk,
    address: "0x17DFb8867184aFa9116Db927B87C27CC27A92F89",
    info: "Justine is a Guardian, extremely competitive in combat, with a short temper, and proficient in various weapons. But if he get the cigarette, something awful would be in the corner.",
    button: "Mint",
    href: "/dashboard",
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
    address: "coming soon",
    info: "Xmas Dusk is wrapped in New Year and Dexus vide, with skateboard and festival hat. The sunglasses and golden teeth leak the info of his mysterious background.",
    button: "Mint",
    href: "/dashboard",
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
        <div className="show-content-dusk" key={item.symbol}>
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
              <div className="dusk-info-button">
                <a href={item.href}>{item.button}</a>
              </div>
            </div>
          </div>
          {item.mints ? (
            <div className="show-content-dusk-mint">
              <div className="show-content-dusk-mint-item">
                {item.mints.map((itemMint) => (
                  <div className="mint-wrap" key={itemMint.symbol}>
                    <div className="mint-logo">
                      <img src={itemMint.logo} alt="" />
                    </div>
                    <div className="mint-button">
                      <a href="/blindBox">Open Bland Box</a>
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
