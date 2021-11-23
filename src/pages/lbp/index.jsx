import React from "react";
import Header from "../../components/header";
import LBPContent from "../../components/lbp/content";
import "./index.less";
const lbp = () => {
  return (
    <div className="lbp-page">
      <Header />
      <LBPContent />
    </div>
  );
};

export default lbp;
