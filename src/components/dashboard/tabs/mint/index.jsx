import React, {useMemo, useState} from "react";
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
import {ChainId, Lottery} from "../../../../web3/address";
import {LoadingOutlined} from "@ant-design/icons";


export default function Mint({listData, equipData}) {
  const {account, library} = useActiveWeb3React()
  const [mintLoading, setMintLoading] = useState(false)
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
  const onMint = () => {
    if (!canMint() || mintLoading) {
      return
    }
    setMintLoading(true)
    const contract = getContract(library, Lottery.abi, Lottery.address)
    contract.methods.compose().send({
      from: account
    }).on('receipt', () => {
      setMintLoading(false)
    })
    .on('error', () => {
      setMintLoading(false)
    })
  }
  useMemo(() => {
    // if (canMint()){
    //   // isApprovedForAll
    //   const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    //   const
    //
    // }
  }, [listData, equipData])
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
            listData.length > 0 ? (
              <span className='dusk_equipment_number'>
                  X<i>{listData[0].count}</i>
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
        <ButtonM chainId={ChainId.BSC} className={cs('mint_btn', !canMint() && 'disabled')} onClick={onMint}>
          {mintLoading && <LoadingOutlined style={{marginRight: '5px'}}/>}
          <FormattedMessage id='dashboard14'/>
        </ButtonM>
      </div>
    </div>
  )
}
