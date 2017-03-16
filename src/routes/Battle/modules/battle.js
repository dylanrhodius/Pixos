import {
  INITIAL_STATE
} from 'routes/Battle/modules/initialBattleState'
import {
  CARD_DATA
} from 'routes/Battle/modules/cardData'

import store from 'store/createStore'

// ------------------------------------
// Constants
// ------------------------------------
export const BATTLE_INCREMENT = 'BATTLE_INCREMENT'
export const BATTLE_DOUBLE_ASYNC = 'BATTLE_DOUBLE_ASYNC'
export const BUILD_PLAYER_HANDS = 'BUILD_PLAYER_HANDS'
export const SET_NEXT_PLAYER = 'SET_NEXT_PLAYER'
export const SET_PLAYER_PASS = 'SET_PLAYER_PASS'
export const PLAY_CARD = 'PLAY_CARD'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : BATTLE_INCREMENT,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : BATTLE_DOUBLE_ASYNC,
          payload : getState().battle
        })
        resolve()
      }, 200)
    })
  }
}

export function buildPlayerHands (data) {
  return {
    type: BUILD_PLAYER_HANDS,
    payload: data
  }
}

// export function getHand () {
//   var result = []
//   var index
//   var cards = CARD_DATA
//   var choice
//   for (var i = 0; i < 10; i++) {
//     choice = Math.floor(Math.random() * 50)
//     result.push(cards[choice])
//   }
//   return result
// }

export const actions = {
  increment,
  doubleAsync,
  buildPlayerHands
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BATTLE_INCREMENT]    : (state, action) => state + action.payload,
  [BATTLE_DOUBLE_ASYNC] : (state, action) => state * 2,
  [BUILD_PLAYER_HANDS] : (state, action) => {
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        hand: action.payload.hand,
        myTurn: action.payload.selfTurn
      })
    })
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = INITIAL_STATE
export default function battleReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
