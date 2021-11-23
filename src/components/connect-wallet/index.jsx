import React from "react";
import './index.less'
import MetamaskIcon from '../../assets/image/metamask.png'
import ViewIcon from '../../assets/image/svg/view.svg'
import CopyIcon from '../../assets/image/svg/copy.png'
import ButtonRedIcon from '../../assets/image/button_red.png'
import {injected, useConnectWallet} from "../../web3/connectors";
import {useWeb3React} from "@web3-react/core";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'
import {ChainId, getScanAddress} from "../../web3/address";

export default function ConnectWallet(props) {
  const {show, onClose} = props
  const connectWallet = useConnectWallet()
  const {chainId, active, account, deactivate} = useWeb3React()
  const defChainId = injected.supportedChainIds.includes(chainId) ? chainId : injected.supportedChainIds[0]
  const onConnectWallMetaMask = () => {
    connectWallet(injected, defChainId).then((res) => {
      res && onClose()
    })
  }

  if (!show) {
    return null
  }
  return (
    <div className="connect-wallet">
      <div className="connect-wallet-box">
        <div className="wallet-popup-close" onClick={onClose}>
          <span className="wallet-popup-close-x"/>
        </div>
        {
          active ? (
            <>
              <h2>Your wallet</h2>
              <h2>{account}</h2>
              <div className="wallet-address-menu">
                <a href={getScanAddress(chainId, account)} target="_blank" rel="noreferrer"><span>View on {chainId === ChainId.HECO ? 'HecoInfo' : 'BscScan'}</span> <img src={ViewIcon} alt=""/></a>
                <CopyToClipboard
                  text={account}
                  onCopy={() => {
                    message.success('copy success')
                  }}
                >
                <span>Copy Address <img src={CopyIcon} alt=""/></span>
                </CopyToClipboard>
              </div>
              <div className="wallet-logout" onClick={deactivate}>
                <img src={ButtonRedIcon} alt=""/>
                Logout
              </div>
            </>
          ) : (
              <>
                <h2>Connect to a wallet</h2>
                <div className="connect-metamask" onClick={onConnectWallMetaMask}>
                  <img src={MetamaskIcon} alt="Metamask"/>
                </div>
              </>
            )
        }
      </div>
    </div>
  )
}
