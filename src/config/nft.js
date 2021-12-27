import BG1 from "../assets/image/home/exhibits/gun_bg.png";
import GunEffect from "../assets/image/home/exhibits/bolid.png";
import Gun from "../assets/image/nft1155/gun.png";
import BG2 from "../assets/image/home/exhibits/wedding_dress_bg.png";
import WeddingDress from "../assets/image/nft1155/wedding_dress.png";
import BG3 from "../assets/image/home/exhibits/wedding_veil_bg.png";
import WeddingVeil from "../assets/image/nft1155/wedding_veil.png";
import BG4 from "../assets/image/home/exhibits/cigarette_bg.png";
import Cigarette from "../assets/image/nft1155/cigarette.png";


import Skateboard from "../assets/image/nft1155/skateboard.png";
import Glasses from "../assets/image/nft1155/glasses.png";
import Headwear from "../assets/image/nft1155/headwear.png";
import Jacket from "../assets/image/nft1155/jacket.png";
import {getIPFSFile} from "../utils/ipfs";

export const exhibitsList = [
  {
    title: 'Helmet Skateboard',
    frame: BG1,
    bgCN: 'bg1',
    nft: Skateboard,
    image: 'QmQXTcAvu8ExbrZmFePygisBYEJDzADeyfKEJXXZPFMBFZ',
    tokenURI: 'QmdvpvG5sLGbUWhx6SFmvCuqBaspRfvd3Pg8SPsRjV7sWn',
    id: '5'
  },
  {
    title: 'Dexus vibe',
    frame: BG2,
    bgCN: 'bg2',
    nft: Glasses,
    image: 'QmTTDDq4j7jXUaJfSSAz855U2YxVGwp66MUAPWibSVMPMW',
    tokenURI: 'QmdvpvG5sLGbUWhx6SFmvCuqBaspRfvd3Pg8SPsRjV7sWn',
    id: '7'
  },
  {
    title: 'Santa Hat',
    frame: BG3,
    bgCN: 'bg3',
    nft: Headwear,
    image: 'QmQVaqG5v8tER1bWeTxesJQTyKmndeqnKrvXwSWHVMBqCs',
    tokenURI: 'QmdvpvG5sLGbUWhx6SFmvCuqBaspRfvd3Pg8SPsRjV7sWn',
    id: '8'
  },
  {
    title: 'Punk Jacket',
    frame: BG4,
    bgCN: 'bg4',
    nft: Jacket,
    image: 'QmZ1G8jwRMLgzGPGgw9ffhbtAHsuTkuzLQXRmuzUYyLWcF',
    tokenURI: 'QmdvpvG5sLGbUWhx6SFmvCuqBaspRfvd3Pg8SPsRjV7sWn',
    id: '6'
  },

  {
    title: 'Gun',
    frame: BG1,
    bgCN: 'bg1',
    effect: GunEffect,
    nft: Gun,
    image: 'Qmbp7sKahsAwFskP1mZ7b6pzY39r9oGuCRsiNUNxiF54Ev',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '2'
  },
  {
    title: 'Wedding Dress',
    frame: BG2,
    bgCN: 'bg2',
    nft: WeddingDress,
    image: 'QmdAWwTtMPfhcZHGhvpTrC8XFXAhxLheaTrVyzjboDUDCY',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '3'
  },
  {
    title: 'Wedding Veil',
    frame: BG3,
    bgCN: 'bg3',
    nft: WeddingVeil,
    image: 'Qmezsirv8Qhz5BaSSScUjXkwzs6C26iQVHV1LMJrkK2A5S',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '4'
  },
  {
    title: 'Cigarette',
    frame: BG4,
    bgCN: 'bg4',
    nft: Cigarette,
    image: 'QmWqvu5NnFjZupEh412pU8peP5XyMRNpxgEAmTBiwbDzsS',
    tokenURI: 'QmcdoXaLUvtFtTjvpZBePtDDz83ju2Y5LWoCqzNPHYmE5d',
    id: '1'
  },
]

// Preloading
for (let i = 0; i < exhibitsList.length; i++) {
  const Img = new Image()
  Img.src = getIPFSFile(exhibitsList[i].image)
  Img.onload = function (){}
}
