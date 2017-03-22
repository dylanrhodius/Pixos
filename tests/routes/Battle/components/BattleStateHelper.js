export const TEST_STATE = {
  self: {
    myTurn: false,
    readyForNewRound: false,
    roundCounter: 1,
    PlayerNotification: "",
    gameEnded: false,
    name: '',
    img: '',
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
    readyForNewRound: false,
    roundCounter: 1,
    PlayerNotification: "",
    gameEnded: false,
    name: '',
    img: '',
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
