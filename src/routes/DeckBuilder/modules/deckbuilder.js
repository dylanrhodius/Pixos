import {
  DECKBUILD_STATE
} from 'routes/DeckBuilder/modules/initialDeckState'

import store from 'store/createStore'
// ------------------------------------
// Constants
// ------------------------------------
// const function
export const PLACE_IN_DECK = 'PLACE_IN_DECK'
export const REMOVE_FROM_DECK = 'REMOVE_FROM_DECK'
export const SET_INITIAL_DECK = 'SET_INITIAL_DECK'

// ------------------------------------
// Actions
// ------------------------------------

export function placeInDeck (card) {
  return {
    type: PLACE_IN_DECK,
    payload: card
  }
}

export function removeFromDeck (card) {
  return {
    type: REMOVE_FROM_DECK,
    payload: card
  }
}


export function setInitialDeck (deck) {
  return {
    type: SET_INITIAL_DECK,
    payload: deck
  }
}

export const actions = {
  placeInDeck,
  removeFromDeck,
  setInitialDeck
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [PLACE_IN_DECK] : (state, action) => {
    let card = (state[action.payload.type].inPool[action.payload.cardId])
    let array = state[action.payload.type].inDeck
    array.push(card)

    return Object.assign({}, state, {
      [action.payload.type]: Object.assign({}, state[action.payload.type], {
        inDeck: array
      }),
      cardsInDeck: state.cardsInDeck + 1,
      dinoDollars: state.dinoDollars - card.cost
    })
  },
  [REMOVE_FROM_DECK] : (state, action) => {
    let card = (state[action.payload.type].inDeck[action.payload.cardId])
    let array = state[action.payload.type].inDeck
    array.splice(action.payload.cardId, 1)
    return Object.assign({}, state, {
      [action.payload.type]: Object.assign({}, state[action.payload.type], {
        inDeck: array
      }),
      cardsInDeck: state.cardsInDeck - 1,
      dinoDollars: state.dinoDollars + card.cost
    })
  },
  [SET_INITIAL_DECK] : (state, action) => {
    let landArray = action.payload.filter( (card) => {
        if (card.type === 'land') { return card }
      }
    );
    let waterArray = action.payload.filter( (card) => {
        if (card.type === 'water') { return card }
      }
    );
    let airArray = action.payload.filter( (card) => {
        if (card.type === 'air') { return card }
      }
    );
    let deckSize = landArray.length + waterArray.length + airArray.length
    let dollars = 0
    landArray.forEach((card) => {
      dollars += card.cost
    })
    waterArray.forEach((card) => {
      dollars += card.cost
    })
    airArray.forEach((card) => {
      dollars += card.cost
    })

    return Object.assign({}, state, {
      dinoDollars: (225 - dollars),
      cardsInDeck: deckSize,
      land: Object.assign({}, state.land, {
        inDeck: landArray
      }),
      water: Object.assign({}, state.water, {
        inDeck: waterArray
      }),
      air: Object.assign({}, state.air, {
        inDeck: airArray
      }),
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
