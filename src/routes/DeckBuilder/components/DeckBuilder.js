import React from 'react'
import DeckRow from './DeckRow'

export default class DeckBuilder extends React.Component {

  render () {
    console.log(this.props.playerDeck);
    return (
      <div>
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
