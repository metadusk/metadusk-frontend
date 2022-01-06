import NFTHelperAbi from './abi/NFTHelper.json'
import ERC721Abi from "./abi/ERC721.json";
import ERC1155Abi from "./abi/ERC1155.json";
import LotteryAbi from "./abi/Lottery.json";
import ERC20 from './abi/ERC20.json'
import {checkIsTestEnv} from "../utils";
const isTestEnv = checkIsTestEnv()

export const ChainId = {
  ETH: 1,
  BSC: 56,
  HECO: 128,
  MATIC: 137,
  LOCALHOST: 31337
}

export const SHOW_ADDRESS = '0xabBaB4DD1d6E7E74C3ffFD5aCb6CEF0029943efa'

export const getRpcUrl = chainId => {
  const RPC_URLS = {
    [ChainId.LOCALHOST]: 'http://localhost:8545',
    [ChainId.ETH]: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    [ChainId.HECO]: 'https://http-mainnet-node.huobichain.com',
    [ChainId.BSC]: 'https://bsc-dataseed.binance.org/',
    [ChainId.MATIC]: 'https://rpc-mainnet.maticvigil.com'
  }
  return RPC_URLS[chainId]
}

export const getScanAddress = (chainId, address) => {
  const SCAN_ADDRESS = {
    [ChainId.BSC]: 'https://bscscan.com/address/' + address,
    [ChainId.HECO]: 'https://hecoinfo.com/address/' + address
  }
  return SCAN_ADDRESS[chainId]
}
export const getScanName = (chainId) => {
  const SCAN_NAME = {
    [ChainId.BSC]: 'BSC',
    [ChainId.HECO]: 'HECO'
  }
  return SCAN_NAME[chainId]
}

export const NFTHelper = {
  address: '0x4B9B1c34A83c6D814AB4a909eae95F4f218606F9',
  abi: NFTHelperAbi
}

// 721
const NFTDusk = {
  address: '0xeDfbf15775a2E42E03d059Fb98DA6e92284de7be',
  photo: 'QmVjCtwKixfJBxFcMjnVD66vyvFc3EtyXh4zmsYLu6qwZP',
  abi: ERC721Abi
}

// 1155
const NFTDuskKit = {
  address: '0x9f39766E4A8d2E6D55F406C71140089096687382',
  abi: ERC1155Abi
}

const Lottery = {
  address: '0xd732fD147A559fD427123A2055A1941359BB97be',
  abi: LotteryAbi
}

const NFTJustineDusk = {
  address: '0x17DFb8867184aFa9116Db927B87C27CC27A92F89',
  photo: 'QmVtvcn7HACq7QGQ9zSsQyftWwVBomHnWuCjvfp51TERNf',
  abi: ERC721Abi
}
const NFTSantaPunkDusk = {
  address: '0xF73396d2BD425413e4957bB0FB6C0fd945F31739',
  photo: 'QmVzzCC2YbLzvdP9Vx4RGLDEdEF4698TJTeEnJdQdbb24E',
  abi: ERC721Abi
}

export const ADDRESS_0 = '0x0000000000000000000000000000000000000000'
export const ADDRESS_INFINITY = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
export const ERC20Abi = ERC20.abi

if (isTestEnv) {
  console.log('---------test env---------')
  NFTDusk.address = '0x3eB30B5323EB3d421047a49625D89495B42E8115'
  NFTDuskKit.address = '0xEdA0B4dB9704EF54058E2E30Fb112eB2b4bF6D7E'
  Lottery.address = '0x692994b183B467965D81398d4dAc60fE465897f6'
  NFTJustineDusk.address = '0x86EFF87137C2453Ccc1A6c961eFbfcf467134780'
  NFTSantaPunkDusk.address = '0x0FADf54ABD2bB0D6128ae7040fBc2b611d42b223'
}

export {
  NFTDusk,
  NFTDuskKit,
  Lottery,
  NFTJustineDusk,
  NFTSantaPunkDusk
}


