import React, {useContext, useMemo, useState} from "react";
import "./index.less";
import Logo from "../../assets/image/logo.png";
import ConnectWallet from "../connect-wallet";
import {useWeb3React} from "@web3-react/core";
import {formatAddress} from "../../utils/format";
import {Link, NavLink, useHistory} from "react-router-dom";
import cx from 'classnames'
import DropDownSvg from '../../assets/image/svg/drop_down.svg'
import cs from "classnames";
import { ChainId } from "../../web3/address";
import DefaultAvatar from "../../assets/image/avatar/default_dusk.png";
import BaseAvatar from "../../assets/image/avatar/base_dusk.png";
import JustineAvatar from "../../assets/image/avatar/justine_dusk.png";
import { changeNetwork } from "../../web3/connectors";
import WestarterNFTModal from "../claim-modal/westarter";
import HelmetNFTModal from "../claim-modal/helmet";
import MoreSvg from '../../assets/image/svg/more.svg'
import axios from "axios";
import {getIPFSJson} from "../../utils/ipfs";
import {getTokenURI} from "../../pages/dashboard";
import {mainContext} from "../../reducer";

export const navList = [
  {
    name: "LBP",
    route: "/lbp",
  },
  {
    name: 'Dashboard',
    route: '/dashboard',
  },
  {
    name: 'About us',
    route: '/aboutUs',
  }
]

const networksNameMap = {
  [ChainId.BSC]: "BSC",
  [ChainId.HECO]: "HECO",
  [ChainId.LOCALHOST]: "TEST",
};
const superNetworks = [ChainId.BSC, ChainId.HECO];

const avatarMap = {
  baseDusk: {
    ipfs: 'QmPBhcjN3imV3cUJXj9pEXCLp4GpAHV1gPEsotYctropew',
    avatar: BaseAvatar
  },
  justineDusk: {
    ipfs: 'QmNSxp98HNksN4KyV1xxh94MZrhicEv57Zwt7hHYsDykHH',
    avatar: JustineAvatar
  }
}

export default function Header(props) {

  const { dispatch, state } = useContext(mainContext)
  const history = useHistory()
  const [showContentWallet, setShowConnectWallet] = useState(false)
  const [showNetwork, setShowNetwork] = useState(false)
  const {account, chainId} = useWeb3React()
  const [westarterNftModal, setWestarterNftModal] = useState(false)
  const [helmetNftModal, setHelmetNftModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [avatar, setAvatar] = useState('')

  const getNFTData = () => {
    axios({
      method: 'post',
      url:
        'https://graph.metadusk.io/bsc/subgraphs/name/metadusk/dusk',
      data: {
        query: `{
          dusks(first: 1000, skip:0, where:{holder: "${account}"}) {
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
            const tokenURI = await getTokenURI(dusks[i].tokenId)
            if (tokenURI[0] === avatarMap.justineDusk.ipfs){
              setAvatar('justineDusk')
              return
            }
            if (tokenURI[0] === avatarMap.baseDusk.ipfs){
              setAvatar('baseDusk')
              return
            }
          }
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useMemo(() => {
    if (account){
      getNFTData()
    }
  }, [account, state.duskClaimStatus])


  const getAvatar = () => {
    return avatarMap[avatar] ? avatarMap[avatar].avatar : DefaultAvatar
  }

  const ConnectWall = () => (
    <React.Fragment>
      {
        account &&
        <div className={cs({"wallet-network": true, 'show': showNetwork})} onClick={() => setShowNetwork(!showNetwork)}>
          <span>{networksNameMap[chainId]}</span>
          <img src={DropDownSvg} alt=""/>
          <div className="network-select">
            {
              superNetworks.map((cId) => <div key={cId}  className={cs({
                'network-select-item': true,
                'active': chainId === cId
              })} onClick={() => {changeNetwork(cId);setShowMenu(false)}}>{networksNameMap[cId]}</div>)
            }
          </div>
        </div>
      }
      <div className="connect-wallet-btn"
           onClick={() => {setShowConnectWallet(true);setShowMenu(false)}}>{account ? formatAddress(account) : 'Connect Wallet'}</div>
    </React.Fragment>
  )

  const Nav = ({cl}) => (
    <ul className={cs("nav", cl)}>
      {navList.map((item, index) => (
        <li key={index}>
          <Link
            to={item.route}
            className={cx({
              active:
                history.location.pathname &&
                history.location.pathname.indexOf(item.route) === 0,
              "nav-item": true,
            })}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <div className="header">
      <Link to='/'>
        <img className="logo" src={Logo} />
      </Link>
      <Nav cl="nav-pc"/>
      <div className="nv-d"/>
      <div className="gift-view" onClick={() => setWestarterNftModal(true)} />
      <ConnectWall />
      <div className="header-avatar">
        <div className={cs({'more': true, 'show': showMenu})}>
          <img src={MoreSvg} alt="" onClick={() => setShowMenu(!showMenu)}/>
          <div className="connect-wall-menu-h5">
            <ConnectWall />
            <Nav cl="nav-h5"/>
          </div>
        </div>
        <NavLink to="/dashboard" className={cs({'avatar-box': true, active: history.location.pathname &&
            history.location.pathname.indexOf('/dashboard') === 0})}>
          <img src={getAvatar()} alt="" className="avatar"/>
        </NavLink>
      </div>
      <ConnectWallet
        show={showContentWallet}
        onClose={() => setShowConnectWallet(false)}
      />
      <WestarterNFTModal
        visible={westarterNftModal}
        setVisible={setWestarterNftModal}
      />
      <HelmetNFTModal setVisible={setHelmetNftModal} visible={helmetNftModal} />
    </div>
  );
}
