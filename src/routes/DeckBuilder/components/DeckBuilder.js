import React from 'react'
import DeckRow from './DeckRow'

export default class DeckBuilder extends React.Component {

  render () {
    return (
      <div>
        <h2>DeckBuilder</h2>
        { <DeckRow type={'land'} cards={this.props.playerDeck.land}/>}
        { <DeckRow type={'air'} cards={this.props.playerDeck.air}/>}
        { <DeckRow type={'water'} cards={this.props.playerDeck.water}/>}
      </div>
    )
  }

  propTypes: {
    playerDeck : React.PropTypes.object.isRequired
  }
}
