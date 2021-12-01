export const formatAddress = (address, left = 4, right = 4) => {
  if (!address) {
    return null
  }
  return address.slice(0, left) + '...' + address.slice(-right)
}
export const strToBool = (str) =>{
  return {
    'true': true,
    'false': false
  }[str]
}
