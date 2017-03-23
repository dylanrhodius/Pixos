import React from 'react'
import DeckCard from './DeckCard'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'

export default class DeckCardWrapper extends React.Component {
  constructor (props) {
    super (props);

    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.removeCardFromDeck = this.removeCardFromDeck.bind(this)
    this.canBeAdded = this.canBeAdded.bind(this)

  }

  sufficientDollars = () => {
    return (this.props.playerDeck.dinoDollars >= this.props.cost)
  }

  lessThanCardLimit = () => {
    let array = this.props.playerDeck[`${this.props.type}`].inDeck
    let counter = 0
    array.forEach((card) => {
      if (card._id == this.props._id) { counter += 1 }
    })
    return counter < this.props.playerDeck.duplicateCardLimit
  }

  canBeAdded = () => {
    return this.props.playerDeck.cardsInDeck < this.props.playerDeck.deckSize
  }

  addCardToDeck = () => {
    let cardData = {
      type : this.props.type,
      cardId: parseInt(this.props.id.split("_")[2])
    }
    if ((this.sufficientDollars()) && (this.lessThanCardLimit()) && (this.canBeAdded())) { this.props.placeInDeck(cardData) }
  }

  removeCardFromDeck = () => {
    let cardData = {
      type : this.props.type,
      cardId: parseInt(this.props.id.split("_")[2])
    }
    this.props.removeFromDeck(cardData)
  }

  inPool () {
    return (this.props.id.split("_")[1] == 'pool')
  }


render () {
  let inPool = this.inPool()
   return (
    <div className="mb-2">
         <DeckCard
            name={this.props.name}
            power={this.props.power}
            type={this.props.type}
            cost={this.props.cost}
            imgUrl={this.props.imgUrl}
            placeInDeck={this.props.placeInDeck}
            removeFromDeck={this.props.removeFromDeck}
            special={this.props.special}
            description={this.props.description}
            addOrRemove={inPool ? this.addCardToDeck : this.removeCardFromDeck }
          />
    </div>
   )
 }

 propTypes: {
   removeFromDeck : React.PropTypes.func.isRequired,
   playerDeck : React.PropTypes.object.isRequired,
   name: React.propTypes.string.isRequired,
   power: React.propTypes.string.isRequired,
   type: React.propTypes.string.isRequired,
   cost: React.propTypes.string.isRequired,
   imgUrl: React.propTypes.string.isRequired,
   placeInDeck: React.propTypes.func.isRequired,
   id: React.propTypes.string.isRequired,
   _id: React.propTypes.string.isRequired,
   description : React.PropTypes.string.isRequired
 }
}
