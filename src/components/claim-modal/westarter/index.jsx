import React, {useMemo, useState} from "react";
import './index.less'
import {message, Modal} from "antd";
import {getOnlyMultiCallProvider, processResult} from "../../../web3/multicall";
import {ChainId} from "../../../web3/address";
import {Contract} from "ethers-multicall-x";
import AirAllowListNFTAbi from "../../../web3/abi/AirAllowListNFT.json";
import WARBadgeAbi from "../../../web3/abi/WARBadge.json";
import {useWeb3React} from "@web3-react/core";
import cs from "classnames";
import {getContract} from "../../../web3";
import {changeNetwork} from "../../../web3/connectors";
import {LoadingOutlined} from "@ant-design/icons";


export const AirAllowListNFT = {
  address: '0x1dFaC1cCF1655F5812b8Aaba81Afb3A5D10272b9',
  abi: AirAllowListNFTAbi
}
export const WARBadge = {
  address: '0xcc7dbBe86356f570aD0ba5937D764e64E9931593',
  abi: WARBadgeAbi,
  name: 'WAR Badge',
  networkId: ChainId.HECO,
  tokenURI: 'QmeysNksZt918bNbATm7RbYGq5RET8jp1iVTeYKtr4MpBv'
}

export function createDiv(n) {
  const list = []
  for (let i = 0; i < n; i++) {
    list.push(<div key={i}/>)
  }
  return list
}

export default function WestarterNFTModal({visible, setVisible}) {
  const {account, chainId, library} = useWeb3React()
  const [available, setAvailable] = useState(false)
  const [received, setReceived] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenId, setTokenId] = useState(null)
  const getAuthority = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.HECO)
    const warBadgeContract = new Contract(AirAllowListNFT.address, AirAllowListNFT.abi)
    multicall.all([warBadgeContract.allowList(account), warBadgeContract.withdrawList(account)])
      .then(data => {
        data = processResult(data)
        const b = {
          'true': true,
          'false': false
        }
        setAvailable(b[data[0]] && !b[data[1]])
        setReceived(b[data[1]])
        setLoading(false)
      })
  }
  const getNft = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.HECO)
    const contract = new Contract(WARBadge.address, WARBadge.abi)
    multicall.all([contract.balanceOf(account)]).then(data => {
      data = processResult(data)
      if (data[0] > 0) {
        multicall.all([contract.tokenOfOwnerByIndex(account, data[0] - 1)]).then(data2 => {
          data2 = processResult(data2)
          setTokenId(data2[0])
        })
      }
    })
  }
  const onClaim = () => {
    if (!available || loading) {
      return
    }
    setLoading(true)
    const contract = getContract(library, AirAllowListNFT.abi, AirAllowListNFT.address)
    contract.methods
      .claim()
      .send({
        from: account
      })
      .on('receipt', async (_, receipt) => {
        getAuthority()
        getNft()
        message.success('success')
      })
      .on('error', (err, receipt) => {
        setLoading(false)
      })
  }
  useMemo(() => {
    if (visible && account) {
      getAuthority()
      getNft()
    }
  }, [visible, account])
  return (
    <Modal
      wrapClassName="westarter-nft-claim-modal"
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
          {createDiv(20)}
        </div>
      </div>
      {
        tokenId && <p className="gift-token-id">ID: <span>{tokenId}</span></p>
      }

      {
        chainId === ChainId.HECO ? (
          <div className={cs({"gift-claim": true, 'disabled': !available})} onClick={onClaim}>
            {loading && <LoadingOutlined style={{marginRight: '5px'}}/>}
            {received ? 'Received' : 'Claim'}
          </div>
        ) : (
          <div className="gift-claim" onClick={() => changeNetwork(ChainId.HECO)}>Switch To HECO</div>
        )
      }
      <div className="tip">

        <p>WAR Badge is the collaboration with Metadusk and WeStarter</p>
        <p>As the first NFT of WeStarter, WAR Badge would be the ticket of WAR special offering campaign, IDO as well as
          the identity of Westarter community etc.</p>
        <p>Westarter, born along with the Heco chain, is a DeFi protocol in assets distribution field. Amid the half a
          year development, over 100 thousands users invloved in 42 token initial offering campaigns live on Westarter.
          These DeFi users bring prosperity to our ecosystem with their arrival. Also in the same time, with the
          experience in Heco, they become the mature investers as well.</p>
        <p>Ant Spirit is a trailblazer and guide, representing willpower, diligence, patience, tenacity, endurance,
          fidelity, cooperation and truthfulness. Such, let's go further forward together!</p>
      </div>
    </Modal>
  )
}
