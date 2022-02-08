import React, { useMemo, useState } from "react";
import "./index.less";
import { message, Modal } from "antd";
import { ChainId } from "../../../web3/address";
import { useWeb3React } from "@web3-react/core";
import { getContract } from "../../../web3";
import { LoadingOutlined } from "@ant-design/icons";
import {
  NFTDuskKit,
  NFTStake,
  NFTStakeToken,
  ADDRESS_INFINITY,
} from "../../../web3/address";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
          setLoading(false);
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
          setLoading(false);
        })
        .on("error", (err, receipt) => {
          setApproveStatus(false);
        });
    }
  };
  const handleClickAction = () => {
    if (!(equipVolume * 1)) {
      return;
    }
    setLoading(true);
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
          setLoading(false);
          reloadData();
        })
        .on("error", (err, receipt) => {
          message.success("error");
          setVisible(false);
          setLoading(false);
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
  const handleClickSetVolume = () => {
    if (actionType === 1) {
      console.log(currentData);
      setEquipVolume(currentData.count);
    }
    if (actionType === 2) {
      setEquipVolume(currentData.stake);
    }
  };
  useMemo(() => {
    if (visible && account) {
      getApproveStatus();
      if (actionType === 1) {
        setEquipVolume(currentData.count);
      }
      if (actionType === 2) {
        setEquipVolume(currentData.stake);
      }
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
        <p className="equip-token-id">
          Card: <span>10</span>
        </p>
      </div>
      <div className="equip-token-volume">
        <input
          type="text"
          value={equipVolume}
          disabled={actionType === 2}
          onChange={(e) => {
            setEquipVolume(e.target.value);
          }}
        />
        <span onClick={() => handleClickSetVolume()}>Max</span>
      </div>
      {approveStatus ? (
        <div className="equip-claim" onClick={() => handleClickAction()}>
          {loading && <LoadingOutlined style={{ marginRight: "5px" }} />}
          {actionType === 1 ? "Stake" : "Withdraw"}
        </div>
      ) : (
        <div className="equip-claim" onClick={() => handleClickApprove()}>
          {loading && <LoadingOutlined style={{ marginRight: "5px" }} />}
          Approve
        </div>
      )}
    </Modal>
  );
}
