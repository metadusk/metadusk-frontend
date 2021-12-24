import React, { useMemo, useState, useContext} from "react";
import './index.less'
import {message, Modal} from "antd";
import {getOnlyMultiCallProvider, processResult} from "../../../web3/multicall";
import {ChainId, Lottery} from "../../../web3/address";
import {Contract} from "ethers-multicall-x";
import DuskNFTAbi from "../../../web3/abi/DuskNFT.json";
import {useWeb3React} from "@web3-react/core";
import cs from "classnames";
import { mainContext } from '../../../reducer'
import { DUSK_CLAIM_STATUS } from '../../../const'
import {getContract} from "../../../web3";
import {changeNetwork} from "../../../web3/connectors";
import {LoadingOutlined} from "@ant-design/icons";
import ButtonM from "../../button-m";
import {getIPFSFile} from "../../../utils/ipfs";

function createDiv(n, photo) {
  const list = []
  for (let i = 0; i < n; i++) {
    list.push(<div key={i} style={{backgroundImage: `url("${getIPFSFile(photo)}")`}}/>)
  }
  return list
}

export default function MineClaim({visible, setVisible, mintNFT}) {
  // const {account, library} = useWeb3React()
  // const [loading, setLoading] = useState(false)
  // const { dispatch, state } = useContext(mainContext)

  // const onClaim = () => {
  //   if (loading) {
  //     return
  //   }
  //   setLoading(true)
  //   const contract = getContract(library, Lottery.abi, Lottery.address)
  //   contract.methods
  //     .claim()
  //     .send({
  //       from: account
  //     })
  //     .on('receipt', async (_, receipt) => {
  //       dispatch({
  //         type: DUSK_CLAIM_STATUS,
  //         duskClaimStatus: Math.random()
  //       })
  //       setVisible(false)
  //       message.success('success')
  //     })
  //     .on('error', (err, receipt) => {
  //       setLoading(false)
  //     })
  // }
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
      {/*<ButtonM chainId={ChainId.BSC} className={cs("gift-claim")} onClick={onClaim}>*/}
      {/*  <span>{loading && <LoadingOutlined style={{marginRight: '5px'}}/>}Claim</span>*/}
      {/*</ButtonM>*/}
    </Modal>
  )
}
