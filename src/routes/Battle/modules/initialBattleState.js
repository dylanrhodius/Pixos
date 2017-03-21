export const INITIAL_STATE = {
  self: {
    myTurn: false,
    hasRoundFinished: false,
    roundCounter: 0,
    roundNotification: "",
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
    },
    meteor: {
      land: false,
      water: false,
      air: false
    },
    paragon: {
      land: false,
      water: false,
      air: false
    }
  },
  enemy: {
    myTurn: false,
    hasRoundFinished: false,
    roundCounter: 0,
    roundNotification: "",
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
    },
    meteor: {
      land: false,
      water: false,
      air: false
    },
    paragon: {
      land: false,
      water: false,
      air: false
    }
  },
  turnFinished: false
}
