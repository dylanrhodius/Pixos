import {
  INITIAL_STATE
} from 'routes/Battle/modules/initialBattleState'

import store from 'store/createStore'

// ------------------------------------
// Constants
// ------------------------------------
export const BATTLE_INCREMENT = 'BATTLE_INCREMENT'
export const BATTLE_DOUBLE_ASYNC = 'BATTLE_DOUBLE_ASYNC'
export const SETUP_PLAYERS = 'SETUP_PLAYERS'
export const SET_NEXT_PLAYER = 'SET_NEXT_PLAYER'
export const SET_PLAYER_PASS = 'SET_PLAYER_PASS'
export const PLAY_CARD = 'PLAY_CARD'
export const SET_TURN_FINISHED = 'SET_TURN_FINISHED'
export const SET_MY_TURN = 'SET_MY_TURN'
export const UPDATE_ENEMY_STATE = 'UPDATE_ENEMY_STATE'
export const PASS_TURN = 'PASS_TURN'
export const REMOVE_CARD = 'REMOVE_CARD'
export const ADD_CARD = 'ADD_CARD'
export const UPDATE_POWER = 'UPDATE_POWER'
export const UPDATE_SCORE = 'UPDATE_SCORE'
export const CLEAR_PLAYING_AREA = 'CLEAR_PLAYING_AREA'
export const SET_ROUND_NOTIFICATION = 'SET_ROUND_NOTIFICATION'
export const SET_READY_FOR_NEW_ROUND = 'SET_READY_FOR_NEW_ROUND'
export const INCREMENT_ROUND_COUNTER = 'INCREMENT_ROUND_COUNTER'
export const INCREMENT_ENEMY_SCORE = 'INCREMENT_ENEMY_SCORE'
export const INCREMENT_SELF_SCORE = 'INCREMENT_SELF_SCORE'


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

export function incrementEnemyScore () {
  return {
    type: INCREMENT_ENEMY_SCORE
  }
}
export function incrementSelfScore () {
  return {
    type: INCREMENT_SELF_SCORE
  }
}

export function setupPlayers (data) {
  return {
    type: SETUP_PLAYERS,
    payload: data
  }
}

export function addCard (cardId) {
  return {
    type: ADD_CARD,
    payload: cardId
  }
}

export function updateScore (selfHasWon) {
  console.log("updateScore")
  return {
    type: UPDATE_SCORE,
    payload: selfHasWon
  }
}
export function incrementRoundCounter() {
  console.log("incrementRoundCounter")
  return {
    type: INCREMENT_ROUND_COUNTER
  }
}
export function setReadyForNewRound (boolean) {
  console.log("setReadyForNewRound")
  return {
    type: SET_READY_FOR_NEW_ROUND,
    payload: boolean
  }
}

export function clearPlayingArea () {
  console.log("clearPlayingArea")
  return {
    type: CLEAR_PLAYING_AREA
  }
}
export function setRoundNotification (roundResult) {
  console.log("setRoundNotification")
  return {
    type: SET_ROUND_NOTIFICATION,
    payload: roundResult
  }
}


export function removeCard(cardId) {
  return {
    type: REMOVE_CARD,
    payload: cardId
  }
}

export function updatePower () {
  return {
    type: UPDATE_POWER
  }
}

export function setTurnFinished (boolean) {
  return {
    type: SET_TURN_FINISHED,
    payload: boolean
  }
}

export function setMyTurn (boolean) {
  return {
    type: SET_MY_TURN,
    payload: boolean
  }
}

export function passTurn (boolean) {
  return {
    type: PASS_TURN,
    payload: boolean
  }
}

export function updateEnemyState (object) {
  return {
    type: UPDATE_ENEMY_STATE,
    payload: object
  }
}

