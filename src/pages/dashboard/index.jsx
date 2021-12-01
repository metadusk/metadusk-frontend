import React, {useContext, useState, useMemo} from 'react'
import { useWeb3React } from "@web3-react/core"
import { injectIntl } from 'react-intl'
import Header from "../../components/header";
import { getOnlyMultiCallProvider, processResult } from "../../web3/multicall"
import { getIPFSJson } from '../../utils/ipfs'
import {ChainId, NFTDusk, NFTDuskKit, NFTHelper} from "../../web3/address"
import { Contract } from "ethers-multicall-x"
import { mainContext } from '../../reducer'
import DashBoardBanner from "../../components/dashboard/banner"
import ListData from '../../components/dashboard/listData'
import './index.less'

export const getTokenURI = (tokenId) => {
  const multicall = getOnlyMultiCallProvider(ChainId.BSC)
  const contract = new Contract(NFTDusk.address, NFTDusk.abi)
  return multicall.all([contract.tokenURI(tokenId)]).then(data => processResult(data))
}

const DashBoard = () => {
  const { active, account, chainId } = useWeb3React()
  const [listData, setListData] = useState([])
  const [equipData, setEquipData] = useState([])
  const { dispatch, state } = useContext(mainContext)
  const [showNftData, setShowNftData] = useState(null)

  const getListData = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(NFTHelper.address, NFTHelper.abi)
    multicall.all([contract.getAll(NFTDusk.address, account)]).then(async data_ => {
      const [[ids, urls]] = processResult(data_)
      // console.log(ids, urls)
      const dusks = []
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
      setListData(dusks)
      setShowNftData(dusks[0])
    })
  }

  const getEquipData = () => {
    const filterEquipData = []
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(NFTDuskKit.address, NFTDuskKit.abi)
    multicall.all([contract.balanceOf(account, 1), contract.balanceOf(account, 2), contract.balanceOf(account, 3), contract.balanceOf(account, 4), contract.uri(1)]).then(data => {
      data = processResult(data)
      const tokenURI = data[4].toString()
      data = data.splice(0, 4)
      // data = ['0', '0', '0', '0']
      Promise.all([getIPFSJson(tokenURI + '/1.json'), getIPFSJson(tokenURI + '/2.json'), getIPFSJson(tokenURI + '/3.json'), getIPFSJson(tokenURI + '/4.json')])
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].data.count = data[i]
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
