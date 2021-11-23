import React from "react";
import './index.less'
import Team1 from '../../../assets/image/home/team1.png'
import Team2 from '../../../assets/image/home/team2.png'
import Team3 from '../../../assets/image/home/team3.png'
import Team4 from '../../../assets/image/home/team4.png'
import cs from 'classnames'
import Footer from "../../footer";
const memberList = [
  [
    {
      headImg: Team4,
      title: 'CEO',
      name: 'Lloyd E. Sarmiento'
    },
    {
      headImg: Team2,
      title: 'Oil painter.',
      name: 'Harana Crisanto'
    }
  ],
  [
    {
      headImg: Team1,
      title: 'CMO&Co-founder',
      name: 'Cielito Salvador'
    },
    {
      headImg: Team3,
      title: 'Advisor',
      name: 'Manases Carpio'
    }
  ]
]
memberList.push([memberList[0][1]])

export default function Block6() {
  return (
    <div className="we-team">
      <div className="team-view">
        <div className="team-left">
          <p>TEAM</p>
        </div>
        <div className="member-view">
          <div className="member-view-box">
            {
              memberList.map((items, index_) => (
                <div className={cs({'member-line': true, ['member-line-' + index_]:true})} key={index_}>
                  {
                    items.map((item, index) => (
                      <div className={cs({"member": true,
                        ["member-" + index_ + '-' + index] : true})} key={`${index_}${index}`}>
                        <img src={item.headImg} alt=""/>
                        <h2>{item.title}</h2>
                        <p>{item.name}</p>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
