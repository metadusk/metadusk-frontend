import React, { useMemo, useState } from "react";
import "./index.less";
import { message, Modal } from "antd";
import { multicallClient, ClientContract } from "../../../web3/multicall";
import { ChainId } from "../../../web3/address";
import AirAllowListNFTAbi from "../../../web3/abi/AirAllowListNFT.json";
import WARBadgeAbi from "../../../web3/abi/WARBadge.json";
import { useWeb3React } from "@web3-react/core";
import cs from "classnames";
import { getContract } from "../../../web3";
import { changeNetwork } from "../../../web3/connectors";
import { LoadingOutlined } from "@ant-design/icons";
import { exhibitsList } from "../../../config/nft";
import {
  NFTDuskKit,
  NFTStake,
  NFTStakeToken,
  ADDRESS_INFINITY,
} from "../../../web3/address";
export const AirAllowListNFT = {
  address: "0x1dFaC1cCF1655F5812b8Aaba81Afb3A5D10272b9",
  abi: AirAllowListNFTAbi,
};
export const WARBadge = {
  address: "0xcc7dbBe86356f570aD0ba5937D764e64E9931593",
  abi: WARBadgeAbi,
  name: "WAR Badge",
  networkId: ChainId.HECO,
  tokenURI: "QmeysNksZt918bNbATm7RbYGq5RET8jp1iVTeYKtr4MpBv",
};

export function createDiv(n) {
  const list = [];
  for (let i = 0; i < n; i++) {
    list.push(<div key={i} />);
  }
  return list;
}

export default function WestarterNFTModal({
  visible,
  setVisible,
  currentData,
  actionType,
  reloadData,
}) {
  const { account, chainId, library } = useWeb3React();
  const [approveStatus, setApproveStatus] = useState(false);
  const [equipVolume, setEquipVolume] = useState("");

  const [received, setReceived] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState(null);

  const getApproveStatus = () => {
    if (actionType === 1) {
      const ApproveContract1155 = getContract(
        library,
        NFTDuskKit.abi,
        NFTDuskKit.address
      );
      ApproveContract1155.methods
        .isApprovedForAll(account, NFTStake.address)
        .call()
        .then((res) => {
          setApproveStatus(res);
        });
    }
    if (actionType === 2) {
      // StakeToken Apporve Status
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
            setApproveStatus(true);
          } else {
            setApproveStatus(false);
          }
        });
    }
  };
  const handleClickApprove = () => {
    if (actionType === 1) {
      const ApproveContracts = getContract(
        library,
        NFTDuskKit.abi,
        NFTDuskKit.address
      );
      ApproveContracts.methods
        .setApprovalForAll(NFTStake.address, true)
        .send({ from: account })
        .on("receipt", async (_, receipt) => {
          message.success("success");
          setApproveStatus(true);
        })
        .on("error", (err, receipt) => {
          setApproveStatus(false);
        });
    }
    if (actionType === 2) {
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
          setApproveStatus(true);
        })
        .on("error", (err, receipt) => {
          setApproveStatus(false);
        });
    }
  };
  const handleClickAction = () => {
    if (actionType === 1) {
      const StakeContracts = getContract(
        library,
        NFTStake.abi,
        NFTStake.address
      );
      StakeContracts.methods
        .n1155Stake(currentData.id, equipVolume)
        .send({ from: account })
        .on("receipt", async (_, receipt) => {
          message.success("success");
          setVisible(false);
          reloadData();
        })
        .on("error", (err, receipt) => {
          message.success("error");
          setVisible(false);
          reloadData();
        });
    }
    if (actionType === 2) {
      const StakeContracts = getContract(
        library,
        NFTStake.abi,
        NFTStake.address
      );
      StakeContracts.methods
        .n1155UnStake(currentData.id, equipVolume)
        .send({ from: account })
        .on("receipt", async (_, receipt) => {
          message.success("success");
          setVisible(false);
          reloadData();
        })
        .on("error", (err, receipt) => {
          message.success("error");
          setVisible(false);
          reloadData();
        });
    }
  };
  useMemo(() => {
    if (visible && account) {
      getApproveStatus();
    }
  }, [visible, account]);
  return (
    <Modal
      wrapClassName="equip-modal"
      centered={true}
      visible={visible}
      footer={null}
      closable={false}
      maskClosable={false}
    >
      <div className="wallet-popup-close" onClick={() => setVisible(false)}>
        <span className="wallet-popup-close-x" />
      </div>
      <div className="equip-main">
        <img src={currentData.image} alt="" />
      </div>
      <div className="equip-token-info">
        <p className="equip-token-name">
          <span>{currentData.name}</span>
        </p>
        <p className="equip-token-id">
          ID: <span>{currentData.id}</span>
        </p>
      </div>
      <div className="equip-token-volume">
        <input
          type="text"
          onChange={(e) => {
            setEquipVolume(e.target.value);
          }}
        />
        <span>Max</span>
      </div>
      {approveStatus ? (
        <div className="equip-claim" onClick={() => handleClickAction()}>
          {actionType === 1 ? "Stake" : "Withdraw"}
        </div>
      ) : (
        <div className="equip-claim" onClick={() => handleClickApprove()}>
          Approve
        </div>
      )}
    </Modal>
  );
}
