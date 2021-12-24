import NFTHelperAbi from './abi/NFTHelper.json'
import ERC721Abi from "./abi/ERC721.json";
import ERC1155Abi from "./abi/ERC1155.json";
import LotteryAbi from "./abi/Lottery.json";
import ERC20 from './abi/ERC20.json'

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
export const NFTDusk = {
  address: '0x3eB30B5323EB3d421047a49625D89495B42E8115',//'0xeDfbf15775a2E42E03d059Fb98DA6e92284de7be',
  abi: ERC721Abi
}

// 1155
export const NFTDuskKit = {
  address: '0x9f39766E4A8d2E6D55F406C71140089096687382',
  abi: ERC1155Abi
}

export const Lottery = {
  address: '0xd732fD147A559fD427123A2055A1941359BB97be',
  abi: LotteryAbi
}

export const NFTJustineDusk = {
  address: '0x86EFF87137C2453Ccc1A6c961eFbfcf467134780',
  abi: ERC721Abi
}

export const ADDRESS_0 = '0x0000000000000000000000000000000000000000'
export const ADDRESS_INFINITY = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
export const ERC20Abi = ERC20.abi



