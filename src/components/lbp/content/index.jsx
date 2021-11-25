import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { message, Modal } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { VarContext } from "../../../context";
import {
  getOnlyMultiCallProvider,
  processResult,
} from "../../../web3/multicall";
import { ChainId } from "../../../web3/address";
import { Contract } from "ethers-multicall-x";
import { getContract } from "../../../web3/index";
import { fromWei, toWei, numToWei } from "../../../utils/format";
import DuskLbpAbi from "../../../web3/abi/LBP.json";
import "./index.less";
const DuskLBPList = {
  address: "0x11Aa37C18CbB280cF45Ebb4A8e9694a055474793",
  abi: DuskLbpAbi,
};

const LBPContent = () => {
  const { account, library, active } = useWeb3React();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [paused, setPaused] = useState(false);
  const [priceCut, setPriceCut] = useState(0);
  const [priceIncrement, setPriceIncrement] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const { blockHeight } = useContext(VarContext);
  const getDuskInfo = () => {
    const multicall = getOnlyMultiCallProvider(ChainId.BSC);
    const lbpInfoContract = new Contract(DuskLBPList.address, DuskLBPList.abi);
    const multicallList = [
      lbpInfoContract.currentPrice(),
      lbpInfoContract.paused(),
      lbpInfoContract.priceCut(),
      lbpInfoContract.priceIncrement(),
    ];
    multicall.all(multicallList).then((data) => {
      data = processResult(data);
      const [currentPrice, paused, priceCut, priceIncrement] = data;
      setCurrentPrice(fromWei(currentPrice).toString());
      setPaused(paused);
      setPriceCut(fromWei(priceCut).toString());
      setPriceIncrement(fromWei(priceIncrement).toString());
      setMinPrice(
        fromWei(currentPrice)
          .toFixed(4)
          .toString()
      );
      setMaxPrice(
        fromWei(currentPrice)
          .times(1.5)
          .toFixed(4, 0)
          .toString()
      );
    });
  };
  const confirm = () => {
    if (!account) {
      return;
    }
    // return;
    const lbpContract = getContract(
      library,
      DuskLBPList.abi,
      DuskLBPList.address
    );
    lbpContract.methods
      .bid()
      .send({ from: account, value: numToWei(maxPrice) })
      .on("receipt", async (_, receipt) => {
        message.success("success");
      })
      .on("error", (err, receipt) => {
        message.error("error");
      });
  };
  useEffect(() => {
    getDuskInfo();
  }, [blockHeight]);
  return (
    <div className="lbp-content">
      <div className="lbp-content-title">Auction</div>
      <div className="lbp-content-info">
        <div className="lbp-content-info-lt"></div>
        <div className="lbp-content-info-rt">
          <div className="lbp-content-info-rt-price">
            <span className="text">
              <FormattedMessage id="lbp" />
            </span>
            <div className="value">
              <span className="type">MIN</span>
              <span className="volume">{minPrice}&nbsp;BNB</span>
            </div>
            <div className="value">
              <span className="type">MAX</span>
              <span className="volume">{maxPrice}&nbsp;BNB</span>
            </div>
          </div>
          <div className="lbp-content-info-rt-button" onClick={() => confirm()}>
            CONFIRM
          </div>
          <div className="lbp-content-info-rt-tips tips-first">
            <FormattedMessage id="lbp1" />
          </div>
          <div className="lbp-content-info-rt-tips">
            <FormattedMessage id="lbp2" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default injectIntl(LBPContent);
