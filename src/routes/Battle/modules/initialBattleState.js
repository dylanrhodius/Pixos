export const INITIAL_STATE = {
  self: {
    myTurn: false,
    hasRoundFinished: false,
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
  enemy: {
    myTurn: false,
    hasRoundFinished: false,
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
  turnFinished: false
}
