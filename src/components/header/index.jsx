import React, { useContext, useMemo, useState } from "react";
import "./index.less";
import Logo from "../../assets/image/logo.png";
import ConnectWallet from "../connect-wallet";
import { useWeb3React } from "@web3-react/core";
import { formatAddress } from "../../utils/format";
import { Link, NavLink, useHistory } from "react-router-dom";
import cx from "classnames";
import DropDownSvg from "../../assets/image/svg/drop_down.svg";
import cs from "classnames";

import {ALL_DUSK, ChainId, NFTDusk, NFTHelper} from "../../web3/address";


import DefaultAvatar from "../../assets/image/avatar/default_dusk.png";
import BaseAvatar from "../../assets/image/avatar/base_dusk.png";
import JustineAvatar from "../../assets/image/avatar/justine_dusk.png";
import PunkAvatar from "../../assets/image/avatar/punk_dusk.png";
import { changeNetwork } from "../../web3/connectors";
import WestarterNFTModal from "../claim-modal/westarter";

import MoreSvg from "../../assets/image/svg/more.svg";
import { mainContext } from "../../reducer";
import { multicallClient, ClientContract } from "../../web3/multicall";


export const navList = [
  {
    name: "Auction",
    route: "/auction",
  },
  {
    name: "Dashboard",
    route: "/dashboard",
  },
  {
    name: "Blind Box",
    route: "/blindBox",
  },
  {
    name: "Show",
    route: "/show",
  },
  {
    name: "About us",
    route: "/aboutUs",
  },
];

const networksNameMap = {
  [ChainId.BSC]: "BSC",
  [ChainId.HECO]: "HECO",
  [ChainId.LOCALHOST]: "TEST",
};
const superNetworks = [ChainId.BSC, ChainId.HECO];

const avatarMap = {
  baseDusk: {
    ipfs: "QmYeiAviefcjEeBAT9dM1RmHxKGdAmLwJszWBKxq4q3fQy",
    ipfs_: "QmPBhcjN3imV3cUJXj9pEXCLp4GpAHV1gPEsotYctropew",//old
    avatar: BaseAvatar,
    iconName: 'baseDusk'
  },
  justineDusk: {
    ipfs: "QmZ7QBWMPE3mCHJEeEzQMAdznkAwNUQm9LYt8cjW3rXR5e",
    ipfs_: "QmNSxp98HNksN4KyV1xxh94MZrhicEv57Zwt7hHYsDykHH",//old
    avatar: JustineAvatar,
    iconMame: 'justineDusk'
  },
  santaDusk: {
    ipfs: "QmbNTMEHdFoiUJkx8A5DvEzi1rwXtArNcQEqtbKATXVViA",
    ipfs_: "QmWjyvXgCLEWgAtj6wCix36F1s8dRgiDkF8Dg1ZAKHS88y",//old
    avatar: PunkAvatar,
    iconName: 'punkDusk'
  },
};

const ConnectWall = ({
  account,
  showNetwork,
  setShowNetwork,
  chainId,
  setShowMenu,
  setShowConnectWallet,
}) => (
  <React.Fragment>
    {account && (
      <div
        className={cs({ "wallet-network": true, show: showNetwork })}
        onClick={() => setShowNetwork(!showNetwork)}
      >
        <span>{networksNameMap[chainId]}</span>
        <img src={DropDownSvg} alt="" />
        <div className="network-select">
          {superNetworks.map((cId) => (
            <div
              key={cId}
              className={cs({
                "network-select-item": true,
                active: chainId === cId,
              })}
              onClick={() => {
                changeNetwork(cId);
                setShowMenu(false);
              }}
            >
              {networksNameMap[cId]}
            </div>
          ))}
        </div>
      </div>
    )}
    <div
      className="connect-wallet-btn"
      onClick={() => {
        setShowConnectWallet(true);
        setShowMenu(false);
      }}
    >
      {account ? formatAddress(account) : "Connect Wallet"}
    </div>
  </React.Fragment>
);

const Nav = ({ cl, history }) => (
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
);

export default function Header() {
  const { dispatch, state } = useContext(mainContext);
  const history = useHistory();
  const [showContentWallet, setShowConnectWallet] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const { account, chainId } = useWeb3React();
  const [westarterNftModal, setWestarterNftModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [avatar, setAvatar] = useState("");

  const getNFTData = () => {
    const contract = new ClientContract(NFTHelper.abi, NFTHelper.address, ChainId.BSC);
    const calls = []
    for (let i = 0; i < ALL_DUSK.length; i++) {
      calls.push(contract.getAll(ALL_DUSK[i].address, account))
    }
    multicallClient(calls)
      .then(async (data_) => {
        let avatar_ = ''
        const [[duskIds], [justineIds], [punkIds]] = data_
        if (punkIds.length > 0) {
          avatar_ ="santaDusk"
        } else if (justineIds.length > 0) {
          avatar_ ="justineDusk"
        } else if (duskIds.length > 0) {
          avatar_ = "baseDusk"
        }
        setAvatar(avatar_)
      });
  };


  useMemo(() => {
    if (account) {
      getNFTData();
    }
  }, [account, state.duskClaimStatus]);
  const getAvatar = () => {
    return avatarMap[avatar] ? avatarMap[avatar].avatar : DefaultAvatar;
  };


  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={Logo} />
      </Link>
      <Nav cl="nav-pc" history={history} />
      <div className="nv-d" />
      <div className="gift-view" onClick={() => setWestarterNftModal(true)} />
      <ConnectWall
        account={account}
        showNetwork={showNetwork}
        setShowNetwork={setShowNetwork}
        chainId={chainId}
        setShowMenu={setShowMenu}
        setShowConnectWallet={setShowConnectWallet}
      />
      <div className="header-avatar">
        <div className={cs({ more: true, show: showMenu })}>
          <img src={MoreSvg} alt="" onClick={() => setShowMenu(!showMenu)} />
          <div className="connect-wall-menu-h5">
            <ConnectWall
              account={account}
              showNetwork={showNetwork}
              setShowNetwork={setShowNetwork}
              chainId={chainId}
              setShowMenu={setShowMenu}
              setShowConnectWallet={setShowConnectWallet}
            />
            <Nav cl="nav-h5" history={history} />
          </div>
        </div>
        <NavLink
          to="/dashboard"
          className={cs({
            "avatar-box": true,
            active:
              history.location.pathname &&
              history.location.pathname.indexOf("/dashboard") === 0,
          })}
        >
          <img src={getAvatar()} alt="" className="avatar" />
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
    </div>
  );
}
