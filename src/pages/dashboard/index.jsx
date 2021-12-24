import React, {useContext, useState, useMemo} from 'react'
import { injectIntl } from 'react-intl'
import Header from "../../components/header";
import { getOnlyMultiCallProvider, processResult } from "../../web3/multicall"
import { getIPFSJson } from '../../utils/ipfs'
import {ChainId, Lottery, NFTDusk, NFTDuskKit, NFTHelper, NFTJustineDusk} from "../../web3/address"
import { Contract } from "ethers-multicall-x"
import { mainContext } from '../../reducer'
import DashBoardBanner from "../../components/dashboard/banner"
import ListData from '../../components/dashboard/listData'
import './index.less'
import {exhibitsList} from "../../config/nft";
import {useActiveWeb3React} from "../../web3";

export const getTokenURI = (tokenId) => {
  const multicall = getOnlyMultiCallProvider(ChainId.BSC)
  const contract = new Contract(NFTDusk.address, NFTDusk.abi)
  return multicall.all([contract.tokenURI(tokenId)]).then(data => processResult(data))
}

const DashBoard = () => {
  const { active, account, chainId } = useActiveWeb3React()
  const [listData, setListData] = useState([])
  const [equipData, setEquipData] = useState([])
  const { dispatch, state } = useContext(mainContext)
  const [showNftData, setShowNftData] = useState(null)

  const getListData = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(NFTHelper.address, NFTHelper.abi)
    multicall.all([contract.getAll(NFTJustineDusk.address, account), contract.getAll(NFTDusk.address, account)]).then(async data_ => {
      const data = processResult(data_)
      const dusks = []
      for (let i = 0; i < data.length; i++) {
        const [ids, urls] = data[i]
        console.log(data[i], ids, urls)
        for (let i = 0; i < ids.length; i++) {
          const duskItem = {
            tokenURI: urls[i],
            tokenId: ids[i],
          }
          await getIPFSJson(duskItem.tokenURI).then(res => {
            duskItem.content = res.data
            dusks.push(duskItem)
          })
        }
      }
      console.log(dusks)
      setListData(dusks)
      setShowNftData(dusks[0])
    })
  }

  const getEquipData = () => {
    const filterEquipData = []
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(NFTDuskKit.address, NFTDuskKit.abi)
    const calls = exhibitsList.reduce((list, item)=>{
      list.push(
        contract.balanceOf(account, item.id),
        contract.uri(item.id)
      )
      return list
    }, [])
    multicall.all(calls).then(data => {
      data = processResult(data)
      // const tokenURI = data[4].toString()
      // data = data.splice(0, 4)
      const exhibitsPromise = []
      for (let i = 0; i < exhibitsList.length; i++) {
        exhibitsPromise.push(getIPFSJson(data[i*2+1] + `/${exhibitsList[i].id}.json`))
      }
      // data = ['0', '0', '0', '0']
      Promise.all(exhibitsPromise)
      .then(res => {
        for (let i = 0; i < exhibitsList.length; i++) {
          res[i].data.count = data[i*2]
          filterEquipData.push(res[i].data)
        }
        setEquipData(filterEquipData)
      })
    })
  }

  useMemo(() => {
    if(account){
      getListData(account)
      getEquipData()
    }
  }, [active, account, state.duskClaimStatus])

  return (
    <div className='dashboard-page'>
      <Header/>
      <DashBoardBanner listData={showNftData} refreshNftData={getListData} />
      <ListData
        listData={listData}
        equipData={equipData}
        setShowNftData={setShowNftData}
      />
    </div>
  )
}

export default injectIntl(DashBoard)
