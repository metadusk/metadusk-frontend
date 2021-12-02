import React from "react";
import {useActiveWeb3React} from "../../web3";
import {ChainId, getScanName} from "../../web3/address";
import {changeNetwork} from "../../web3/connectors";

export default function ButtonM({className, chainId: chainId_, onClick, children}){
  const {chainId} = useActiveWeb3React()
  const onConfirm = () => {
    if (chainId !== chainId_ && chainId !== ChainId.LOCALHOST) {
      changeNetwork(chainId_)
    } else {
      onClick()
    }
  }
  return (
    <div className={className} onClick={onConfirm}>
      {chainId !== chainId_ && chainId !== ChainId.LOCALHOST ? `Switch To ${getScanName(chainId_)}` : children}
    </div>
  )
}
