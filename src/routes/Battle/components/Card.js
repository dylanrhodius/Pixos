import React from 'react'
import './Card.scss'

export default class Card extends React.Component {

    constructor (props) {
      super(props)
    }

render() {
  return (


      <div className={`game-card box-shadow mx-1 ${this.props.type}-faint-bkgrnd d-flex align-items-stretch`}>
        <div className={`game-card-name-holder pb-1 ${this.props.type}-main-bkgrnd`}>
          <h4 className="game-card-name m-0 text-left highlighted-white-text">
            { this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1) }
          </h4>
        </div>
        <div className="d-flex justify-content-center align-items-start game-card-img-holder p-1">
          <img className="game-card-img" src={this.props.imgUrl} alt="Card image cap"/>
        </div>
        <span className={`game-card-power ${this.props.type}-bkgrnd circle d-inline-block mx-auto highlighted-white-text`}>
          { this.props.power }
        </span>
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
