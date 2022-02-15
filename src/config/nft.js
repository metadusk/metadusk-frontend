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

import MagicBuff from "../assets/image/nft1155/magic_buff.png";
import SacredArmor from "../assets/image/nft1155/sacred_armor.png";
import SexyBody from "../assets/image/nft1155/sexy_body.png";
import TitanHaircut from "../assets/image/nft1155/titan_haircut.png";


const ipfsAddress1155 = 'QmTcFYYeDA8uRdXBcvueNU6TrUnkzxHyr6yeSR6yRVcNdp'

export const JustineDuskExhibits = [
  {

    title: 'Gun',
    frame: BG1,
    bgCN: 'bg1',
    effect: GunEffect,
    nft: Gun,
    image: 'Qmbp7sKahsAwFskP1mZ7b6pzY39r9oGuCRsiNUNxiF54Ev',
    tokenURI: ipfsAddress1155,
    id: '2'
  },
  {
    title: 'Wedding Dress',
    frame: BG2,
    bgCN: 'bg2',
    nft: WeddingDress,
    image: 'QmdAWwTtMPfhcZHGhvpTrC8XFXAhxLheaTrVyzjboDUDCY',
    tokenURI: ipfsAddress1155,
    id: '3'
  },
  {
    title: 'Wedding Veil',
    frame: BG3,
    bgCN: 'bg3',
    nft: WeddingVeil,
    image: 'Qmezsirv8Qhz5BaSSScUjXkwzs6C26iQVHV1LMJrkK2A5S',
    tokenURI: ipfsAddress1155,
    id: '4'
  },
  {
    title: 'Cigarette',
    frame: BG4,
    bgCN: 'bg4',
    nft: Cigarette,
    image: 'QmWqvu5NnFjZupEh412pU8peP5XyMRNpxgEAmTBiwbDzsS',
    tokenURI: ipfsAddress1155,
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
    tokenURI: ipfsAddress1155,
    id: '5'
  },
  {
    title: 'Dexus vibe',
    frame: BG2,
    bgCN: 'bg3',
    nft: Glasses,
    image: 'QmTTDDq4j7jXUaJfSSAz855U2YxVGwp66MUAPWibSVMPMW',
    tokenURI: ipfsAddress1155,
    id: '7'
  },
  {
    title: 'Santa Hat',
    frame: BG3,
    bgCN: 'bg1',
    nft: Headwear,
    image: 'QmQVaqG5v8tER1bWeTxesJQTyKmndeqnKrvXwSWHVMBqCs',
    tokenURI: ipfsAddress1155,
    id: '8'
  },
  {
    title: 'Punk Jacket',
    frame: BG4,
    bgCN: 'bg4',
    nft: Jacket,
    image: 'QmZ1G8jwRMLgzGPGgw9ffhbtAHsuTkuzLQXRmuzUYyLWcF',
    tokenURI: ipfsAddress1155,
    id: '6'
  },
]
export const titanAExhibits = [
  {
    title: 'Magic Buff',
    frame: BG1,
    bgCN: 'bg1',
    nft: MagicBuff,
    image: 'QmVFL2NmwpYTVqkaHkhbRigDPAXj5QNQie9MRCy413gkE2',
    tokenURI: ipfsAddress1155,
    id: '9'
  },
  {
    title: 'Sacred Armor',
    frame: BG3,
    bgCN: 'bg3',
    nft: SacredArmor,
    image: 'QmW4DARuyK34Tb8ZfeDh3FaK8RcobxQExvxp7tXJ2HgDpU',
    tokenURI: ipfsAddress1155,
    id: '10'
  },
  {
    title: 'Sexy Body',
    frame: BG2,
    bgCN: 'bg2',
    nft: SexyBody,
    image: 'Qmd81YTLmHs74mZVKVA7UF1SSXepYZJhkEpcUN31NeZBpb',
    tokenURI: ipfsAddress1155,
    id: '11'
  },
  {
    title: 'Titan Haircut',
    frame: BG4,
    bgCN: 'bg4',
    nft: TitanHaircut,
    image: 'QmaFpZwY2H5aF2qEkJbkFWqV9UpYvtzb7Xc6t4cVtfTrq9',
    tokenURI: ipfsAddress1155,
    id: '12'
  },
]

export const exhibitsList = [
  ...JustineDuskExhibits,
  ...xmasPunkExhibits,
  ...titanAExhibits
]

