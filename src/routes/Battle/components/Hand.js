import React from 'react'
import Card from './Card'

export default class Hand extends React.Component {

  renderHandComponents () {
    return this.props.hand.map(
      (card, i) => <Card key={i} {...card} />
    )
  }

  loadContent () {
    let cards = this.renderHandComponents()
    return (

      <div className="games-list d-flex flex-wrap justify-content-center mt-3 px-5">
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
    hand : React.PropTypes.object.isRequired
  }
}
