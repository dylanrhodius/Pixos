import React from 'react'
import './DeckCard.scss'
import DeckCardWrapper from './DeckCardWrapper'

export default class DeckCard extends React.Component {

  renderDeckComponents (cardArray, section) {
    return cardArray.map(
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

  render () {
    let poolCards = this.renderDeckComponents(this.props.cards.inPool, "pool")
    let deckCards = this.renderDeckComponents(this.props.cards.inDeck, "deck")

    return (
      <div>
        <h3>Available cards</h3>
        <div className="card-container d-flex justify-content-center flex-wrap">
            { poolCards }
        </div>
        <h3>Chosen cards</h3>
        <div className="card-container d-flex justify-content-center flex-wrap px-5">
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
