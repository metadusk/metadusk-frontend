import React, {useEffect, useMemo, useRef} from "react";
import './index.less'
import JustineDusk from '../../../assets/image/home/justine_dusk.png'
import XmasPunk from '../../../assets/image/home/xmas_punk.png'
import TitanA from '../../../assets/image/home/titan_a.png'

import cs from 'classnames'
import { Carousel } from 'antd';

export default function Block3({active}){
  const ref = useRef()
  useEffect(() => {
    const interval = setInterval(() => {
      ref.current && ref.current.next()
    }, 3000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  return (
    <div className="show-product-dusk">
      <Carousel autoplay={false} ref={ref}>
        <div className={cs({"justine-dusk": true, active: true})}>
          <div className="banner-light">
            Xmas punk
          </div>
          <img src={XmasPunk} alt=""/>
        </div>
        <div className={cs({"justine-dusk": true, active: true})}>
          <div className="banner-light">
            Justine Dusk
          </div>
          <img src={JustineDusk} alt=""/>
        </div>
        <div className={cs({"justine-dusk": true, active: true})}>
          <div className="banner-light">
            Titan A
          </div>
          <img src={TitanA} alt=""/>
        </div>
      </Carousel>
    </div>
  )
}
