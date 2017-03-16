export const INITIAL_STATE = {
  self: {
    myTurn: false,
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
