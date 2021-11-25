import React from "react";
import {exhibitsList} from "../../../config/nft";
import './index.less'
import cs from "classnames";

export default function BlindBoxNft({isShow, claimId}) {
  const data_ = exhibitsList.filter(item => item.id === claimId)
  if (data_.length === 0) {
    return  null
  }
  const data = data_[0]
  return (
    <div className={cs({
      "blind-box-c": true,
      'show': isShow
    })}>
      <div>
        {data.effect && <img src={data.effect} alt="" className="blind-box-c-effect"/>}
        <img src={data.nft} alt="" className="blind-box-c-nft"/>
      </div>
    </div>
  )
}
