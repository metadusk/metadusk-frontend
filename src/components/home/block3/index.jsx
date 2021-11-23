import React from "react";
import './index.less'
import JustineDusk from '../../../assets/image/home/justine_dusk.png'
import cs from 'classnames'

export default function Block3({active}){
  return (
    <div className={cs({"justine-dusk": true, active})}>
      <div className="banner-light">
        How to get it
      </div>
      <img src={JustineDusk} alt=""/>
    </div>
  )
}
