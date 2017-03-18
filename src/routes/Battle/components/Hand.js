import React from 'react'
import CardWrapper from './CardWrapper'
import Card from './Card'
import HiddenCard from './HiddenCard'


export default class Hand extends React.Component {

  renderHandComponents () {
    if (this.props.isEnemyHand) {
      return this.props.hand.map(
        (card, i) => <HiddenCard key={i} {...card} />
      )
    } else {
      return this.props.hand.map(
        (card, i) => {if(this.props.isSelfTurn) {
          return (
            <CardWrapper key={i} {...card }
                                removeCard={this.props.removeCard}
                                addCard={this.props.addCard}
                                setTurnFinished={this.props.setTurnFinished}
                                setMyTurn={this.props.setMyTurn}
                                id={i}
                                updatePower={this.props.updatePower} />
          )
        } else {
          return (
            <Card key={i} {...card }
                  id={i} />
          )
        }
      }
      )
    }
  }

  loadContent () {
    let cards = this.renderHandComponents()
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
    hand : React.PropTypes.object.isRequired,
    isEnemyHand: React.PropTypes.bool.isRequired,
    removeCard : React.PropTypes.func.isRequired,
    setTurnFinished  : React.PropTypes.func.isRequired,
    setMyTurn : React.PropTypes.func.isRequired,
    addCard : React.PropTypes.func.isRequired,
    isSelfTurn : React.PropTypes.bool.isRequired,
    updatePower : React.PropTypes.func.isRequired
  }
}
