import React, { useMemo, useState} from 'react'
import cs from 'classnames'
import { useWeb3React } from "@web3-react/core"
import { FormattedMessage, injectIntl } from 'react-intl'
import JustineDus from '../../../assets/image/dashboard/JustineDus@2x.png'
import Dusk from '../../../assets/image/dashboard/Dusk@2x.png'
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
  const [mintData, setMintData] = useState([])
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

        {tabFlag === 'equip' && equipData.length ? (
          <div className='content_center'>
            <div className='wedding_dress dush'>
              <img
                src={
                  require(`../../../assets/image/dashboard/WeddingDress@2x.png`)
                    .default
                }
              />
              <p className='content'>
                <p className='text_transform'>
                  <span className='title'>
                    <FormattedMessage id='dashboard12' />
                  </span>
                  <span className='describe'>
                    元宇宙公元 1024 年,
                    在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种,
                    该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定,
                    变异极其频繁, 不出时年就衍生出来数十万种奇异种族,
                    有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……
                  </span>
                </p>
              </p>
            </div>
            <div className='dush wedding_veil'>
              <img
                src={
                  require(`../../../assets/image/dashboard/WeddingDress@2x.png`)
                    .default
                }
              />
              <p className='content'>
                <p className='text_transform'>
                  <span className='title'>
                    <FormattedMessage id='dashboard12' />
                  </span>
                  <span className='describe'>
                    元宇宙公元 1024 年,
                    在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种,
                    该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定,
                    变异极其频繁, 不出时年就衍生出来数十万种奇异种族,
                    有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……
                  </span>
                </p>
              </p>
            </div>
            <div className='grab dush'>
              <img
                src={
                  require(`../../../assets/image/dashboard/WeddingDress@2x.png`)
                    .default
                }
              />
              <p className='content'>
                <p className='text_transform'>
                  <span className='title'>
                    <FormattedMessage id='dashboard12' />
                  </span>
                  <span className='describe'>
                    元宇宙公元 1024 年,
                    在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种,
                    该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定,
                    变异极其频繁, 不出时年就衍生出来数十万种奇异种族,
                    有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……
                  </span>
                </p>
              </p>
            </div>
            <div className='cigarette dush'>
              <img
                src={
                  require(`../../../assets/image/dashboard/WeddingDress@2x.png`)
                    .default
                }
              />
              <p className='content'>
                <p className='text_transform'>
                  <span className='title'>
                    <FormattedMessage id='dashboard12' />
                  </span>
                  <span className='describe'>
                    元宇宙公元 1024 年,
                    在特斯拉星云中的一个富饶的行星上孵化出一个神奇物种,
                    该物种是一种能够直立行走的扁嘴动物, 这种动物基因不够稳定,
                    变异极其频繁, 不出时年就衍生出来数十万种奇异种族,
                    有的智慧超群, 有的性格暴力,有的酷爱时尚,有的……
                  </span>
                </p>
              </p>
            </div>
          </div>
        ) : (
          tabFlag === 'equip' && (
            <p className='no_data'>
              Coming Soon
              {/* <FormattedMessage id='dashboard13' /> */}
            </p>
          )
        )}
        {tabFlag === 'casting' && mintData.length ? (
          <div className='dashboard-list_data_JustineDus'>
            <div className='dusk_upgrade'>
              <img className='dusk_png' src={Dusk} />
              <p className='lightning'></p>
              <img className='dusk_png' src={JustineDus} />
            </div>
            <div className='dusk_equipment'>
              <p className='naked_duck'>
                <img src={Dusk} />
                <span className='dusk_equipment_number'>
                  X<i>1</i>
                </span>
              </p>
            </div>
            <div className='dusk_equipment dusk_equipment_box'>
              <p className='naked_duck naked_duck_equipment_1'>
                <img src={Dusk} />
                <span className='dusk_equipment_number'>
                  X<i>1</i>
                </span>
              </p>
              <p className='naked_duck naked_duck_equipment_2'>
                <img src={Dusk} />
                <span className='dusk_equipment_number'>
                  X<i>1</i>
                </span>
              </p>
              <p className='naked_duck naked_duck_equipment_3'>
                <img src={Dusk} />
                {/* <span className='dusk_equipment_number'>
                  X<i>1</i>
                </span> */}
                <Link to='/lbp' className='no_dusk_equipment'>
                  <FormattedMessage id='dashboard2' />
                </Link>
              </p>
              <p className='naked_duck naked_duck_equipment_4'>
                <img src={Dusk} />
                <span className='dusk_equipment_number'>
                  X<i>1</i>
                </span>
              </p>
              <a className='mint_btn'>
                <FormattedMessage id='dashboard14' />
              </a>
            </div>
          </div>
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
