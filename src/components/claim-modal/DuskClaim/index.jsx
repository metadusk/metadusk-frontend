import React, { useMemo, useState, useContext} from "react";
import './index.less'
import {message, Modal} from "antd";
import {getOnlyMultiCallProvider, processResult} from "../../../web3/multicall";
import {ChainId} from "../../../web3/address";
import {Contract} from "ethers-multicall-x";
import DuskNFTAbi from "../../../web3/abi/DuskNFT.json";
import {useWeb3React} from "@web3-react/core";
import cs from "classnames";
import { mainContext } from '../../../reducer'
import { DUSK_CLAIM_STATUS } from '../../../const'
import {getContract} from "../../../web3";
import {changeNetwork} from "../../../web3/connectors";
import {LoadingOutlined} from "@ant-design/icons";


const DuskAllowListNFT = {
  address: '0x86f447333734052bc3d19858Fe334179eF66bE40',
  abi: DuskNFTAbi
}

function createDiv(n) {
  const list = []
  for (let i = 0; i < n; i++) {
    list.push(<div key={i}/>)
  }
  return list
}

export default function NFTClaimModal({visible, setVisible}) {
  const {account, chainId, library} = useWeb3React()
  const [available, setAvailable] = useState(false)
  const [received, setReceived] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tokenId, setTokenId] = useState(null)
  const { dispatch, state } = useContext(mainContext)
  const [now, setNow] = useState(parseInt(Date.now() / 1000))

  const getAuthority = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const warBadgeContract = new Contract(DuskAllowListNFT.address, DuskAllowListNFT.abi)
    multicall.all([warBadgeContract.allowList(account), warBadgeContract.withdrawList(account), warBadgeContract.begin()])
      .then(data => {
        data = processResult(data)
        const b = {
          'true': true,
          'false': false
        }
        if (now > data[2]) {
          setAvailable(b[data[0]] && !b[data[1]])
        } else {
          setAvailable(false)
        }
        setReceived(b[data[1]])
        setLoading(false)
      })
  }
  // const getNft = () => {
  //   const multicall = getOnlyMultiCallProvider(ChainId.BSC)
  //   const contract = new Contract(WARBadge.address, WARBadge.abi)
  //   multicall.all([contract.balanceOf(account)]).then(data => {
  //     data = processResult(data)
  //     if (data[0] > 0) {
  //       multicall.all([contract.tokenOfOwnerByIndex(account, data[0] - 1)]).then(data2 => {
  //         data2 = processResult(data2)
  //         setTokenId(data2[0])
  //       })
  //     }
  //   })
  // }
  const onClaim = () => {
    if (!available || loading) {
      return
    }
    setLoading(true)
    const contract = getContract(library, DuskAllowListNFT.abi, DuskAllowListNFT.address)
    contract.methods
      .withdraw()
      .send({
        from: account
      })
      .on('receipt', async (_, receipt) => {
        getAuthority()
        // getNft()
        dispatch({
          type: DUSK_CLAIM_STATUS,
          duskClaimStatus: Math.random()
        })
        message.success('success')
      })
      .on('error', (err, receipt) => {
        setLoading(false)
      })
  }
  useMemo(() => {
    if (visible && account) {
      getAuthority()
      // getNft()
    }
  }, [visible, account])
  return (
    <Modal
      wrapClassName="dusk-nft-claim-modal"
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
        chainId === ChainId.BSC ? (
          <div className={cs({"gift-claim": true, 'disabled': !available})} onClick={onClaim}>
            {loading && <LoadingOutlined style={{marginRight: '5px'}}/>}
            {received ? 'Received' : 'Claim'}
          </div>
        ) : (
          <div className="gift-claim" onClick={() => changeNetwork(ChainId.BSC)}>Switch To BSC</div>
        )
      }
    </Modal>
  )
}
