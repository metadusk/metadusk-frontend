import React from "react";
import './index.less'
import {Modal} from "antd";
import HelmetDusk from '../../../assets/image/nft-modal/helmet_dusk.png'

export default function HelmetNFTModal({visible, setVisible}){
  return (
    <Modal
      wrapClassName="helmet-nft-claim-modal"
      centered={true}
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      maskClosable={false}
    >
      <div className="helmet-nft-modal-view">
        <div className="view-header">limited convertibility</div>
        <div className="view-box">
          <img src={HelmetDusk} className="helmet-dusk" alt=""/>
          <div className="view-box-info">
            <p className="price">Current price <span>1BNB</span></p>
            <div className="confirm-btn">confirm</div>
            <p className="tip">Each address can only purchase one NFT at a time</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}
