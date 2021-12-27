import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Typewriter from "../../typewriter";
import { getIPFSFile } from "../../../utils/ipfs";
import { Link } from "react-router-dom";
import NFTClaimModal from "../../claim-modal/DuskClaim/index";
import DefaultPng from "../../../assets/image/dashboard/no_Dusk_pc@2x.png";
import "./index.less";
import { Carousel } from 'antd';

const DashBoardBanner = (props) => {
  const {listData} = props
  const [claimNftModal, setClaimNftModal] = useState(false);
  const [showIndex, setShowIndex] = useState(0)
  const bannerData = listData[showIndex]
  console.log('listData', props.listData)
  return (
    <div className="dashboard-banner">
      <div className="dashboard-banner_content">
        <div className="dashboard-banner_content_left">
        <Carousel afterChange={setShowIndex}  dots={{dotsClass: 'dashboard-banner_content-dots'}} style={{width: '200px', height: '305px'}}>
          {
            listData.map((item, index) => (
                <img src={getIPFSFile(item.content.photo)} key={item.tokenId}/>
            ))
          }
          {listData.length === 0 && <img src={DefaultPng} />}
        </Carousel>
        </div>
        {bannerData && bannerData.content && (
          <div className="dashboard-banner_content_right">
            <div className="justine_dusk">
              <p className="token_address">
                <span>
                  <FormattedMessage id="dashboard6" />
                </span>
                <span>0xedfbf15775a2e42e03d059fb98da6e92284de7be</span>
              </p>
              <p className="justine_dusk_title">
                <span>{bannerData.content.name}</span>
                <span>ID：{bannerData.tokenId}</span>
              </p>
              <p className="describe">
                <Typewriter
                  speed={15}
                  showSubscript
                  start={true}
                  text={bannerData.content.introduction || bannerData.content.story}
                />
              </p>
            </div>
          </div>
        )}
        {!(bannerData && bannerData.content) && (
          <div className="dashboard-banner_content_right">
            <h3>
              <FormattedMessage id="dashboard" />
            </h3>
            <img
              className="line"
              src={
                require(`../../../assets/image/dashboard/line@2x.png`).default
              }
            />
            <div className="get_nft">
              <div className="get_nft_one">
                <p>
                  <span>1</span>
                  <FormattedMessage id="dashboard4" />
                </p>
                <a onClick={() => setClaimNftModal(true)}>
                  <FormattedMessage id="dashboard5" />
                </a>
              </div>
            </div>
            <div className="get_nft">
              <div className="get_nft_one">
                <p>
                  <span>2</span>
                  <FormattedMessage id="dashboard1" />
                </p>
                <Link to="/auction">
                  <FormattedMessage id="dashboard2" />
                </Link>
              </div>
            </div>{" "}
            <div className="get_nft">
              <div className="get_nft_one">
                <p>
                  <span>3</span>
                  0xedfbf15775a2e42e03d{'\n'}059fb98da6e92284de7be
                </p>
                {/* <a>
                  <FormattedMessage id="dashboard2" />
                </a> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <NFTClaimModal visible={claimNftModal} setVisible={setClaimNftModal} />
    </div>
  );
};

export default injectIntl(DashBoardBanner);
