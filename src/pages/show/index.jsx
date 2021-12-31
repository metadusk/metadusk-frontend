import React from "react";
import Header from "../../components/header";
import Content from "../../components/show/content";
import "./index.less";
const show = () => {
  return (
    <div className="show-page">
      <Header />
      <Content />
    </div>
  );
};

export default show;
