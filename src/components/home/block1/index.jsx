import React, {useMemo, useState} from "react";
import './index.less'
import NftCard from "../../nft-card";

const nftBanner = [
  {
    name: 'helmet-duck',
    count: 29,
    showMenu: true
  },
  {
    name: 'metadusk',
    count: 49,
    showMenu: false
  }
]

const maxCount = nftBanner.reduce((max, item1) => item1.count > max ? item1.count : max, 0)
let timeOut = null

export default function Block1() {
  const [showIndex, setShowIndex] = useState(1)
  useMemo(() => {
    timeOut = setTimeout(() => {
      setShowIndex((showIndex + 1) % nftBanner.length)
    }, 4000)
    return () => {
      clearInterval(timeOut)
    }
  }, [showIndex])
  return (
    <div className='exhibition-view'>
      <div className='nft-view'>
        <NftCard nftData={nftBanner[showIndex]} maxCount={maxCount}/>
        <div className="nft-desc">The unpredictable power of Metaverse will give birth to a magic duck</div>
      </div>
    </div>
  )
}
