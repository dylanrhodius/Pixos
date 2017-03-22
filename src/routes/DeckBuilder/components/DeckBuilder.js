import React from 'react'
import DeckRow from './DeckRow'
import DeckBuilderInfoBar from './DeckBuilderInfoBar'
import './DeckBuilder.scss'

document.title='Pixos';

export default class DeckBuilder extends React.Component {

  render () {
    console.log(this.props.playerDeck);
    return (
      <div className="row no-gutters max-page-height">
        <div className="max-page-height grey-bkgrnd deck-builder-info-bar col-1">
          { <DeckBuilderInfoBar playerDeck={this.props.playerDeck}/> }
        </div>
      <div className="deck-builder col-11 board-bkgrnd pt-3">
        { <DeckRow removeFromDeck={this.props.removeFromDeck} placeInDeck={this.props.placeInDeck} type={'land'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.land}/>}
        { <DeckRow removeFromDeck={this.props.removeFromDeck} placeInDeck={this.props.placeInDeck} type={'air'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.air}/>}
        { <DeckRow removeFromDeck={this.props.removeFromDeck} placeInDeck={this.props.placeInDeck} type={'water'} playerDeck={this.props.playerDeck} cards={this.props.playerDeck.water}/>}
      </div>
    </div>
    )
  }

  propTypes: {
    removeFromDeck : React.PropTypes.func.isRequired,
    placeInDeck : React.PropTypes.func.isRequired,
    playerDeck : React.PropTypes.object.isRequired
  }
}
