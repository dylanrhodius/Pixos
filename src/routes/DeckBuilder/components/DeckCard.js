import React from 'react'
import './DeckCard.scss'

export default class DeckCard extends React.Component {

    constructor (props) {
      super(props)
    }

render() {
  return (
    <div className={`card deck-card box-shadow mx-2 p-1 ${this.props.type}-faint-bkgrnd`}>
      <div className="d-flex justify-content-center align-items-center deck-card-img-holder pb-1">
        <img className="deck-card-img justify-content-center" src={this.props.imgUrl} alt="Card image cap"/>
      </div>
      <h4 className="card-title deck-card-name overflow-wrap m-0">{ this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1) }</h4>
      <span className={`deck-card-text ${this.props.type}-bkgrnd circle d-inline-block mx-auto`}>{ this.props.power }</span>
      <span className="deck-card-cost bkgrnd circle d-inline-block mx-auto overflow-wrap">${ this.props.cost }</span>
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
