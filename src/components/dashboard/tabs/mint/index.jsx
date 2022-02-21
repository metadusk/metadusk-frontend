import React, {useContext, useMemo, useState} from "react";
import DuskMint from "../../../../assets/image/dashboard/Dusk_Mint@2x.png";
import {Link} from "react-router-dom";
import {FormattedMessage} from "react-intl";
import './index.less'
import {JustineDuskExhibits, titanAExhibits, xmasPunkExhibits} from "../../../../config/nft";
import {Lottery, NFTJustineDusk, NFTSantaPunkDusk, NFTTitanADusk} from "../../../../web3/address";
import MintItem from "../mint-item";

const mintListData = [
  {
    mintNFT: NFTJustineDusk,
    exhibits: JustineDuskExhibits,
    mintContract: Lottery,
    mintMethod: 'compose',
    composeEnable: 'composeEnable'
  },
  {
    mintNFT: NFTSantaPunkDusk,
    exhibits: xmasPunkExhibits,
    mintContract: Lottery,
    mintMethod: 'santaCompose',
    composeEnable: 'santaComposeEnable'
  },
  // {
  //   mintNFT: NFTTitanADusk,
  //   exhibits: titanAExhibits,
  //   mintContract: Lottery,
  //   mintMethod: 'titanACompose',
  //   composeEnable: 'titanAComposeEnable'
  // }
]

export default function Mint({listData, equipData}) {
  const [duskCount, setDuskCount] = useState(0)
  const [mintList, setMintList] = useState(mintListData)
  useMemo(() => {
    const duskCount_ = listData.reduce((n, item) => {
      if (item.tokenURI === 'QmYeiAviefcjEeBAT9dM1RmHxKGdAmLwJszWBKxq4q3fQy'){
        n = n + ~~item.count
      }
      return n
    }, 0)
    setDuskCount(duskCount_)
  }, [listData])

  useMemo(() => {
    const equipDataMap = equipData.reduce((map, item)=>{
      map[item.photo] = item
      return map
    }, {})
    for (let i = 0; i < mintListData.length; i++) {
      mintListData[i].exhibits.map((item) => {
        item.count = equipDataMap[item.image] ? equipDataMap[item.image].count : 0
        return item
      })
    }
    setMintList(mintListData)
  }, [equipData])

  return (
    <div className='dashboard-list_data_JustineDus'>
      <div className="dashboard-list_data_mint">
        <div className='dusk_equipment dusk_equipment-title'>
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
        {mintList.map((item, index) => <MintItem key={index} duskCount={duskCount} mineData={item}/>)}
      </div>
    </div>
  )
}
