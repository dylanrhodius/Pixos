import React from 'react'
import DeckRow from './DeckRow'
import DeckBuilderInfoBar from './DeckBuilderInfoBar'

export default class DeckBuilder extends React.Component {

  render () {
    console.log(this.props.playerDeck);
    return (
      <div className="row no-gutters max-page-height">
        <div className="info-bar col-1 d-flex align-middle min-page-height justify-content-center align-items-center pt-2 pb-4">
          { <DeckBuilderInfoBar playerDeck={this.props.playerDeck}/> }
        </div>
      <div className="deck col-11">
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
