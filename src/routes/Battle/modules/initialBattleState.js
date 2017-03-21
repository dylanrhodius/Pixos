export const INITIAL_STATE = {
  self: {
    myTurn: false,
    readyForNewRound: false,
    roundCounter: 0,
    PlayerNotification: "",
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
    readyForNewRound: false,
    roundCounter: 0,
    PlayerNotification: "",
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
