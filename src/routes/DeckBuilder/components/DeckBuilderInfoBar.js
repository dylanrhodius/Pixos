import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import PixosMenu from 'routes/Battle/components/PixosMenu'
import './DeckBuilderInfoBar.scss'

export default class DeckBuilderInfoBar extends React.Component {

  constructor (props) {
    super (props);

    this.saveDeck = this.saveDeck.bind(this)
  }

  saveDeck () {
    let deck = this.props.playerDeck.land.inDeck
                .concat(this.props.playerDeck.air.inDeck
                  .concat(this.props.playerDeck.water.inDeck))
    console.log('Deck is', deck)
    fetch(`${window.location.origin}/user/deck`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deck)
    })
  }

  loadContent() {
    if (this.props.playerDeck.cardsInDeck == this.props.playerDeck.deckSize)
    {
      return <button onClick={this.saveDeck}>Save Deck</button>
    } else {
      return <button disabled>Save Deck</button>
    }
  }

  render () {
    let content = this.loadContent()
    return (
      <div className="info-bar float-left justify-content-center align-items-center">
        <PixosMenu/>
        <p className="dino-dollars justify-content-center mb-5">Current DinoDollars ${ this.props.playerDeck.dinoDollars }</p>
        <p className="card-in-deck justify-content-center mt-5">Cards in Deck - {this.props.playerDeck.cardsInDeck}</p>
        { content }
      </div>
      )
  }

}

DeckBuilderInfoBar.propTypes = {
  playerDeck : React.PropTypes.object.isRequired
}
