import React from "react";
import {exhibitsList} from "../../../config/nft";
import './index.less'
import cs from "classnames";
import {createDiv} from "../../claim-modal/westarter";

export default function BlindBoxNft({status, claimId}) {
  const data_ = exhibitsList.filter(item => item.id === claimId)
  if (status === 'static') {
    return (
      <div className="blind-box-s">
        {createDiv(20)}
      </div>
    )
  }
  if (data_.length === 0) {
    return null
  }
  const data = data_[0]
  return (
    <div className={cs({
      "blind-box-c": true,
      'show': status === 'claimed'
    })}>
      <div>
        {data.effect && <img src={data.effect} alt="" className="blind-box-c-effect"/>}
        <img src={data.nft} alt="" className="blind-box-c-nft"/>
      </div>
    </div>
  )
}
