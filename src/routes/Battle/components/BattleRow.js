import React from 'react'
import './BattleRow.scss'
import Card from './Card'

export default class BattleRow extends React.Component {

  renderCardComponents () {
    return this.props.cards.map(
      (card, i) => <Card key={i} {...card} showPointer={false} />
    )
  }

  renderRowMessage () {
    if (this.props.passed) {
      return (
        <span className="row-message highlighted-white-text">PASSED</span>
      )
    } else
    return (
      <span className="row-message">{this.props.type}</span>
    )
  }

  render () {
    let content = this.renderCardComponents()
    let message = this.renderRowMessage()
    return (
      <div className={`battle-row ${this.props.passed ? 'grey-bkgrnd' : ''} d-flex flex-wrap justify-content-center align-items-center px-2 py-1`}>
        { content }
        { message }
        <div className={`${this.props.type}-bkgrnd battle-row-type circle`}/>
      </div>
    )
  }

  propTypes: {
    type  : React.PropTypes.string.isRequired,
    cards  : React.PropTypes.array.isRequired,
    passed : React.PropTypes.bool.isRequired
  }
}
