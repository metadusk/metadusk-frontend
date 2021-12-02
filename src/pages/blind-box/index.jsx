import React, {useMemo, useState} from "react";
import './index.less'
import Header from "../../components/header";
import LightningImg from '../../assets/image/blind-box/lightning.png'
import UnknownImg from '../../assets/image/blind-box/unknown.png'
import cs from "classnames";
import BlindBoxNft from "../../components/blind-box/nft";
import {getContract, useActiveWeb3React} from "../../web3";
import {ChainId} from "../../web3/address";
import {changeNetwork} from "../../web3/connectors";
import LotteryAbi from '../../web3/abi/Lottery.json'
import {getOnlyMultiCallProvider, processResult} from "../../web3/multicall";
import {Contract} from "ethers-multicall-x";
import {useNow} from "../../hooks";
import {LoadingOutlined} from "@ant-design/icons";

const booleanType = {
  'true': true,
  'false': false
}

const Lottery = {
  address: '0xd732fD147A559fD427123A2055A1941359BB97be',
  abi: LotteryAbi
}

const multicall = getOnlyMultiCallProvider(ChainId.BSC)

const statusClassMap = {
  'static': 'static',
  'open': 'active',
  'claiming': 'active active2',
  'claimed': 'active active2 active3'
}

export default function BlindBox() {
  const [status, setStatus] = useState('static')
  const {account, chainId, library} = useActiveWeb3React()

  const now = useNow()
  const [loadLoading, setLoadLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)
  const [openLoading, setOpenLoading] = useState(false)
  const [pageData, setPageData] = useState({
    begin: 0,
    end: 4099254920,
    betCost: '250000000000000000',//price,gwei
    needClaim: false
  })
  const isEnd = !openLoading && pageData.end < now
  const isComing = !openLoading && pageData.begin > now
  const countdown = () => {
    const time = pageData.begin - now
    const hh = Math.floor(time / 3600)
    const mm = Math.floor((time % 3600)/60)
    const ss = Math.floor((time % 60))
    return `${hh}h/${mm}m/${ss}s`
  }
  const [claimId, setClaimId] = useState('')
  const [quick, setQuick] = useState(false)

  const getData = () => {
    setLoadLoading(true)
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(Lottery.address, Lottery.abi)
    const calls = [
      contract.begin(),
      contract.end(),
      contract.betCost(),
      contract.needClaim(account),
    ]
    multicall.all(calls).then(async data => {
      data = processResult(data)
      const [begin, end, betCost, needClaim] = data
      setPageData({begin, end, betCost, needClaim})
      if (booleanType[needClaim]){
        setStatus('claiming')
      }
      setLoadLoading(false)
    })
  }

  useMemo(() => {
    if (account) {
      getData()
    }
  }, [account])

  const getClaimData = () => {
    const contract = new Contract(Lottery.address, Lottery.abi)
    multicall.all([contract.lastClaimIds(account)]).then(data => {
      data = processResult(data)
      if (Number(data) > 0) {
        setClaimId(data[0])
        setClaimLoading(false)
        setTimeout(() => {
          setStatus('claimed')
        }, 100)
      } else {
        getClaimData()
      }
    })
  }

  const onOpen = () => {
    if (openLoading || isComing || isEnd){
      return
    }
    setStatus('static')
    setOpenLoading(true)
    const contract = getContract(library, Lottery.abi, Lottery.address)
    contract.methods.bet()
      .send({
        from: account,
        value: pageData.betCost
      })
      .on('transactionHash', () => {
        setStatus('open')
        setTimeout(()=>{
          setQuick(true)
        }, 2000)
      })
      .on('receipt', (_, receipt) => {
        setStatus('claiming')
        setOpenLoading(false)
      })
      .on('error', (err, receipt) => {
        setOpenLoading(false)
      })
  }
  const onClaim = () => {
    if (claimLoading){
      return
    }
    setClaimLoading(true)
    const contract = getContract(library, Lottery.abi, Lottery.address)
    contract.methods.claim()
      .send({
        from: account
      })
      .on('receipt', (_, receipt) => {
        getClaimData()
      })
      .on('error', (err, receipt) => {
        setClaimLoading(false)
      })
  }
  return (
    <div className="blind-box">
      <Header />
      <div className="blind-box-main">
        <div className={cs('box-view', statusClassMap[status], quick && status === 'open' && 'quick')} onClick={() => {status === 'claiming' && onClaim()}}>
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
        chainId !== ChainId.BSC ?
          (<div className="lottery-btn" onClick={() => changeNetwork(ChainId.BSC)}>Switch to BSC</div>) :
          status === 'claiming' ? (<div className={cs({'lottery-btn': true, 'disabled': loadLoading, active: !claimLoading})} onClick={onClaim}>
              {claimLoading && <LoadingOutlined />}
              Claim
          </div>) :
          (<div className={cs({'lottery-btn': true, 'disabled': loadLoading || isEnd || isComing})} onClick={onOpen}>
            {openLoading && <LoadingOutlined />}
              {isEnd ? 'End' : isComing ? <span style={{fontSize: '20px'}}>{'Countdown ' + countdown()}</span> : status === 'claimed' ? 'Keep opening' : 'Open'}
          </div>)
      }
      <div className="blind-box-desc">
        <p><strong>Tips:</strong></p>
        <p>1. 0.25 BNB/BOX</p>
        <p>2. 2 steps included: Open and Claim</p>
        <p>3. Your equipments will be showed on Dashboard.</p>
      </div>
    </div>
  )
}
