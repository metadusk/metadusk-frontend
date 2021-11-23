import {LANGUAGE, SHOW_CONNECT_WALLET, SHOW_SWITCH_WALLET} from '../actions/index'

const language = window.localStorage.getItem('guard_frontend_language') || 'en'

// 初始化state
const initState = {
  language: language,
  showSwitchWallet: false,
  showConnectWallet: false
}

// reducer
export default function reducer(state = initState, action) {
  switch (action.type) {
    case LANGUAGE:
      window.localStorage.setItem('guard_frontend_language', action.params.language)
      return {
        ...state,
        language: action.params.language,
      }
    case SHOW_SWITCH_WALLET:
      return {
        ...state,
        showSwitchWallet: action.params.showSwitchWallet,
      }
    case SHOW_CONNECT_WALLET:
      return {
        ...state,
        showConnectWallet: action.params.showConnectWallet,
      }
    default:
      return state
  }
}
