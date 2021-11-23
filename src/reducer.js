import React, { useReducer } from 'react'
import { DUSK_CLAIM_STATUS } from './const'

const mainContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case DUSK_CLAIM_STATUS:
      return { ...state, duskClaimStatus: action.duskClaimStatus }
    default:
    return false
  }
}

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    duskClaimStatus: false
  })
  return (
    <mainContext.Provider value={{ state, dispatch }}>
      {props.children}
    </mainContext.Provider>
  )
}

export { reducer, mainContext, ContextProvider }