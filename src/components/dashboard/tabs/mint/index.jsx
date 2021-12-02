import React, {useContext, useMemo, useState} from "react";
import Dusk from "../../../../assets/image/dashboard/Dusk@2x.png";
import JustineDus from "../../../../assets/image/dashboard/JustineDus@2x.png";
import DuskMint from "../../../../assets/image/dashboard/Dusk_Mint@2x.png";
import cs from "classnames";
import {getIPFSFile} from "../../../../utils/ipfs";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import './index.less'
import {getContract, useActiveWeb3React} from "../../../../web3";
import ButtonM from "../../../button-m";
import {ChainId, Lottery, NFTDusk, NFTDuskKit} from "../../../../web3/address";
import {LoadingOutlined} from "@ant-design/icons";
import {getOnlyMultiCallProvider, processResult} from "../../../../web3/multicall";
import {Contract} from "ethers-multicall-x";
import {strToBool} from "../../../../utils";
import {message} from "antd";
import JustineDuskNFTClaimModal from "../../../claim-modal/JustineDuskClaim";
import {DUSK_CLAIM_STATUS} from "../../../../const";
import {mainContext} from "../../../../reducer";


export default function Mint({listData, equipData}) {
  const {account, library} = useActiveWeb3React()
  const [mintLoading, setMintLoading] = useState(false)
  const [isApprovedDusk, setIsApprovedDusk] = useState(false)
  const [isApprovedDuskKit, setIsApprovedDuskKit] = useState(false)
  const { dispatch, state } = useContext(mainContext)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const canMint = () => {
    if (listData.length === 0) {
      return false
    }
    for (let i = 0; i < equipData.length; i++) {
      if (equipData[i].count <= 0) {
        return false
      }
    }
    return true
  }
  const canMint_ = canMint()

  const getData = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contractDuskKit = new Contract(NFTDuskKit.address, NFTDuskKit.abi)
    const contractDusk = new Contract(NFTDusk.address, NFTDusk.abi)
    // const contractLottery = new Contract(Lottery.address, Lottery.abi)
    multicall.all([
      contractDusk.isApprovedForAll(account, Lottery.address),
      contractDuskKit.isApprovedForAll(account, Lottery.address),
      // contractLottery.needClaim(account),
    ]).then(data => {
      data = processResult(data)
      console.log(data)
      setIsApprovedDusk(strToBool(data[0]))
      setIsApprovedDuskKit(strToBool(data[1]))
      // setShowClaimModal(strToBool(data[2]))
    })
  }
  const onApprovedDusk = () => {
    if (mintLoading){
      return
    }
    setMintLoading(true)
    let contractAddress = NFTDusk
    if (!isApprovedDuskKit){
      contractAddress = NFTDuskKit
    }
    const contract = getContract(library, contractAddress.abi, contractAddress.address)
    contract.methods
      .setApprovalForAll(Lottery.address, true)
      .send({
        from: account
      })
      .on('receipt', async () => {
        getData()
        message.success('success')
        setMintLoading(false)
      })
      .on('error', () => {
        setMintLoading(false)
      })
  }

  const onMint = () => {
    if (!canMint() || mintLoading) {
      return
    }
    setMintLoading(true)
    const contract = getContract(library, Lottery.abi, Lottery.address)
    contract.methods.compose().send({
      from: account
    }).on('receipt', () => {
      message.success('success')
      setShowClaimModal(true)
      dispatch({
        type: DUSK_CLAIM_STATUS,
        duskClaimStatus: Math.random()
      })
      setMintLoading(false)
    })
    .on('error', () => {
      setMintLoading(false)
    })
  }
  useMemo(() => {
    if (account){
      getData()
    }
  }, [account])

  const duskCount = listData.reduce((n, item) => {
    if (item.tokenURI === 'QmPBhcjN3imV3cUJXj9pEXCLp4GpAHV1gPEsotYctropew'){
      n = n + ~~item.count
    }
    return n
  }, 0)
  return (
    <div className='dashboard-list_data_JustineDus'>
      <div className='dusk_upgrade'>
        <img className='dusk_png' src={Dusk}/>
        <p className='lightning'></p>
        <img className='dusk_png' src={JustineDus}/>
      </div>
      <div className='dusk_equipment'>
        <p className='naked_duck'>
          <img src={DuskMint}/>
          {
            duskCount > 0 ? (
              <span className='dusk_equipment_number'>
                  X<i>{duskCount}</i>
                </span>
            ) : (
              <Link to='/auction' className='no_dusk_equipment'>
                <FormattedMessage id='dashboard2'/>
              </Link>
            )
          }
        </p>
      </div>
      <div className='dusk_equipment dusk_equipment_box'>
        {
          equipData.map((item, index) => {
            return (
              <p className={cs(item.name.replace(' ', '_'), 'naked_duck')} key={index}>
                <img src={getIPFSFile(item.photo)}/>

                {
                  item.count > 0 ? (
                    <span className='dusk_equipment_number'>
                            X<i>{item.count}</i>
                          </span>
                  ) : (
                    <Link to='/blindBox' className='no_dusk_equipment'>
                      <FormattedMessage id='dashboard2'/>
                    </Link>
                  )
                }
              </p>
            )
          })
        }
        {
          canMint_ ? (
            <ButtonM chainId={ChainId.BSC} className={cs('mint_btn')} onClick={() => {
              if (!isApprovedDusk || !isApprovedDuskKit){
                onApprovedDusk()
              } else {
                onMint()
              }
            }}>
              {mintLoading && <LoadingOutlined style={{marginRight: '5px'}}/>}
              {
                !isApprovedDusk ? 'Approve Dusk' : !isApprovedDuskKit ? 'Approve DuskKit' : <FormattedMessage id='dashboard14'/>
              }
            </ButtonM>
          ) : (
            <ButtonM chainId={ChainId.BSC} className={cs('mint_btn', 'disabled')}>
              <FormattedMessage id='dashboard14'/>
            </ButtonM>
          )
        }
      </div>
      <JustineDuskNFTClaimModal setVisible={setShowClaimModal} visible={showClaimModal}/>
    </div>
  )
}
