import React from 'react'
import './Card.scss'

export default class Card extends React.Component {

    constructor (props) {
      super(props)
    }

render() {
  return (
    <div className={`card game-card box-shadow mx-2 p-1 ${this.props.type}-faint-bkgrnd`}>
      <div className="d-flex justify-content-center align-items-center game-card-img-holder pb-1">
        <img className="game-card-img" src={this.props.imgUrl} alt="Card image cap"/>
      </div>
      <h4 className="card-title game-card-name overflow-wrap m-0">{ this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1) }</h4>
      <span className={`game-card-text ${this.props.type}-bkgrnd circle d-inline-block mx-auto`}>{ this.props.power }</span>
    </div>
  )
}

  propTypes: {
    type : React.PropTypes.string.isRequired,
    imgUrl : React.PropTypes.string.isRequired,
    name : React.PropTypes.string.isRequired,
    power : React.PropTypes.string.isRequired
  }
}
