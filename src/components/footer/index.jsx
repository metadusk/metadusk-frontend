import React from "react";
import './index.less'
// import DiscordSvg from '../../assets/image/home/footer/discord.svg'
// import GitSvg from '../../assets/image/home/footer/git.svg'
import MediumSvg from '../../assets/image/home/footer/medium.svg'
import TelegramSvg from '../../assets/image/home/footer/telegram.svg'
import TwitterSvg from '../../assets/image/home/footer/twitter.svg'

const linkList = [
  {
    icon: TwitterSvg,
    uri: 'https://twitter.com/Meta_Dusks'
  },
  {
    icon: TelegramSvg,
    uri: 'https://t.me/metadusk_nothing'
  },
  // {
  //   icon: GitSvg,
  //   uri: ''
  // },
  {
    icon: MediumSvg,
    uri: 'https://medium.com/@Meta_Dusks'
  },
  // {
  //   icon: DiscordSvg,
  //   uri: ''
  // }
]

export default function Footer() {
  return (
    <div className="page-footer">
      {
        linkList.map((item, index) => (<a href={item.uri} key={index} target="_blank"><img src={item.icon} alt=""/></a>))
      }
    </div>
  )
}
