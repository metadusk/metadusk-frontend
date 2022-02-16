import React, {useContext, useState, useMemo} from 'react'
import { injectIntl } from 'react-intl'
import Header from "../../components/header";
import { mainContext } from '../../reducer'
import DashBoardBanner from "../../components/dashboard/banner"
import ListData from '../../components/dashboard/listData'
import './index.less'
import {useActiveWeb3React} from "../../web3";
import {getDashboardDusk, getDuskKitData, getFarmDusk} from "../../web3/getContractData";

const DashBoard = () => {
  const { active, account, chainId } = useActiveWeb3React()
  const [listData, setListData] = useState([])
  const [equipData, setEquipData] = useState([])
  const { dispatch, state } = useContext(mainContext)

  const getListData = async () => {
    const farmDusks = await getFarmDusk(account)
    const dusks = await getDashboardDusk(account)
    setListData([...farmDusks, ...dusks])
  }

  const getEquipData = async () => {
    const duskKitData = await getDuskKitData(account)
    setEquipData(duskKitData)
  }

  useMemo(() => {
    if(account){
      getListData()
      getEquipData()
    }
  }, [active, account, state.duskClaimStatus])

  return (
    <div className='dashboard-page'>
      <Header/>
      <DashBoardBanner listData={listData} refreshNftData={getListData} />
      <ListData
        listData={listData}
        equipData={equipData}
      />
    </div>
  )
}

export default injectIntl(DashBoard)
