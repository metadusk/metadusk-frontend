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



