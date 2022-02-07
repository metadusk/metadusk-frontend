import React from "react";
import Header from "../../components/header";
import Content from "../../components/farm/content";
import Footer from "../../components/footer";
import "./index.less";
const Farm = () => {
  return (
    <div className="farm-page">
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
export default Farm;
