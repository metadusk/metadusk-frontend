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
import {getOnlyMultiCallProvider, processResult} from "../../../web3/multicall";
import {Contract} from "ethers-multicall-x";
import {useNow} from "../../../hooks";
import {LoadingOutlined} from "@ant-design/icons";
import ButtonM from "../../../components/button-m";
import {fromWei} from "../../../utils/format";
import {message} from "antd";

const HELMET_ADDRESS = '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8'

const ItemPool = {
  address: '0xf93ece26fE5abFB613F1CEA2E36690A2D049C3BD',
  abi: ItemPoolAbi
}

const multicall = getOnlyMultiCallProvider(ChainId.BSC)

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

export default function FestivalBox() {
  const [status, setStatus] = useState('static')
  const {account, chainId, library} = useActiveWeb3React()
  const now = useNow()
  const [loadLoading, setLoadLoading] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [isApproveHelmet, setIsApproveHelmet] = useState(false)
  const [pageData, setPageData] = useState({
    begin: 0,
    end: 4099254920,
    allowListGetItem: 0,
    helmetBalance: '0'
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
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(ItemPool.address, ItemPool.abi)
    const helmetContract = new Contract(HELMET_ADDRESS, ERC20Abi)
    const calls = [
      contract.begin(),
      contract.end(),
      contract.allowListGetItem(account),
      helmetContract.allowance(account, ItemPool.address),
      helmetContract.balanceOf(account)
    ]
    multicall.all(calls).then(async data => {
      data = processResult(data)
      const [begin, end, allowListGetItem, allowance, balance] = data
      const helmetBalance = fromWei(balance, 18).toFixed(2)
      setIsApproveHelmet(allowance > 0)
      setPageData({begin, end, allowListGetItem, helmetBalance})
      setLoadLoading(false)
    })
  }

  useMemo(() => {
    if (account) {
      getData()
    }
  }, [account])

  const getClaimData = () => {
    const contract = new Contract(ItemPool.address, ItemPool.abi)
    multicall.all([contract.lastClaimIds(account)]).then(data => {
      data = processResult(data)
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
    if (pageData.helmetBalance < 300){
      message.error('Insufficient balance')
      return;
    }
    setStatus('static')
    if (!isApproveHelmet && pageData.allowListGetItem <= 0) {
      return
    }
    setOpenLoading(true)
    const contract = getContract(library, ItemPool.abi, ItemPool.address)
    const method = pageData.allowListGetItem > 0 ? 'claimByAllowList' : 'buy'
    contract.methods[method]()
      .send({
        from: account
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

  const onApprove = () => {
    if (approveLoading) {
      return
    }
    setApproveLoading(true)
    const contract = getContract(library, ERC20Abi, HELMET_ADDRESS)
    contract.methods.approve(ItemPool.address, ADDRESS_INFINITY)
      .send({
        from: account
      })
      .on('receipt', (_, receipt) => {
        getData()
        setApproveLoading(false)
      })
      .on('error', (err, receipt) => {
        setApproveLoading(false)
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
        !isApproveHelmet && status === 'static' && pageData.allowListGetItem <= 0 ?
          (<ButtonM chainId={ChainId.BSC} className={cs({'lottery-btn': true, festival: true})} disabled={loadLoading} onClick={onApprove}>
            <ButtonIcon openLoading={approveLoading}>
              {approveLoading && <LoadingOutlined/>}
              Approve HELMET
            </ButtonIcon>
          </ButtonM>)
          :
          (<ButtonM chainId={ChainId.BSC}
                    className={cs({'lottery-btn': true, festival: true})}
                    onClick={onOpen}
                    disabled={loadLoading || isEnd || isComing}
          >
            {openLoading && <LoadingOutlined/>}
            {isEnd ? 'End' : isComing ?
              <span style={{fontSize: '20px'}}>{'Countdown ' + countdown()}</span>
              : <ButtonIcon
                openLoading={openLoading}>{status === 'claimed' ? 'Keep opening' : 'Open'} {pageData.allowListGetItem > 0 ? ' (0 HELMET)' : ' (300 HELMET)'}</ButtonIcon>
            }
          </ButtonM>)
      }
      <p className="box-balance">Your balance: {pageData.helmetBalance} HELMET</p>
      <div className="blind-box-desc">
        <p><strong>Tips:</strong></p>
        <p>1. 300 HELMET/BOX</p>
        <p>2. 2 steps included: Approve(Altogether need once) and Open</p>
        <p>3. Your equipments will be showed on Dashboard.</p>
      </div>
    </>
  )
}
