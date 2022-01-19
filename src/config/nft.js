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

export const JustineDuskExhibits = [
  {

    title: 'Gun',
    frame: BG1,
    bgCN: 'bg1',
    effect: GunEffect,
    nft: Gun,
    image: 'Qmbp7sKahsAwFskP1mZ7b6pzY39r9oGuCRsiNUNxiF54Ev',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '2'
  },
  {
    title: 'Wedding Dress',
    frame: BG2,
    bgCN: 'bg2',
    nft: WeddingDress,
    image: 'QmdAWwTtMPfhcZHGhvpTrC8XFXAhxLheaTrVyzjboDUDCY',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '3'
  },
  {
    title: 'Wedding Veil',
    frame: BG3,
    bgCN: 'bg3',
    nft: WeddingVeil,
    image: 'Qmezsirv8Qhz5BaSSScUjXkwzs6C26iQVHV1LMJrkK2A5S',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '4'
  },
  {
    title: 'Cigarette',
    frame: BG4,
    bgCN: 'bg4',
    nft: Cigarette,
    image: 'QmWqvu5NnFjZupEh412pU8peP5XyMRNpxgEAmTBiwbDzsS',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '1'
  },
]
export const xmasPunkExhibits = [
  {
    title: 'Helmet Skateboard',
    frame: BG1,
    bgCN: 'bg2',
    nft: Skateboard,
    image: 'QmQXTcAvu8ExbrZmFePygisBYEJDzADeyfKEJXXZPFMBFZ',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '5'
  },
  {
    title: 'Dexus vibe',
    frame: BG2,
    bgCN: 'bg3',
    nft: Glasses,
    image: 'QmTTDDq4j7jXUaJfSSAz855U2YxVGwp66MUAPWibSVMPMW',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '7'
  },
  {
    title: 'Santa Hat',
    frame: BG3,
    bgCN: 'bg1',
    nft: Headwear,
    image: 'QmQVaqG5v8tER1bWeTxesJQTyKmndeqnKrvXwSWHVMBqCs',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '8'
  },
  {
    title: 'Punk Jacket',
    frame: BG4,
    bgCN: 'bg4',
    nft: Jacket,
    image: 'QmZ1G8jwRMLgzGPGgw9ffhbtAHsuTkuzLQXRmuzUYyLWcF',
    tokenURI: 'Qmc7uSFN85UxoLL611mBnQkEATUdrZ6fUidznH65yEkX9f',
    id: '6'
  },
]

export const exhibitsList = [
  ...JustineDuskExhibits,
  ...xmasPunkExhibits
]

