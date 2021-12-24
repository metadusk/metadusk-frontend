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
import {ChainId, NFTDusk, NFTDuskKit} from "../../../../web3/address";
import {LoadingOutlined} from "@ant-design/icons";
import {getOnlyMultiCallProvider, processResult} from "../../../../web3/multicall";
import {Contract} from "ethers-multicall-x";
import {strToBool} from "../../../../utils";
import {message} from "antd";
import MineClaimModal from "../../../claim-modal/MineClaim";
import {DUSK_CLAIM_STATUS} from "../../../../const";
import {mainContext} from "../../../../reducer";


export default function MintItem({duskCount, mineData}) {
  const {exhibits, mintNFT, mintContract} = mineData
  const {account, library} = useActiveWeb3React()
  const [mintLoading, setMintLoading] = useState(false)
  const [isApprovedDusk, setIsApprovedDusk] = useState(false)
  const [isApprovedDuskKit, setIsApprovedDuskKit] = useState(false)
  const { dispatch, state } = useContext(mainContext)
  const [showClaimModal, setShowClaimModal] = useState(false)
  const canMint = () => {
    if (duskCount <= 0) {
      return false
    }
    for (let i = 0; i < exhibits.length; i++) {
      if (exhibits[i].count <= 0) {
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
      contractDusk.isApprovedForAll(account, mintContract.address),
      contractDuskKit.isApprovedForAll(account, mintContract.address),
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
    let contractAddress =  NFTDuskKit
    if (!isApprovedDusk){
      contractAddress = NFTDusk
    }
    const contract = getContract(library, contractAddress.abi, contractAddress.address)
    contract.methods
      .setApprovalForAll(mintContract.address, true)
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
    const contract = getContract(library, mintContract.abi, mintContract.address)
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

  return (
    <div className='dashboard-list_data_JustineDus'>
      <div className="dashboard-list_data_mint">
        <div className='dusk_upgrade'>
          <div className="dusk_joint">
            <img className='dusk_png' src={Dusk}/>
            <p className='lightning'></p>
            <img className='dusk_png' src={getIPFSFile(mintNFT.photo)}/>
          </div>
          <div className='dusk_equipment dusk_equipment_box'>
            {
              exhibits.map((item, index) => {
                return (
                  <p className={cs(item.bgCN, 'naked_duck')} key={index}>
                    <img src={getIPFSFile(item.image)} title={item.title}/>
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
            <div className="mine-btn-box">
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
          </div>
        </div>
      </div>

      <MineClaimModal setVisible={setShowClaimModal} visible={showClaimModal} mintNFT={mintNFT}/>
    </div>
  )
}
