import {
  DECKBUILD_STATE
} from 'routes/DeckBuilder/modules/initialDeckState'


import store from 'store/createStore'
// ------------------------------------
// Constants
// ------------------------------------
// const function
export const PLACE_IN_DECK = 'PLACE_IN_DECK'

// ------------------------------------
// Actions
// ------------------------------------

export function placeInDeck (card) {
  return {
    type: PLACE_IN_DECK,
    payload: card
  }
}

export const actions = {
  placeInDeck
}




// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLACE_IN_DECK] : (state, action) => {
    let card = (state[action.payload.type].inPool[action.payload.cardId])
    let array = (state[action.payload.type].inDeck).push(card)

    return Object.assign({}, state, {
      action.payload.type: Object.assign({}, state[action.payload.type], {
        inDeck: array
      })
    })
  }

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = DECKBUILD_STATE
export default function deckbuilderReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
