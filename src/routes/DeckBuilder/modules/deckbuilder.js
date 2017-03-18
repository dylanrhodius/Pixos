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

export function placeInDeck (cardId) {
  return {
    type: PLACE_IN_DECK,
    payload: cardId
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLACE_IN_DECK]


}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function deckbuilderReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
