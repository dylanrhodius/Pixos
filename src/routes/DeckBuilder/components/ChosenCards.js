import React from 'react'
import CardWrapper from './CardWrapper'
import Card from './Card'

export default class ChosenCards extends React.Component {

  renderChosenCardsComponenets () {
    return this.props.chosenCards.map(
      return (
      <CardWrapper key={i} {...card }
      addCard={this.props.placeInDeck}
      id={i}
      <div className="chosen-cards">

    )
  )
}


loadContent () {
  let cards = this.renderChosenCardsComponenets()
  return (
    <div className="d-flex flex-wrap justify-content-center mt-3 px-2">
      { cards }
    </div>
  )
}

render () {
  let content = this.loadContent()
  return (
    <div>
      { content }
    </div>
  )
}

  propTypes: {
    addCard : React.PropTypes.func.isRequired
  }
