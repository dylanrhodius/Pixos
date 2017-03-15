import {
  CARD_DATA
} from 'routes/Battle/modules/cardData'

export const INITIAL_STATE = {
  nextTurn: '',
  cards: CARD_DATA,
  player1: {
    name: '',
    power: 0,
    score: 0,
    hasPassed: false,
    hand: [],
    playingArea: {
      land: [],
      water: [],
      air: []
    }
  },
  player2: {
    name: '',
    power: 0,
    score: 0,
    hasPassed: false,
    hand: [],
    playingArea: {
      land: [],
      water: [],
      air: []
    }
  }
}
