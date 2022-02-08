import React, { useMemo } from "react";
import Header from "../../components/header";
import Content from "../../components/farm/content";
import Footer from "../../components/footer";
import "./index.less";
import { ChainId } from "../../web3/address";
import { changeNetwork } from "../../web3/connectors";
import { useWeb3React } from "@web3-react/core";
const Farm = () => {
  const { account, chainId, library } = useWeb3React();
  useMemo(() => {
    if (chainId !== ChainId.BSC) {
      changeNetwork(ChainId.BSC);
    }
  }, [chainId]);
  return (
    <div className="farm-page">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
export default Farm;
