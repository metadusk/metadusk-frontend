import React, { useMemo, useState} from 'react'
import cs from 'classnames'
import { useWeb3React } from "@web3-react/core"
import { FormattedMessage, injectIntl } from 'react-intl'
import JustineDus from '../../../assets/image/dashboard/JustineDus@2x.png'
import Dusk from '../../../assets/image/dashboard/Dusk@2x.png'
import DuskMint from '../../../assets/image/dashboard/Dusk_Mint@2x.png'
import Footer from "../../footer"
import { Link } from 'react-router-dom'
import { getIPFSJson, getIPFSFile } from '../../../utils/ipfs'
import './index.less'
import Other from "../tabs/other";

const DashBoardListData = ({
  listData: _listData,
  equipData,
  setShowNftData,
}) => {
  const { active, account, chainId } = useWeb3React()
  const [tabFlag, setTabFlag] = useState('dush')
  const [listData, setListData] = useState([])
  const [equipDataNum, setEquipDataNum] = useState([])

  useMemo(() => {
    const map = {}
    const filterList = []
    for (let i = 0; i < _listData.length; i++) {
      if (!map[_listData[i].tokenURI]) {
        map[_listData[i].tokenURI] = _listData[i]
        map[_listData[i].tokenURI].count = 1
        filterList.push(map[_listData[i].tokenURI])
      } else {
        map[_listData[i].tokenURI].count = map[_listData[i].tokenURI].count + 1
      }
    }
    setListData(filterList)
  }, [_listData])

  useMemo(() => {
    let count = 0
    for (let i = 0; i < equipData.length; i++) {
      count = count + (equipData[i].count - 0)
    }
    setEquipDataNum(count)
  }, [equipData])
  return (
    <div className='dashboard-list'>
      <div className='dashboard-list_tab'>
        <a
          className={cs(
            'dashboard-list_tab_option dashboard-list_tab_option_dush',
            tabFlag === 'dush' && 'dashboard-list_tab_option_active'
          )}
          onClick={() => setTabFlag('dush')}
        >
          <span>
            <FormattedMessage id='dashboard9' />
          </span>
        </a>
        <a
          className={cs(
            'dashboard-list_tab_option dashboard-list_tab_option_dush',
            tabFlag === 'equip' && 'dashboard-list_tab_option_active'
          )}
          onClick={() => setTabFlag('equip')}
        >
          <span>
            <FormattedMessage id='dashboard10' />
          </span>
        </a>
        <a
          className={cs(
            'dashboard-list_tab_option dashboard-list_tab_option_dush',
            tabFlag === 'casting' && 'dashboard-list_tab_option_active'
          )}
          onClick={() => setTabFlag('casting')}
        >
          <span>
            <FormattedMessage id='dashboard11' />
          </span>
        </a>
        <a
          className={cs(
            'dashboard-list_tab_option dashboard-list_tab_option_dush tab_other',
            tabFlag === 'other' && 'dashboard-list_tab_option_active'
          )}
          onClick={() => setTabFlag('other')}
        >
          <span>
            <FormattedMessage id='dashboard16' />
          </span>
        </a>
      </div>

      <div className='dashboard-list_data'>
        {tabFlag === 'dush' && listData.length ? (
          <div className='dashboard-list_data_my_dush'>
            <div className='dashboard-list_data_my_dush_box'>
              {listData.map((item, index) => {
                return (
                  item &&
                  item.content && (
                    <div
                      className='dashboard-list_data_my_dush_content'
                      key={index}
                      onClick={() => setShowNftData(item)}
                    >
                      <img src={getIPFSFile(item.content.photo)} />
                      <p>{item.content.name}</p>
                      <span>
                        X<i>{item.count}</i>
                      </span>
                    </div>
                  )
                )
              })}
            </div>
            {/* <a><FormattedMessage id='dashboard14' /></a> */}
          </div>
        ) : (
          tabFlag === 'dush' && (
            <p className='no_data'>
              <FormattedMessage id='dashboard13' />
            </p>
          )
        )}

        {tabFlag === 'equip' && equipData.length && equipDataNum > 0 ? (
          <div className='content_center'>
            {equipData.map((item, index) => {
              if (item.count > 0) {
                const card_list = []
                for(let i = 0; i < item.count; i++){
                  card_list.push((
                    <div className={cs(item.name.replace(' ', '_'), 'dush')} key={index + '' + i}>
                      <img
                        src={getIPFSFile(item.photo)}
                      />
                      <div className='content'>
                        <p className='text_transform'>
                        <span className='title'>
                          {item.name}
                          {/* <FormattedMessage id='dashboard12' /> */}
                        </span>
                          <span className='describe'>
                          {item.introduction}
                        </span>
                        </p>
                      </div>
                    </div>
                  ))
                }
                return card_list
              }
            })}
          </div>
        ) : (
          tabFlag === 'equip' && (
            <p className='no_data'>
              {/*Coming Soon*/}
               <FormattedMessage id='dashboard13' /> 
            </p>
          )
        )}
        {tabFlag === 'casting' && listData.length && equipData.length ? (
          // <div className='dashboard-list_data_JustineDus'>
          //   <div className='dusk_upgrade'>
          //     <img className='dusk_png' src={Dusk} />
          //     <p className='lightning'></p>
          //     <img className='dusk_png' src={JustineDus} />
          //   </div>
          //   <div className='dusk_equipment'>
          //     <p className='naked_duck'>
          //       <img src={DuskMint} />
          //       <span className='dusk_equipment_number'>
          //         X<i>{listData[0].count }</i>
          //       </span>
          //     </p>
          //   </div>
          //   <div className='dusk_equipment dusk_equipment_box'>
          //     {
          //       equipData.map((item, index) => {
          //         return (
          //           <p className={cs(item.name.replace(' ', '_'), 'naked_duck')} key={index}>
          //             <img src={getIPFSFile(item.photo)} />
          //
          //             {
          //               item.count > 0 ? (
          //                 <span className='dusk_equipment_number'>
          //                   X<i>{item.count}</i>
          //                 </span>
          //               ) : (
          //                     <Link to='/lbp' className='no_dusk_equipment'>
          //                       <FormattedMessage id='dashboard2' />
          //                     </Link>
          //               )
          //             }
          //           </p>
          //         )
          //       })
          //     }
          //     <a className='mint_btn'>
          //       <FormattedMessage id='dashboard14' />
          //     </a>
          //   </div>
          // </div>
          <p className='no_data'>
            Coming Soon
            {/* <FormattedMessage id='dashboard13' /> */}
          </p>
        ) : tabFlag === 'casting' && (
            <p className='no_data'>
              Coming Soon
              {/* <FormattedMessage id='dashboard13' /> */}
            </p>
          )}
        <div style={{display: tabFlag === 'other' ? 'block' : 'none'}}>
          <Other />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default injectIntl(DashBoardListData)
