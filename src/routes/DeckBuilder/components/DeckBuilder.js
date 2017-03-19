import React from 'react'
import DeckRow from './DeckRow'

export default class DeckBuilder extends React.Component {

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

  render () {
    console.log(this.props.playerDeck);
    return (
      <div>
        <button onClick={this.saveDeck}>Save Deck</button>
        <h2>DeckBuilder</h2>
        { <DeckRow placeInDeck={this.props.placeInDeck} type={'land'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.land}/>}
        { <DeckRow placeInDeck={this.props.placeInDeck} type={'air'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.air}/>}
        { <DeckRow placeInDeck={this.props.placeInDeck} type={'water'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.water}/>}
      </div>
    )
  }

  propTypes: {
    placeInDeck : React.PropTypes.func.isRequired,
    playerDeck : React.PropTypes.object.isRequired
  }
}
