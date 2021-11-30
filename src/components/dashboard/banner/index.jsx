import React, { useEffect, useState } from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import Typewriter from "../../typewriter";
import { useWeb3React } from "@web3-react/core";
import { getIPFSFile } from "../../../utils/ipfs";
import { Link } from "react-router-dom";
import NFTClaimModal from "../../claim-modal/DuskClaim/index";
import DefaultPng from "../../../assets/image/dashboard/no_Dusk_pc@2x.png";
import "./index.less";

const DashBoardBanner = (props) => {
  const [banner_data, setBanner_Data] = useState(props.listData);
  const { active, account, chainId } = useWeb3React();
  const [claimNftModal, setClaimNftModal] = useState(false);

  useEffect(() => {
    setBanner_Data(props.listData);
  }, [props.listData, banner_data, active, account]);
  return (
    <div className="dashboard-banner">
      <div className="dashboard-banner_content">
        <div className="dashboard-banner_content_left">
          {banner_data && banner_data.content && (
            <img src={getIPFSFile(banner_data.content.photo)} />
          )}
          {!(banner_data && banner_data.content) && <img src={DefaultPng} />}
        </div>
        {banner_data && banner_data.content && (
          <div className="dashboard-banner_content_right">
            <div className="justine_dusk">
              <p className="token_address">
                <span>
                  <FormattedMessage id="dashboard6" />
                </span>
                <span>0xedfbf15775a2e42e03d059fb98da6e92284de7be</span>
              </p>
              <p className="justine_dusk_title">
                <span>{banner_data.content.name}</span>
                <span>ID：{banner_data.id}</span>
              </p>
              <p className="describe">
                <Typewriter
                  speed={15}
                  showSubscript
                  start={true}
                  text={banner_data.content.introduction}
                />
              </p>
            </div>
          </div>
        )}
        {!(banner_data && banner_data.content) && (
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
                  <div>0xedfbf15775a2e42e03d 059fb98da6e92284de7be</div>
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
