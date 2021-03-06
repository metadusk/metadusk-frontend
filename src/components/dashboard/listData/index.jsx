import React, { useMemo, useState } from "react";
import cs from "classnames";
import { FormattedMessage, injectIntl } from "react-intl";
import Footer from "../../footer";
import { getIPFSFile } from "../../../utils/ipfs";
import "./index.less";
import Other from "../tabs/other";

import Mint from "../tabs/mint";

import { exhibitsList } from "../../../config/nft";
const bgMap = exhibitsList.reduce((map, item) => {
  map[item.title] = item.bgCN;
  return map;
}, {});
const DashBoardListData = ({ listData: _listData, equipData }) => {
  const [tabFlag, setTabFlag] = useState("dush");
  const [listData, setListData] = useState([]);
  const [equipDataNum, setEquipDataNum] = useState([]);

  useMemo(() => {
    const map = {};
    const filterList = [];
    for (let i = 0; i < _listData.length; i++) {
      if (!map[_listData[i].tokenURI]) {
        map[_listData[i].tokenURI] = _listData[i];
        map[_listData[i].tokenURI].count = 1;
        filterList.push(map[_listData[i].tokenURI]);
      } else {
        map[_listData[i].tokenURI].count = map[_listData[i].tokenURI].count + 1;
      }
    }
    setListData(filterList);
  }, [_listData]);

  useMemo(() => {
    let count = 0;
    for (let i = 0; i < equipData.length; i++) {
      count = count + (equipData[i].count - 0);
    }
    setEquipDataNum(count);
  }, [equipData]);
  return (
    <div className="dashboard-list">
      <div className="dashboard-list_tab">
        <a
          className={cs(
            "dashboard-list_tab_option dashboard-list_tab_option_dush",
            tabFlag === "dush" && "dashboard-list_tab_option_active"
          )}
          onClick={() => setTabFlag("dush")}
        >
          <span>
            <FormattedMessage id="dashboard9" />
          </span>
        </a>
        <a
          className={cs(
            "dashboard-list_tab_option dashboard-list_tab_option_dush",
            tabFlag === "equip" && "dashboard-list_tab_option_active"
          )}
          onClick={() => setTabFlag("equip")}
        >
          <span>
            <FormattedMessage id="dashboard10" />
          </span>
        </a>
        <a
          className={cs(
            "dashboard-list_tab_option dashboard-list_tab_option_dush",
            tabFlag === "casting" && "dashboard-list_tab_option_active"
          )}
          onClick={() => setTabFlag("casting")}
        >
          <span>
            <FormattedMessage id="dashboard11" />
          </span>
        </a>
        <a
          className={cs(
            "dashboard-list_tab_option dashboard-list_tab_option_dush tab_other",
            tabFlag === "other" && "dashboard-list_tab_option_active"
          )}
          onClick={() => setTabFlag("other")}
        >
          <span>
            <FormattedMessage id="dashboard16" />
          </span>
        </a>
      </div>

      <div className="dashboard-list_data">
        {tabFlag === "dush" && listData.length ? (
          <div className="dashboard-list_data_my_dush">
            <div className="dashboard-list_data_my_dush_box">
              {listData.map((item, index) => {
                return (
                  item &&
                  item.content && (
                    <div
                      className="dashboard-list_data_my_dush_content"
                      key={index}
                    >
                      <img src={getIPFSFile(item.content.photo)} />
                      <p>{item.content.name}</p>
                      <span>
                        X<i>{item.count}</i>
                      </span>
                    </div>
                  )
                );
              })}
            </div>
            {/* <a><FormattedMessage id='dashboard14' /></a> */}
          </div>
        ) : (
          tabFlag === "dush" && (
            <p className="no_data">
              <FormattedMessage id="dashboard13" />
            </p>
          )
        )}

        {tabFlag === "equip" && equipData.length && equipDataNum > 0 ? (
          <div className="content_center">
            {equipData.map((item, index) => {
              if (item.count > 0) {
                const card_list = [];
                for (let i = 0; i < item.count; i++) {
                  card_list.push(
                    <div
                      className={cs(bgMap[item.name], "dush")}
                      key={index + "" + i}
                    >
                      <img src={getIPFSFile(item.photo)} />
                      <div className="content">
                        <p className="text_transform">
                          <span className="title">
                            {item.name}
                            {/* <FormattedMessage id='dashboard12' /> */}
                          </span>
                          <span className="describe">{item.introduction}</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return card_list;
              }
            })}
          </div>
        ) : (
          tabFlag === "equip" && (
            <p className="no_data">
              {/*Coming Soon*/}
              <FormattedMessage id="dashboard13" />
            </p>
          )
        )}
        {tabFlag === "casting" && (
          <Mint equipData={equipData} listData={listData} />
        )}
        <div style={{ display: tabFlag === "other" ? "block" : "none" }}>
          <Other />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default injectIntl(DashBoardListData);