export const actions = {
  increment,
  doubleAsync,
  setupPlayers,
  setMyTurn,
  updatePower,
  addCard,
  removeCard,
  updateScore,
  clearPlayingArea,
  setRoundNotification,
  setReadyForNewRound,
  incrementRoundCounter,
  incrementEnemyScore,
  incrementSelfScore
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BATTLE_INCREMENT]    : (state, action) => state + action.payload,
  [BATTLE_DOUBLE_ASYNC] : (state, action) => state * 2,
  [SETUP_PLAYERS] : (state, action) => {
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        hand: action.payload.selfHand,
        myTurn: action.payload.selfTurn,
        name: action.payload.selfName
      }),
      enemy: Object.assign({}, state.enemy, {
        hand: action.payload.enemyHand,
        name: action.payload.enemyName
      })
    })
  },


  [SET_TURN_FINISHED] : (state, action) => {
    return Object.assign({}, state, {
      turnFinished: action.payload
    })
  },

  [PASS_TURN] : (state, action) => {
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        hasPassed: action.payload
      }),
    })
  },
  [SET_READY_FOR_NEW_ROUND] : (state, action) => {
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        readyForNewRound: action.payload
      }),
    })
  },
  [INCREMENT_ROUND_COUNTER] : (state, action) => {
    let newRoundCount = state.self.roundCounter + 1
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        roundCounter: newRoundCount
      }),
    })
  },
  [INCREMENT_ENEMY_SCORE] : (state, action) => {
    let newEnemyScore = state.enemy.score + 1
    return Object.assign({}, state, {
      enemy: Object.assign({}, state.enemy, {
        score: newEnemyScore
      }),
    })
  },
  [INCREMENT_SELF_SCORE] : (state, action) => {
    let newSelfScore = state.self.score + 1
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        score: newSelfScore
      }),
    })
  },
  [SET_MY_TURN] : (state, action) => {
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        myTurn: action.payload
      }),
    })
  },
  [ADD_CARD] : (state, action) => {
    var card = (state.self.hand[action.payload])
    if(card.type == 'water'){ state.self.playingArea.water.push(card) }
    else if (card.type == 'land'){ state.self.playingArea.land.push(card) }
    else { state.self.playingArea.air.push(card) }

    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        playingArea: state.self.playingArea
      }),
    })
  },
  [REMOVE_CARD] : (state, action) => {
    state.self.hand.splice(action.payload, 1)
    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        hand: state.self.hand
      }),
    })
  },
  [UPDATE_ENEMY_STATE] : (state, action) => {
    return Object.assign({}, state, {
      enemy: action.payload
    })
  },
  [UPDATE_POWER] : (state, action) => {
    let enemyPower = 0
    for (let array of Object.values(state.enemy.playingArea)) {
      array.forEach((card) => {
          enemyPower += card.power
      })
    }

    let selfPower = 0
    for (let array of Object.values(state.self.playingArea)) {
      array.forEach((card) => {
          selfPower += card.power
      })
    }

    return Object.assign({}, state, {
      self: Object.assign({}, state.self, {
        power: selfPower
      }),
      enemy: Object.assign({}, state.enemy, {
        power: enemyPower
      })
    })
  },
  [UPDATE_SCORE] : (state, action) => {
    let selfHasWon = action.payload
    if (selfHasWon) {
      return Object.assign({}, state, {
        self: Object.assign({}, state.self, {
          score: state.self.score + 1
        }),
      })
    }
    return state
  },
  [SET_ROUND_NOTIFICATION] : (state, action) => {
    let roundResult = action.payload
    if (roundResult == "win") {
      return Object.assign({}, state, {
        self: Object.assign({}, state.self, {
          roundNotification: "Round over: you win"
        }),
      })
    } else if (roundResult == "lose"){
      return Object.assign({}, state, {
        self: Object.assign({}, state.self, {
          roundNotification: "Round over: you lose"
        }),
      })
    } else {
      return Object.assign({}, state, {
        self: Object.assign({}, state.self, {
          roundNotification: "Round over: it's a draw"
        }),
      })
    }
  },
  [CLEAR_PLAYING_AREA] : (state, action) => {
    let enemyDiscards = []
    for (let array of Object.values(state.enemy.playingArea)) {
      array.forEach((card) => {
          enemyDiscards.push(card)
      })
    }
    let selfDiscards = []
    for (let array of Object.values(state.self.playingArea)) {
      array.forEach((card) => {
          selfDiscards.push(card)
      })
    }
    return Object.assign({}, state, {
      enemy: Object.assign({}, state.enemy, {
        discardPile: state.enemy.discardPile.concat(enemyDiscards),
        playingArea: { land: [], water: [], air: [] }
      }),
      self: Object.assign({}, state.self, {
        discardPile: state.self.discardPile.concat(selfDiscards),
        playingArea: { land: [], water: [], air: [] }
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
