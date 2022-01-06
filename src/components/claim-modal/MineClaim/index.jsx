import React from "react";
import './index.less'
import { Modal } from "antd";
import {getIPFSFile} from "../../../utils/ipfs";

function createDiv(n, photo) {
  const list = []
  for (let i = 0; i < n; i++) {
    list.push(<div key={i} style={{backgroundImage: `url("${getIPFSFile(photo)}")`}}/>)
  }
  return list
}

export default function MineClaim({visible, setVisible, mintNFT}) {
  return (
    <Modal
      wrapClassName="justine-dusk-nft-claim-modal"
      centered={true}
      visible={visible}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      <div className="wallet-popup-close" onClick={() => setVisible(false)}>
        <span className="wallet-popup-close-x"/>
      </div>
      <div className="gift-main">
        <div className="westarter-img">
          {createDiv(20, mintNFT.photo)}
        </div>
      </div>
    </Modal>
  )
}
