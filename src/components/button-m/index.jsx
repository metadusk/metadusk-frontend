import React from "react";
import {useActiveWeb3React} from "../../web3";
import {ChainId, getScanName} from "../../web3/address";
import {changeNetwork} from "../../web3/connectors";
import './index.less'
import cs from "classnames";

export default function ButtonM({className, chainId: chainId_, onClick, children, disabled}){
  const {chainId} = useActiveWeb3React()
  const isSwitch = chainId !== chainId_ && chainId !== ChainId.LOCALHOST
  const onConfirm = () => {
    if (disabled){
      return
    }
    if (isSwitch) {
      changeNetwork(chainId_)
    } else {
      onClick && onClick()
    }
  }
  return (
    <div className={cs(className, 'button-m', isSwitch && 'switch', disabled && 'disabled')} onClick={onConfirm}>
      {isSwitch ? `Switch To ${getScanName(chainId_)}` : children}
    </div>
  )
}
