import React from 'react'
import DeckRow from './DeckRow'

export default class DeckBuilder extends React.Component {

  render () {
    return (
      <div>
        <h2>DeckBuilder</h2>
        { <DeckRow placeInDeck={this.props.placeInDeck} type={'land'} cards={this.props.playerDeck.land}/>}
        { <DeckRow placeInDeck={this.props.placeInDeck} type={'air'} cards={this.props.playerDeck.air}/>}
        { <DeckRow placeInDeck={this.props.placeInDeck} type={'water'} cards={this.props.playerDeck.water}/>}
      </div>
    )
  }

  propTypes: {
    placeInDeck : React.PropTypes.func.isRequired,
    playerDeck : React.PropTypes.object.isRequired
  }
}
