import React from 'react'
import './DeckCard.scss'
import DeckCardWrapper from './DeckCardWrapper'
var cardData = require('../../../../server/cardData').CARD_DATA

export default class DeckCard extends React.Component {

  renderDeckComponents () {
    return cardData.map(
      (card, i) => <DeckCardWrapper key={i} {...card} id={i} />
    )
  }

  render () {
    let cards = this.renderDeckComponents()
    return (
      <div className="card-container d-flex justify-content-center flex-wrap">
        { cards }
      </div>
    )
  }

  propTypes: {
    type : React.PropTypes.string.isRequired,
    imgUrl : React.PropTypes.string.isRequired,
    name : React.PropTypes.string.isRequired,
    power : React.PropTypes.string.isRequired,
    cost : React.PropTypes.string.isRequired
  }
}
