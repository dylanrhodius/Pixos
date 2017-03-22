import React from 'react'
import DeckCardWrapper from './DeckCardWrapper'
import './DeckRow.scss'

export default class DeckCard extends React.Component {

  renderDeckComponents (cardArray, section) {
    return cardArray.sort(this.compareCardsbyCost).map(
      (card, i) => { return(
        <DeckCardWrapper removeFromDeck={this.props.removeFromDeck}
                    playerDeck={this.props.playerDeck}
                    placeInDeck={this.props.placeInDeck}
                    cards={this.props}
                    key={i} {...card}
                    id={`${this.props.type}_${section}_${i}`} />
                  )
      }
    )
  }

  compareCardsbyCost(a,b) {
    let field = 'cost'
    if (a[field] < b[field]) {
      return -1;
    }
    if (a[field] > b[field]) {
      return 1;
    }
    return 0;
  }

  render () {
    let poolCards = this.renderDeckComponents(this.props.cards.inPool, "pool")
    let deckCards = this.renderDeckComponents(this.props.cards.inDeck, "deck")

    return (
      <div className="deck-row">
        <h4 className='deck-row-header text-left pl-4'>{`${this.props.type} cards`}</h4>
        <h4 className='deck-row-sub-header text-left pl-4'>{`Available (${poolCards.length})`}</h4>
        <div className="card-container p-2 d-flex justify-content-center flex-wrap">
            { poolCards }
        </div>
        <h4 className='deck-row-sub-header text-left pl-4'>{`In Deck (${deckCards.length})`}</h4>
        <div className="mx-2 mb-4 p-2 card-container deck-card-container d-flex justify-content-center flex-wrap">
          { deckCards }
        </div>
      </div>
    )
  }

  propTypes: {
    removeFromDeck : React.PropTypes.func.isRequired,
    playerDeck : React.PropTypes.object.isRequired,
    placeInDeck : React.PropTypes.func.isRequired,
    cards : React.PropTypes.object.isRequired,
    type : React.PropTypes.string.isRequired
  }
}
