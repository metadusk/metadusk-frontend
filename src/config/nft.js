import GunBg from "../assets/image/home/exhibits/gun_bg.png";
import GunEffect from "../assets/image/home/exhibits/bolid.png";
import Gun from "../assets/image/home/exhibits/gun.png";
import WeddingDressBG from "../assets/image/home/exhibits/wedding_dress_bg.png";
import WeddingDress from "../assets/image/home/exhibits/wedding_dress.png";
import WeddingVeilBG from "../assets/image/home/exhibits/wedding_veil_bg.png";
import WeddingVeil from "../assets/image/home/exhibits/wedding_veil.png";
import CigaretteBG from "../assets/image/home/exhibits/cigarette_bg.png";
import Cigarette from "../assets/image/home/exhibits/cigarette.png";
import {getIPFSFile} from "../utils/ipfs";

export const exhibitsList = [
  {
    title: 'Gun',
    frame: GunBg,
    effect: GunEffect,
    nft: Gun,
    image: 'Qmbp7sKahsAwFskP1mZ7b6pzY39r9oGuCRsiNUNxiF54Ev',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '2'
  },
  {
    title: 'Wedding Dress',
    frame: WeddingDressBG,
    nft: WeddingDress,
    image: 'QmdAWwTtMPfhcZHGhvpTrC8XFXAhxLheaTrVyzjboDUDCY',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '3'
  },
  {
    title: 'Wedding Veil',
    frame: WeddingVeilBG,
    nft: WeddingVeil,
    image: 'Qmezsirv8Qhz5BaSSScUjXkwzs6C26iQVHV1LMJrkK2A5S',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '4'
  },
  {
    title: 'Cigarette',
    frame: CigaretteBG,
    nft: Cigarette,
    image: 'QmWqvu5NnFjZupEh412pU8peP5XyMRNpxgEAmTBiwbDzsS',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '1'
  }
]

// Preloading
for (let i = 0; i < exhibitsList.length; i++) {
  const Img = new Image()
  Img.src = getIPFSFile(exhibitsList[i].image)
  Img.onload = function (){}
}
