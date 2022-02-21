import React, {useMemo, useState} from "react";
import './index.less'
import LightningImg from '../../../assets/image/blind-box/lightning.png'
import UnknownImg from '../../../assets/image/blind-box/unknown.png'
import IconTreeImg from '../../../assets/image/blind-box/icon_tree.png'
import IconStocksImg from '../../../assets/image/blind-box/icon_socks.png'
import cs from "classnames";
import BlindBoxNft from "../../../components/blind-box/nft";
import {getContract, useActiveWeb3React} from "../../../web3";
import {ADDRESS_INFINITY, ChainId, ERC20Abi} from "../../../web3/address";

import ItemPoolAbi from '../../../web3/abi/ItemPool.json'
import {multicallClient, ClientContract} from "../../../web3/multicall";
import {useNow} from "../../../hooks";
import {LoadingOutlined} from "@ant-design/icons";
import ButtonM from "../../../components/button-m";
import {fromWei} from "../../../utils/format";
import {message} from "antd";
import {checkIsTestEnv} from "../../../utils";

let ItemPool = {
  address: '0xf93ece26fE5abFB613F1CEA2E36690A2D049C3BD',
  abi: ItemPoolAbi
}
const isTest = checkIsTestEnv()

if (isTest) {
  ItemPool.address = '0xCD3b92C533ebE95E1DD001a1cd1378110938B40C'
}

const statusClassMap = {
  'static': 'static',
  'open': 'active',
  'claiming': 'active active2',
  'claimed': 'active active2 active3'
}

function ButtonIcon({children, openLoading}) {
  return (
    <>
      {!openLoading && <img src={IconTreeImg} className="lottery-btn-icon" alt=""/>}
      {children}
      {!openLoading && <img src={IconStocksImg} className="lottery-btn-icon" alt=""/>}
    </>
  )
}

export default function BitBox() {
  const [status, setStatus] = useState('static')
  const {account, library} = useActiveWeb3React()
  const now = useNow()
  const [loadLoading, setLoadLoading] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [pageData, setPageData] = useState({
    begin: 0,
    end: 4099254920,
    buyTokenVolue: '250000000000000000',//price,gwei
    allowListGetItem: 0,
  })
  const isEnd = !openLoading && pageData.end < now
  const isComing = !openLoading && pageData.begin > now
  const countdown = () => {
    const time = pageData.begin - now
    const hh = Math.floor(time / 3600)
    const mm = Math.floor((time % 3600) / 60)
    const ss = Math.floor((time % 60))
    return `${hh}h/${mm}m/${ss}s`
  }
  const [claimId, setClaimId] = useState('')
  const [quick, setQuick] = useState(false)

  const getData = () => {
    setLoadLoading(true)
    const contract = new ClientContract(ItemPool.abi, ItemPool.address, ChainId.BSC)
    const calls = [
      contract.begin(),
      contract.end(),
      contract.buyTokenVolue(),
      contract.allowListGetItem(account),
    ]
    multicallClient(calls).then(async data => {
      const [begin, end, buyTokenVolue, allowListGetItem] = data
      console.log('buyTokenVolue', buyTokenVolue)
      setPageData({begin, end, buyTokenVolue, allowListGetItem})
      setLoadLoading(false)
    })
  }

  useMemo(() => {
    if (account) {
      getData()
    }
  }, [account])

  const getClaimData = () => {
    const contract = new ClientContract(ItemPool.abi, ItemPool.address, ChainId.BSC)
    multicallClient([contract.lastClaimIds(account)]).then(data => {
      if (Number(data) > 0) {
        setClaimId(data[0])
        setTimeout(() => {
          setStatus('claimed')
          getData()
        }, 100)
      } else {
        getClaimData()
      }
    })
  }

  const onOpen = () => {
    if (openLoading || isComing || isEnd) {
      return
    }
    setStatus('static')
    setOpenLoading(true)
    const contract = getContract(library, ItemPool.abi, ItemPool.address)
    const method = pageData.allowListGetItem > 0 ? 'claimByAllowList' : 'buy'
    contract.methods[method]()
      .send({
        from: account,
        value: pageData.buyTokenVolue
      })
      .on('transactionHash', () => {
        setStatus('open')
        setTimeout(() => {
          setQuick(true)
        }, 2000)
      })
      .on('receipt', (_, receipt) => {
        // setStatus('claiming')
        getClaimData()
        setOpenLoading(false)
      })
      .on('error', (err, receipt) => {
        setOpenLoading(false)
      })
  }
  return (
    <>
      <div className="blind-box-main">
        <div className={cs('box-view', statusClassMap[status], quick && status === 'open' && 'quick')}>
          <div className="box">
            <div></div>
            <div></div>
            <div><img src={LightningImg} alt=""/></div>
            <div><img src={LightningImg} alt=""/></div>
            <div><img src={UnknownImg} alt=""/></div>
            <div><img src={UnknownImg} alt=""/></div>
            <BlindBoxNft status={status} claimId={claimId}/>
          </div>
        </div>
      </div>
      {
          (<ButtonM chainId={ChainId.BSC}
                    className={cs({'lottery-btn': true})}
                    onClick={onOpen}
                    disabled={loadLoading || isEnd || isComing}
          >
            {openLoading && <LoadingOutlined/>}
            {isEnd ? 'End' : isComing ?
              <span style={{fontSize: '20px'}}>{'Countdown ' + countdown()}</span>
              : <span>
                {status === 'claimed' ? 'Keep opening' : 'Open'}
              </span>
            }
          </ButtonM>)
      }
      <div className="blind-box-desc">
        <p><strong>Tips:</strong></p>
        <p>1. 0.25 BNB/BOX</p>
        <p>2. 2 steps included: Open and Claim</p>
        <p>3. Your equipments will be showed on Dashboard.</p>
      </div>
    </>
  )
}
