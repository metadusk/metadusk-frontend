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
export const checkIsTestEnv = () => {
  try {
    const env = sessionStorage.getItem('metadusk_test_env')
    const local = window.location.host.indexOf('localhost') !== -1
    const test = window.location.host.indexOf('test') !== -1
    return env && (local || test)
  } catch (e){
    return false
  }
}
