import React, {useState} from "react";
import './index.less'
import Header from "../../components/header";
// import cs from "classnames";
// import CommonBox from '../../components/blind-box/common-box'
// import FestivalBox from '../../components/blind-box/festival-box'
import BitBox from '../../components/blind-box/bit-box'


export default function BlindBox() {

  // const [tab, setTab] = useState('festival')
  return (
    <>
      <Header/>
      <div className="blind-box">
        {/*<div className="tabs">*/}
        {/*  <div className={cs(tab === 'festival' && 'tab-active')} onClick={() => setTab('festival')}>Xmas Punk Box</div>*/}
        {/*  <div className={cs(tab === 'common' && 'tab-active')} onClick={() => setTab('common')}>Justine Dusk Box</div>*/}
        {/*</div>*/}
        {/*{tab === 'common' && <CommonBox/>}*/}
        {/*{tab === 'festival' && <FestivalBox/>}*/}
        <BitBox/>
      </div>
    </>
  )
}
