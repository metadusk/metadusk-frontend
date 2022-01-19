import React, {useContext, useState, useMemo} from 'react'
import { injectIntl } from 'react-intl'
import Header from "../../components/header";
import { multicallClient, ClientContract } from "../../web3/multicall"
import { getIPFSJson } from '../../utils/ipfs'
import {ALL_DUSK, ChainId, Lottery, NFTDusk, NFTDuskKit, NFTHelper, NFTJustineDusk} from "../../web3/address"
import { mainContext } from '../../reducer'
import DashBoardBanner from "../../components/dashboard/banner"
import ListData from '../../components/dashboard/listData'
import './index.less'
import {exhibitsList} from "../../config/nft";
import {useActiveWeb3React} from "../../web3";

const DashBoard = () => {
  const { active, account, chainId } = useActiveWeb3React()
  const [listData, setListData] = useState([])
  const [equipData, setEquipData] = useState([])
  const { dispatch, state } = useContext(mainContext)

  const getListData = () => {
    const contract = new ClientContract(NFTHelper.abi, NFTHelper.address, ChainId.BSC)

    const calls = []
    for (let i = 0; i < ALL_DUSK.length; i++) {
      calls.push(contract.getAll(ALL_DUSK[i].address, account))
    }

    multicallClient(calls).then(async data => {
      const dusks = []
      for (let i = 0; i < data.length; i++) {
        const [ids, urls] = data[i]
        for (let i = 0; i < ids.length; i++) {
          const duskItem = {
            tokenURI: urls[i].split('/').pop(),
            tokenId: ids[i],
          }
          await getIPFSJson(duskItem.tokenURI).then(res => {
            console.log('res', res)
            duskItem.content = res.data
            dusks.push(duskItem)
          })
        }
      }
      setListData(dusks)
    })
  }

  const getEquipData = () => {
    const filterEquipData = []
    const contract = new ClientContract(NFTDuskKit.abi, NFTDuskKit.address, ChainId.BSC)
    const calls = exhibitsList.reduce((list, item)=>{
      list.push(
        contract.balanceOf(account, item.id),
        contract.uri(item.id)
      )
      return list
    }, [])
    multicallClient(calls).then(data => {
      const exhibitsPromise = []
      for (let i = 0; i < exhibitsList.length; i++) {
        let url = data[i*2+1]
        if (url.indexOf('https') === 0){
          const url_ = url.split('/')
          url = url_[url_.length - 2]
        }
        exhibitsPromise.push(getIPFSJson(url + `/${exhibitsList[i].id}.json`))
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
      <DashBoardBanner listData={listData} refreshNftData={getListData} />
      <ListData
        listData={listData}
        equipData={equipData}
      />
    </div>
  )
}

export default injectIntl(DashBoard)
