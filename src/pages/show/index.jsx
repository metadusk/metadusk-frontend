import React from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Content from "../../components/show/content";
import "./index.less";
const show = () => {
  return (
    <div className="show-page">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default show;
