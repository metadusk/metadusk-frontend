import React, { useEffect, useState } from "react";
import { useActiveWeb3React } from "../../../web3";
import { getIPFSJson } from "../../../utils/ipfs";
import { message, Modal } from "antd";
import EquipModal from "../../farm-modal/equip-modal";
import { FormattedMessage, injectIntl } from "react-intl";
import { LoadingOutlined } from "@ant-design/icons";
import {
  ALL_DUSK,
  ChainId,
  Lottery,
  NFTDusk,
  NFTDuskKit,
  NFTHelper,
  NFTJustineDusk,
  NFTSantaPunkDusk,
  NFTStake,
  NFTStakeToken,
  ADDRESS_INFINITY,
} from "../../../web3/address";
import { multicallClient, ClientContract } from "../../../web3/multicall";
import { exhibitsList, JustineDuskExhibits } from "../../../config/nft";
import { getContract } from "../../../web3";
import { formatAmount } from "../../../utils/format";
import "./index.less";
const SwapNftAddress = "0x6C4a15dF23de8ae48E0ebF0F9CE44bD484D3C876";
const FarmContent = () => {
  const { active, library, account, chainId } = useActiveWeb3React();
  const [listData, setListData] = useState([]);
  const [stakeListData, setStakeListData] = useState([]);
  const [equipData, setEquipData] = useState([]);
  const [currentData, setCurrentDataData] = useState({});
  const [actionType, setActionType] = useState("");
  const [stakeTokenStatus, setStakeTokenStatus] = useState(false);
  const [showEquipModal, setShowEquipModal] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [kitsTokenBalance, setKitsTokenBalance] = useState(0);
  const [duskTokenBalance, setDuskTokenBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const getDashBord = () => {
    console.log("Info My Data Refresh Success ~~~~~~~~~~~~");
    const StakeTokenContract = new ClientContract(
      NFTStakeToken.abi,
      NFTStakeToken.address,
      ChainId.BSC
    );
    const NFTDuskKitContract = new ClientContract(
      NFTDuskKit.abi,
      NFTDuskKit.address,
      ChainId.BSC
    );
    const NFTDuskContract = new ClientContract(
      NFTDusk.abi,
      NFTDusk.address,
      ChainId.BSC
    );
    const NFTJustineDuskContract = new ClientContract(
      NFTJustineDusk.abi,
      NFTJustineDusk.address,
      ChainId.BSC
    );
    const NFTSantaPunkDuskContract = new ClientContract(
      NFTSantaPunkDusk.abi,
      NFTSantaPunkDusk.address,
      ChainId.BSC
    );
    const calls = [
      StakeTokenContract.balanceOf(account),
      NFTDuskContract.balanceOf(account),
      NFTJustineDuskContract.balanceOf(account),
      NFTSantaPunkDuskContract.balanceOf(account),
    ];

    multicallClient(calls).then(async (data) => {
      const [
        TokenBalance,
        NFTDuskBalance,
        NFTJustineDuskBalance,
        NFTSantaPunkDuskBalance,
      ] = data;
      const fixTokenBalance = formatAmount(TokenBalance);
      setTokenBalance(fixTokenBalance);
      const duskTokenBalance =
        NFTDuskBalance * 10 +
        NFTJustineDuskBalance * 100 +
        NFTSantaPunkDuskBalance * 100;
      setDuskTokenBalance(duskTokenBalance);
    });
    const kits = [];
    exhibitsList.forEach((item) => {
      kits.push(NFTDuskKitContract.balanceOf(account, item.id));
    });
    multicallClient(kits).then(async (data) => {
      const kisVolume = data.reduce((prev, next) => {
        return prev * 1 + next * 1;
      });
      setKitsTokenBalance(kisVolume * 10);
    });
  };
  // My 721 NFT
  const getListData = () => {
    console.log("Info My Dusk NFT Refresh Success ~~~~~~~~~~~~");
    const contract = new ClientContract(
      NFTHelper.abi,
      NFTHelper.address,
      ChainId.BSC
    );
    const calls = [],
      status = [];
    for (let i = 0; i < ALL_DUSK.length; i++) {
      const ApproveContract721 = new ClientContract(
        NFTJustineDusk.abi,
        ALL_DUSK[i].address,
        ChainId.BSC
      );
      calls.push(contract.getAll(ALL_DUSK[i].address, account));
      status.push(
        ApproveContract721.isApprovedForAll(account, NFTStake.address)
      );
    }
    multicallClient([...calls, ...status]).then(async (data) => {
      const dusks = [];
      for (let i = 0; i < data.length / 2; i++) {
        const [ids, urls] = data[i];
        for (let j = 0; j < ids.length; j++) {
          const duskItem = {
            tokenURI: urls[j].split("/").pop(),
            tokenId: ids[j],
            address: ALL_DUSK[i].address,
            status: data[i * 1 + calls.length * 1],
            index: i,
          };
          console.log(duskItem);
          await getIPFSJson(duskItem.tokenURI).then((res) => {
            duskItem.content = res.data;
            dusks.push(duskItem);
          });
        }
      }
      console.log(dusks);
      setListData(dusks);
    });
  };
  // My Stake 721 NFT
  const getStakeListData = () => {
    console.log("Info My Stake Dusk NFT Refresh Success ~~~~~~~~~~~~");
    const StakeContract721 = new ClientContract(
      NFTStake.abi,
      NFTStake.address,
      ChainId.BSC
    );
    const contract = new ClientContract(
      NFTHelper.abi,
      NFTHelper.address,
      ChainId.BSC
    );
    const calls = [];
    for (let i = 0; i < ALL_DUSK.length; i++) {
      calls.push(contract.getAll(ALL_DUSK[i].address, account));
    }
    multicallClient([StakeContract721.getAllstakeNfts(account)]).then(
      async (data) => {
        const dusks = [];
        data = data[0];
        const indexs = data[0];
        const tokenids = data[1];
        // const dusks = [];
        for (let i = 0; i < indexs.length; i++) {
          const duskItem = {
            tokenURI: ALL_DUSK[indexs[i]].photo,
            tokenId: tokenids[i],
            address: ALL_DUSK[indexs[i]].address,
            index: indexs[i],
          };
          await getIPFSJson(duskItem.tokenURI).then((res) => {
            duskItem.content = res.data;
            dusks.push(duskItem);
          });
        }
        setStakeListData(dusks);
      }
    );
  };
  // My 1155 NFT
  const getEquipData = () => {
    const filterEquipData = [];
    const contract = new ClientContract(
      NFTDuskKit.abi,
      NFTDuskKit.address,
      ChainId.BSC
    );
    const stakecontract = new ClientContract(
      NFTStake.abi,
      NFTStake.address,
      ChainId.BSC
    );
    const calls = exhibitsList.reduce((list, item) => {
      list.push(contract.balanceOf(account, item.id), contract.uri(item.id));
      return list;
    }, []);

    multicallClient([...calls, stakecontract.getAllstake1155s(account)]).then(
      (data) => {
        const exhibitsPromise = [];
        const allStake1155 = data[data.length - 1];
        for (let i = 0; i < exhibitsList.length; i++) {
          let url = data[i * 2 + 1];
          if (url.indexOf("https") === 0) {
            const url_ = url.split("/");
            url = url_[url_.length - 2];
          }
          exhibitsPromise.push(
            getIPFSJson(url + `/${exhibitsList[i].id}.json`)
          );
        }
        Promise.all(exhibitsPromise).then((res) => {
          for (let i = 0; i < exhibitsList.length; i++) {
            res[i].data.count = data[i * 2];
            res[i].data.id = exhibitsList[i].id;
            let volIndexs = [],
              stake = 0;
            allStake1155[0].some((item, index) => {
              if (item === res[i].data.id) {
                volIndexs.push(index);
              }
            });

            volIndexs.forEach((item) => {
              stake += allStake1155[1][item] * 1;
            });
            res[i].data.stake = stake;
            filterEquipData.push(res[i].data);
          }
          setEquipData(filterEquipData);
        });
      }
    );
  };
  // StakeToken Apporve Status
  const getStakeTokenStatus = () => {
    // 1155
    const ApproveContract1155 = getContract(
      library,
      NFTStakeToken.abi,
      NFTStakeToken.address
    );
    ApproveContract1155.methods
      .allowance(account, NFTStake.address)
      .call()
      .then((res) => {
        if (res * 1 > 0) {
          setStakeTokenStatus(true);
        } else {
          setStakeTokenStatus(false);
        }
      });
  };
  // Stake 1155 NFT
  const handleClickStakeEquip = (data) => {
    setCurrentDataData(data);
    setActionType(1);
    setShowEquipModal(true);
  };
  // UnStake 1155 NFT
  const handleClickUnStakeEquip = (data) => {
    setCurrentDataData(data);
    setActionType(2);
    setShowEquipModal(true);
  };
  // Stake 721 NFT
  const handleClickStakeNFT = (data) => {
    setLoading(true);
    if (data.status) {
      const StakeContracts = getContract(
        library,
        NFTStake.abi,
        NFTStake.address
      );
      StakeContracts.methods
        .nftStake(data.index, data.tokenId)
        .send({ from: account })
        .on("receipt", async (_, receipt) => {
          message.success("success");
          getListData();
          getStakeListData();
          getDashBord();
          setLoading(false);
        })
        .on("error", (err, receipt) => {
          message.success("error");
        });
    } else {
      const ApproveContracts = getContract(
        library,
        NFTDuskKit.abi,
        data.address
      );
      ApproveContracts.methods
        .setApprovalForAll(NFTStake.address, true)
        .send({ from: account })
        .on("receipt", async (_, receipt) => {
          getListData();
          getStakeListData();
          message.success("success");
          setLoading(false);
        })
        .on("error", (err, receipt) => {});
    }
  };

  // UnStake 721 NFT
  const handleClickUnStakeNFT = (data) => {
    setLoading(true);
    if (stakeTokenStatus) {
      const StakeContracts = getContract(
        library,
        NFTStake.abi,
        NFTStake.address
      );
      StakeContracts.methods
        .nftUnStake(data.index, data.tokenId)
        .send({ from: account })
        .on("receipt", async (_, receipt) => {
          getListData();
          getStakeListData();
          message.success("success");
          getDashBord();
          setLoading(false);
        })
        .on("error", (err, receipt) => {
          message.success("error");
        });
    } else {
      const ApproveContracts = getContract(
        library,
        NFTStakeToken.abi,
        NFTStakeToken.address
      );
      ApproveContracts.methods
        .approve(NFTStake.address, ADDRESS_INFINITY)
        .send({ from: account })
        .on("receipt", async (_, receipt) => {
          message.success("success");
          getStakeListData();
          setStakeTokenStatus(true);
          setLoading(false);
        })
        .on("error", (err, receipt) => {});
    }
  };
  const reloadData = () => {
    getEquipData();
    getDashBord();
    console.log("Refresh Success ~~~~~~~~~~~~~~~~~~");
  };
  useEffect(() => {
    if (account && library) {
      getDashBord();
      getListData();
      getStakeListData();
      getEquipData();
      getStakeTokenStatus();
    }
  }, [account]);
  return (
    <div className="farm-content">
      <div className="farm-content-wrap">
        <div className="swap-token">
          <p>
            <span>
              <FormattedMessage id="farm1" />
            </span>
          </p>
        </div>
        <div className="token-balance">
          <div className="token-balance-mine">
            <FormattedMessage id="farm2" />：<span>{tokenBalance}</span>
          </div>
          <div className="token-balance-swap">
            <FormattedMessage id="farm3" />：
            <span>{kitsTokenBalance + duskTokenBalance}</span>
          </div>
        </div>
        <div className="swap-title">
          <div>
            <p>
              <FormattedMessage id="farm4" />
            </p>
          </div>
          <p></p>
        </div>
        <div className="nft-balance">
          {listData &&
            listData.map((item, index) => (
              <div className="nft-dusk" key={"swap" + index}>
                <div className="nft-dusk-card">
                  <img src={item.content.image} alt="" />
                </div>
                <button
                  className="nft-swap-btn"
                  onClick={() => handleClickStakeNFT(item)}
                >
                  {loading && (
                    <LoadingOutlined style={{ marginRight: "5px" }} />
                  )}
                  {item.status ? (
                    <FormattedMessage
                      id="farm6"
                      values={{
                        num:
                          item.address.toLowerCase() ===
                          NFTDusk.address.toLowerCase()
                            ? 10
                            : 100,
                      }}
                    />
                  ) : (
                    "Approve NFT"
                  )}
                </button>
              </div>
            ))}
          {stakeListData &&
            stakeListData.map((item, index) => (
              <div className="nft-dusk" key={"stake" + index}>
                <div className="nft-dusk-card">
                  <img
                    src={`https://cloudflare-ipfs.com/ipfs/` + item.tokenURI}
                    alt=""
                  />
                </div>
                <button
                  className="nft-swap-btn"
                  onClick={() => handleClickUnStakeNFT(item)}
                >
                  {loading && (
                    <LoadingOutlined style={{ marginRight: "5px" }} />
                  )}
                  {stakeTokenStatus ? `Withdraw` : "Approve Card"}
                </button>
              </div>
            ))}
        </div>
        <div className="swap-title">
          <div>
            <p>
              <FormattedMessage id="farm7" />
            </p>
          </div>
          <p></p>
        </div>
        <div className="equip-balance">
          {equipData.map((item, index) => (
            <div className="equip-dusk" key={index}>
              <div className="equip-dusk-card">
                <img src={item.image} alt="" />
              </div>
              <div className="content">
                <button
                  className="equip-swap-btn"
                  onClick={() => handleClickStakeEquip(item)}
                >
                  <FormattedMessage id="farm9" />({item.count})
                </button>
                <button
                  className="equip-swap-btn"
                  onClick={() => handleClickUnStakeEquip(item)}
                >
                  <FormattedMessage id="farm10" />({item.stake})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EquipModal
        setVisible={setShowEquipModal}
        visible={showEquipModal}
        currentData={currentData}
        actionType={actionType}
        reloadData={reloadData}
      />
    </div>
  );
};
export default FarmContent;
