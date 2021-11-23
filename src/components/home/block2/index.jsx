import React from "react";
import cs from 'classnames'
import './index.less'
import InitialDusk from '../../../assets/image/home/initial_dusk.png'
import Typewriter from "../../typewriter";

export default function Block2({active}){
  return (
    <div className="story-view">
      <div className={cs({'initial-dusk':true, active})}>
        <img src={InitialDusk} alt=""/>
      </div>
      <div className="origin-dusk">
        <Typewriter speed={50} showSubscript start={active} text="In the year 1024, a fancy specie on a fertile wonderland in the Tesla Nebula. The species is flat-billed and walk upright. Their genes were unstable and upgradable,such within a few years, tons of species popped out, some of which were extremely intelligent, some are furiously violent, some are deep into fashion, etc."/>
      </div>
    </div>
  )
}
