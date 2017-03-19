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
      inPool: [{ name: 'alvarezsaurus', imgUrl: '/img/alvarezsaurus.svg', type: 'land', power: 3, cost: 5  }],
      inDeck: [  { name: 'ankylosaurus', imgUrl: '/img/ankylosaurus.svg', type: 'land', power: 6, cost: 9  }]
    },
    water: {
      inPool: [  { name: 'jellyfish', imgUrl: '/img/jellyfish.svg', type: 'water', power: 8, cost: 13  }],
      inDeck: [  { name: 'starfish', imgUrl: '/img/starfish.svg', type: 'water', power: 2, cost: 2  }]
    },
    air: {
      inPool: [  { name: 'toucan', imgUrl: '/img/toucan.svg', type: 'air', power: 3, cost: 5  }],
      inDeck: [  { name: 'pterodactyl', imgUrl: '/img/pterodactyl.svg', type: 'air', power: 8, cost: 13  }]
    }
}
