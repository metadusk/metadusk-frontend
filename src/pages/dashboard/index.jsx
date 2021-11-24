import React, {useContext, useEffect, useState, useMemo, useRef} from 'react'
import cs from 'classnames'
import { useWeb3React } from "@web3-react/core"
import { FormattedMessage, injectIntl } from 'react-intl'
import Header from "../../components/header";
import { getOnlyMultiCallProvider, processResult } from "../../web3/multicall"
import { getIPFSJson, getIPFSFile } from '../../utils/ipfs'
import { ChainId } from "../../web3/address"
import { Contract } from "ethers-multicall-x"
import { mainContext } from '../../reducer'
import ERC721Abi from "../../web3/abi/ERC721.json"
import ERC1155Abi from "../../web3/abi/ERC1155.json"
import { DUSK_CLAIM_STATUS } from '../../const'
import DashBoardBanner from "../../components/dashboard/banner"
import ListData from '../../components/dashboard/listData'
import './index.less'
import axios from 'axios'

const ERC721Data = {
  address: '0xeDfbf15775a2E42E03d059Fb98DA6e92284de7be',
  abi: ERC721Abi
}

const ERC1155Data = {
  address: '0xEdA0B4dB9704EF54058E2E30Fb112eB2b4bF6D7E',
  abi: ERC1155Abi
}

export const getTokenURI = (tokenId) => {
  const multicall = getOnlyMultiCallProvider(ChainId.BSC)
  const contract = new Contract(ERC721Data.address, ERC721Data.abi)
  return multicall.all([contract.tokenURI(tokenId)]).then(data => processResult(data))
}
const DashBoard = () => {
  const { active, account, chainId } = useWeb3React()
  const [listData, setListData] = useState([])
  const [equipData, setEquipData] = useState([])
  const { dispatch, state } = useContext(mainContext)
  const [showNftData, setShowNftData] = useState(null)

  const getListData = (address) => {
    axios({
      method: 'post',
      url:
        'https://graph.metadusk.io/bsc/subgraphs/name/metadusk/dusk',
      data: {
        query: `{
          dusks(first: 1000, skip:0, where:{holder: "${address}"}) {
            id
            holder
            tokenId
          }
        }`,
      },
    })
      .then(async (res) => {
        if (res.data.data.dusks) {
          const dusks = res.data.data.dusks
          for (let i = 0; i < dusks.length; i++) {
            dusks[i].tokenURI = await getTokenURI(dusks[i].tokenId)
            if (dusks[i].tokenURI && dusks[i].tokenURI.indexOf('ipfs') !== -1) {
              dusks[i].tokenURI = dusks[i].tokenURI.replace('ipfs://', '')
            }
            if (dusks[i].tokenURI) {
              await getIPFSJson(dusks[i].tokenURI).then(res => {
                dusks[i].content = res.data
              })
            }
          }
          setListData(dusks)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getEquipDataIpfs = (address) => {
    axios({
      method: 'post',
      url: 'https://graph.metadusk.io/bsc/subgraphs/name/metadusk/dusk',
      data: {
        query: `{
          userEquipments(first: 1000, skip:0, , where:{address: "${address}"}) {
            id
            address
            tokenId
            amount
          }
        }`,
      },
    })
      .then(async (res) => {
        if (res.data.data.userEquipments) {
          // res.data.data.userEquipments.map((item) => {
          //   if (item.tokenURI.indexOf('ipfs') !== -1) {
          //     item.tokenURI = item.tokenURI.replace('ipfs://', '')
          //   }
          //   if (item.tokenURI) {
          //     // item.tokenURI有问题，需要传 id
          //     getIPFSJson(item.tokenURI).then((res) => {
          //       item.content = res.data
          //     })
          //   }
          // })
          const userEquipments = res.data.data.userEquipments
          for (let i = 0; i < userEquipments.length; i++) {
            userEquipments[i].tokenURI = await getTokenURI(
              userEquipments[i].tokenId
            )
            if (
              userEquipments[i].tokenURI &&
              userEquipments[i].tokenURI.indexOf('ipfs') !== -1
            ) {
              userEquipments[i].tokenURI = userEquipments[i].tokenURI.replace(
                'ipfs://',
                ''
              )
            }
            if (userEquipments[i].tokenURI) {
              await getIPFSJson(userEquipments[i].tokenURI).then((res) => {
                userEquipments[i].content = res.data
              })
            }
          }
          setEquipData(userEquipments)
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const getEquipData = () => {
    const filterEquipData = []
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(ERC1155Data.address, ERC1155Data.abi)
    multicall.all([contract.balanceOf(account, 1), contract.balanceOf(account, 2), contract.balanceOf(account, 3), contract.balanceOf(account, 4), contract.uri(1)]).then(data => {
      data = processResult(data)
      const tokenURI = data[4].toString()
      data = data.splice(0, 3)
      data = ['0', '0', '0', '0']
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

  const getShowNftData = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.BSC)
    const contract = new Contract(ERC721Data.address, ERC721Data.abi)
    multicall.all([contract.balanceOf(account)]).then(data => {
      data = processResult(data)
      if (data[0] > 0) {
        multicall.all([contract.tokenOfOwnerByIndex(account, data[0] - 1)]).then(async data2 => {
          const tokenId = processResult(data2)[0].toString()
          let tokenURI = await getTokenURI(tokenId)
          if (tokenURI.indexOf('ipfs') !== -1) {
            tokenURI = tokenURI.replace('ipfs://', '')
          }
          getIPFSJson(tokenURI).then(res => {
            const showNftData_ = {
              tokenURI,
              tokenId,
              id: tokenId,
              content: res.data
            }
            setShowNftData(showNftData_)
          })
        })
      }
    })
  }

  useMemo(() => {
    if(account){
      getListData(account)
      getShowNftData()
      // getEquipDataIpfs(account)
      getEquipData()
    }
  }, [active, account, state.duskClaimStatus])

  const refreshNftData = () => {
    getShowNftData()
  }
  return (
    <div className='dashboard-page'>
      <Header/>
      <DashBoardBanner listData={showNftData} refreshNftData={refreshNftData} />
      <ListData
        listData={listData}
        equipData={equipData}
        setShowNftData={setShowNftData}
      />
    </div>
  )
}

export default injectIntl(DashBoard)
