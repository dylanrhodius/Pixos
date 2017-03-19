var cardData = require('../../../../server/cardData').CARD_DATA
//cardData.js
//let landCards = [iteration over data get land cards]
// let landCards () {
//   return cardData.map(
//     (card, i) => key={i} {...card} id={i} />
//   )
// }
//water

//air
export const DECKBUILD_STATE = {
    dinoDollars: 200,
    deckLimit: 25,
    cardsInDeck: 0,
    duplicateCardLimit: 3,
    deckName: '',
    land: {
      inPool: [],
      inDeck: []
    },
    water: {
      inPool: [],
      inDeck: []
    },
    air: {
      inPool: [],
      inDeck: []
    }
}
