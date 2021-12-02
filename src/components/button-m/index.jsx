import React from "react";
import {useActiveWeb3React} from "../../web3";
import {getScanName} from "../../web3/address";
import {changeNetwork} from "../../web3/connectors";
import './index.less'
import cs from "classnames";

export default function ButtonM({className, chainId: chainId_, onClick, children}){
  const {chainId} = useActiveWeb3React()
  const onConfirm = () => {
    if (chainId !== chainId_) {
      changeNetwork(chainId_)
    } else {
      onClick && onClick()
    }
  }
  return (
    <div className={cs(className, 'button-m', chainId !== chainId_ && 'switch')} onClick={onConfirm}>
      {chainId !== chainId_ ? `Switch To ${getScanName(chainId_)}` : children}
    </div>
  )
}
