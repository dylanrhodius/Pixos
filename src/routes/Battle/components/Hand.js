import React from 'react'
import CardWrapper from './CardWrapper'
import Card from './Card'
import HiddenCard from './HiddenCard'
import './Hand.scss'

export default class Hand extends React.Component {

  renderHandComponents () {
    if (this.props.isEnemyHand) {
      return this.props.hand.map(
        (card, i) => <HiddenCard key={i} {...card} />
      )
    } else {
      return this.props.hand.map(
        (card, i) => {if(this.props.isSelfTurn) {
          let subjectToMeteor = false
          let subjectToParagon = false
          if (this.props.paragonState[card.type]) {
            subjectToParagon = true
          }
          if (this.props.meteorState[card.type]) {
            subjectToMeteor = true
          }
          return (
            <CardWrapper key={i} {...card }
                                removeCard={this.props.removeCard}
                                addCard={this.props.addCard}
                                setTurnFinished={this.props.setTurnFinished}
                                setMyTurn={this.props.setMyTurn}
                                id={i}
                                updatePower={this.props.updatePower}
                                resurrectCards={this.props.resurrectCards}
                                applyMeteorEffect={this.props.applyMeteorEffect}
                                applyParagonEffect={this.props.applyParagonEffect}
                                subjectToMeteor={subjectToMeteor}
                                subjectToParagon={subjectToParagon} />
          )
        } else {
          return (
            <Card key={i} showPointer={false} {...card }
                  id={i} />
          )
        }
      }
      )
    }
  }

  loadContent () {
    let cards = this.renderHandComponents()
    let owner = this.props.isEnemyHand ? 'enemy' : 'self'
    return (
      <div className={`d-flex flex-wrap justify-content-center px-2 py-2 ${owner}-hand-border`}>
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
    updatePower : React.PropTypes.func.isRequired,
    resurrectCards : React.PropTypes.func.isRequired,
    applyMeteorEffect : React.PropTypes.func.isRequired,
    applyParagonEffect : React.PropTypes.func.isRequired,
    meteorState : React.PropTypes.object.isRequired,
    paragonState : React.PropTypes.object.isRequired
  }
}
