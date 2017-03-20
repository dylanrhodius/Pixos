let cardData = require('../../../../server/cardData').CARD_DATA

function isLand(card) {
  if (card.type === 'land') { return card }
}

function isWater(card) {
  if (card.type === 'water') { return card }
}

function isAir(card) {
  if (card.type === 'air') { return card }
}

let landArray = cardData.filter(isLand);
let waterArray = cardData.filter(isWater);
let airArray = cardData.filter(isAir);

export const DECKBUILD_STATE = {
    dinoDollars: 200,
    deckSize: 25,
    cardsInDeck: 0,
    duplicateCardLimit: 3,
    deckName: '',
    land: {
      inPool: landArray,
      inDeck: []
    },
    water: {
      inPool: waterArray,
      inDeck: []
    },
    air: {
      inPool: airArray,
      inDeck: []
    }
}
