import React from 'react'

export default class Card extends React.Component {

    constructor (props) {
      super(props)

      this.playCard = this.playCard.bind(this)
    }

playCard() {
  console.log("I am this in play card: this .. ", this.props)
  this.props.removeCard(this.props)
}

render() {
  return (
  <div className="card" style={{ margin: '0 auto' }} >
    <button onClick={this.playCard}>Play card</button>
    <img className="card-img-top" src={this.props.imgUrl} alt="Card image cap"/>
    <div className="card-block">
      <h4 className="card-title">{ this.props.name }</h4>
      <p className="card-text">{ this.props.power }</p>
    </div>
  </div>)
  }
}
