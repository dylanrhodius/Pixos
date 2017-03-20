export const INITIAL_STATE = {
  self: {
    myTurn: false,
    hasRoundFinished: false,
    roundCounter: 0,
    name: '',
    power: 0,
    score: 0,
    hasPassed: false,
    hand: [],
    discardPile: [],
    playingArea: {
      land: [],
      water: [],
      air: []
    }
  },
  enemy: {
    myTurn: false,
    hasRoundFinished: false,
    roundCounter: 0,
    name: '',
    power: 0,
    score: 0,
    hasPassed: false,
    hand: [],
    discardPile: [],
    playingArea: {
      land: [],
      water: [],
      air: []
    }
  },
  turnFinished: false
}
