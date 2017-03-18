import React from 'react'
import './BattleRow.scss'
import Card from './Card'

export default class BattleRow extends React.Component {

  renderCardComponents () {
    return this.props.cards.map(
      (card, i) => <Card key={i} {...card} />
    )
  }

  render () {
    let content = this.renderCardComponents()
    return (
      <div className="battle-row d-flex flex-wrap justify-content-center px-2 my-1">
        { content }
        <div className={`${this.props.type}-bkgrnd battle-row-type circle`}/>
      </div>
    )
  }

  propTypes: {
    type  : React.PropTypes.string.isRequired,
    cards  : React.PropTypes.array.isRequired
  }
}
