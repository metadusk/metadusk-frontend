import {getIPFSFile} from "../utils/ipfs";
import {exhibitsList} from "./nft";
import {NFTDusk, NFTJustineDusk} from "../web3/address";

const errorMap = {}
function Preloading(image){
  const Img = new Image()
  Img.src = getIPFSFile(image)
  Img.onload = function (){}
  Img.onerror = function (){
    if (!errorMap[image]){
      Preloading(image)
    }
    errorMap[image] = true
  }
}
// Preloading
for (let i = 0; i < exhibitsList.length; i++) {
  Preloading(exhibitsList[i].image)
}
Preloading(NFTJustineDusk.photo)
Preloading(NFTDusk.photo)
