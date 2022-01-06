import {ChainId} from './address'
import {config, multicallClient, Contract as ClientContract} from "@chainstarter/multicall-client.js";

config({
  defaultChainId: ChainId.BSC,
  allowFailure: false,
  rpc: {
    [ChainId.LOCALHOST]: {
      url: 'http://localhost:8545',
      address: '0x6427169aB7344F9C37E9dC9001c681BEcd09343d'
    }
  }
})

export {
  multicallClient,
  ClientContract
}
