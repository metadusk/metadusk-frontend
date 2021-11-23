import React from "react";
import './index.less'
import cx from 'classnames'
const createItems = (count, name) => {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push(<div key={i} style={{transition: ` all 300ms ease ${i*50}ms`}}/>)
  }
  return items
}
export default function NftCard(props){
  const {nftData, maxCount} = props
  return (
    <div className={cx(nftData.name, 'nft-card')}>
      {createItems(maxCount, nftData.name)}
    </div>
  )
}
