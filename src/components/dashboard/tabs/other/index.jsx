import React, {useMemo, useState} from "react";
import {FormattedMessage} from "react-intl";
import {useActiveWeb3React} from "../../../../web3";
import {getOnlyMultiCallProvider, processResult} from "../../../../web3/multicall";
import {Contract} from "ethers-multicall-x";
import {WARBadge} from "../../../claim-modal/westarter";
import {getIPFSFile} from "../../../../utils/ipfs";
import './index.less'

const NFTList = [
  WARBadge
]

export default function Other() {
  const {account} = useActiveWeb3React()
  const [list, setList] = useState([])

  const getList = (nftConfig) => {
    const multicall = getOnlyMultiCallProvider(nftConfig.networkId)
    const contract = new Contract(nftConfig.address, nftConfig.abi)
    return new Promise((resolve, reject) => {
      multicall.all([contract.balanceOf(account)]).then(async data => {
        data = processResult(data)
        const count = data[0]
        if (data[0] > 0) {
          const resultList = []
          for (let i = 0; i < data[0]; i++) {
            const tokenId = await multicall.all([contract.tokenOfOwnerByIndex(account, 0)]).then(data2 => processResult(data2)[0])
            const img = await getIPFSFile(nftConfig.tokenURI)
            resultList.push({
              ...nftConfig,
              count,
              tokenId,
              img
            })
          }

          resolve(resultList)
        }
      }).catch(() => [])
    })
  }
  const getData = async () => {
    const list_ = []
    for (let i = 0; i < NFTList.length; i++) {
      const data = await getList(NFTList[i])
      list_.push(...data)
    }
    setList(list_)
  }

  useMemo(() => {
    if (account) {
      getData()
    }
  }, [account])
  if (list.length === 0) {
    return (
      <p className='no_data'>
        <FormattedMessage id='dashboard13'/>
      </p>
    )
  }
  return (
    <div className='dashboard-list_other'>
        {
          list.map((item, index) => (
            <div
              className='dashboard-list-other-item'
              key={index}
            >
              <div className="nft-head-img" style={{backgroundImage: `url(${item.img})`}}>
              </div>
              <p className="nft-name">{item.name}</p>
              <p className="nft-id">ID: <span>{item.tokenId}</span></p>
            </div>
          ))
        }
    </div>
  )
}
