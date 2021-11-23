import React, {useState} from "react";
import './index.less'
import Header from "../../components/header";
import LightningImg from '../../assets/image/blind-box/lightning.png'
import UnknownImg from '../../assets/image/blind-box/unknown.png'
import cs from "classnames";

export default function BlindBox(){
  const [status, setStatus] = useState('static')
  const onOpen = () => {
    setStatus('active')
    setTimeout(() => {
      setStatus('active active2')
      setTimeout(() => {
        setStatus('active active2 active3')
      }, 500)
    }, 3000)
  }
  return (
    <div className="blind-box">
      <Header />
      <div className="blind-box-main">
        <div className={cs('box-view', status)}>
          <div className="box">
            <div></div>
            <div></div>
            <div><img src={LightningImg} alt=""/></div>
            <div><img src={LightningImg} alt=""/></div>
            <div><img src={UnknownImg} alt=""/></div>
            <div><img src={UnknownImg} alt=""/></div>
          </div>
        </div>
      </div>
      <div className="lottery-btn" onClick={onOpen}>
        Open
      </div>
    </div>
  )
}
