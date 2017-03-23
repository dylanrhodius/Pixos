import { connect } from 'react-redux'
import { placeInDeck, removeFromDeck, setInitialDeck } from '../modules/deckbuilder'

import DeckBuilder from '../components/DeckBuilder'

const mapDispatchToProps = {
  placeInDeck,
  removeFromDeck,
  setInitialDeck
}

const mapStateToProps = (state) => ({
  playerDeck : state.deckbuilder
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckBuilder)
