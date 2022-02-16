import {ClientContract, multicallClient} from "./multicall";
import {ALL_DUSK, ChainId, NFTDuskKit, NFTHelper, NFTStake} from "./address";
import {getIPFSJson} from "../utils/ipfs";
import {exhibitsList} from "../config/nft";

export function getFarmDusk (account) {
  const StakeContract721 = new ClientContract(
    NFTStake.abi,
    NFTStake.address,
    ChainId.BSC
  );
  return multicallClient([StakeContract721.getAllstakeNfts(account)]).then(async data => {
    const dusks = [];
    data = data[0];
    const indexs = data[0];
    const tokenids = data[1];
    const duskCalls = []
    for (let i = 0; i < indexs.length; i++) {
      const duskItem = {
        tokenId: tokenids[i],
        address: ALL_DUSK[indexs[i]].address,
        index: indexs[i],
      };
      const duskContract = new ClientContract(ALL_DUSK[indexs[i]].abi, ALL_DUSK[indexs[i]].address, ChainId.BSC)
      duskCalls.push(duskContract.tokenURI(duskItem.tokenId))
      dusks.push(duskItem);
    }
    await multicallClient(duskCalls).then(async res => {
      for (let i = 0; i < res.length; i++) {
        dusks[i].tokenURI = res[i].split('/').pop()
        await getIPFSJson(dusks[i].tokenURI).then(res => {
          dusks[i].content = res.data
        })
      }
    })
    return dusks
  })
}

export function getDashboardDusk(account){
  const contract = new ClientContract(NFTHelper.abi, NFTHelper.address, ChainId.BSC)
  const calls = []
  for (let i = 0; i < ALL_DUSK.length; i++) {
    calls.push(
      contract.getAll(ALL_DUSK[i].address, account),
    )
  }
  return  multicallClient(calls).then(async data => {
    const dusks = []
    for (let i = 0; i < data.length; i ++) {
      const [ids, urls] = data[i]
      for (let j = 0; j < ids.length; j++) {
        const duskItem = {
          tokenURI: urls[j].split('/').pop(),
          tokenId: ids[j],
        }
        await getIPFSJson(duskItem.tokenURI).then(res => {
          duskItem.content = res.data
          dusks.push(duskItem)
        })
      }
    }
    return dusks
  })
}

export function getDuskKitData(account){
  const filterEquipData = []
  const contract = new ClientContract(NFTDuskKit.abi, NFTDuskKit.address, ChainId.BSC)
  const calls = exhibitsList.reduce((list, item)=>{
    list.push(
      contract.balanceOf(account, item.id),
      contract.uri(item.id)
    )
    return list
  }, [])
  return multicallClient(calls).then(async data => {
    const exhibitsPromise = []
    for (let i = 0; i < exhibitsList.length; i++) {
      let url = data[i*2+1]
      if (url.indexOf('https') === 0){
        const url_ = url.split('/')
        url = url_[url_.length - 2]
      }
      exhibitsPromise.push(getIPFSJson(url + `/${exhibitsList[i].id}.json`))
    }
    // data = ['0', '0', '0', '0']
    await Promise.all(exhibitsPromise)
      .then(res => {
        for (let i = 0; i < exhibitsList.length; i++) {
          res[i].data.count = data[i*2]
          filterEquipData.push(res[i].data)
        }
      })
    return filterEquipData
  })
}
